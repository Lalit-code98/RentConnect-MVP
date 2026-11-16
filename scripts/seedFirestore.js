// Utility Script to Seed RentConnect Sample Properties into Firebase Firestore
// ----------------------------------------------------------------------------
// Zero dependencies needed (uses standard Node.js + installed firebase package).
//
// Usage:
// 1. Ensure your .env.local contains your valid Firebase configuration.
// 2. Run: node scripts/seedFirestore.js
// ----------------------------------------------------------------------------

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { mockProperties } from '../src/data/mockProperties.js';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually if not already populated in process.env
const envLocalPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...rest] = trimmed.split('=');
      const val = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
      if (!process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  });
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
};

async function seed() {
  console.log('--- RentConnect Firestore Seeder ---');
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
    console.error('❌ Error: Missing VITE_FIREBASE_API_KEY or VITE_FIREBASE_PROJECT_ID.');
    console.error('Please configure your credentials in .env.local before seeding.');
    process.exit(1);
  }

  console.log(`Connecting to Firebase project: "${firebaseConfig.projectId}"...`);
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  console.log(`Seeding ${mockProperties.length} properties to collection "properties"...`);
  for (const property of mockProperties) {
    const docRef = doc(db, 'properties', property.id);
    await setDoc(docRef, property);
    console.log(`  ✓ Seeded: [${property.category}] ${property.title} (${property.id})`);
  }

  console.log('\n🎉 Successfully seeded all properties to Firestore!');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
