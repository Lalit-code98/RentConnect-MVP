// Firebase Initialization & Configuration Module for RentConnect
// -------------------------------------------------------------
// Uses Vite environment variables prefixed with VITE_.
// Credentials should be placed in .env.local (which is git-ignored).
// If credentials are not configured, this module gracefully exports null
// so the application falls back to local sample data.

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const rawConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Check if credentials are meaningfully present (not empty, undefined, or placeholder)
const isValidValue = (val) => {
  if (!val || typeof val !== 'string') return false;
  const trimmed = val.trim();
  if (trimmed === '') return false;
  if (trimmed.startsWith('YOUR_') || trimmed.startsWith('<') || trimmed.includes('placeholder')) return false;
  return true;
};

export const isFirebaseConfigured = Boolean(
  isValidValue(rawConfig.apiKey) &&
  isValidValue(rawConfig.projectId)
);

let app = null;
let db = null;

if (isFirebaseConfigured) {
  try {
    app = getApps().length === 0 ? initializeApp(rawConfig) : getApp();
    db = getFirestore(app);
    console.info(`[RentConnect Firebase] Connected to project: "${rawConfig.projectId}"`);
  } catch (error) {
    console.error('[RentConnect Firebase] Initialization error:', error.message);
    app = null;
    db = null;
  }
} else {
  console.info('[RentConnect Firebase] Credentials not configured in .env.local. Using local sample data fallback.');
}

export const firebaseConfig = rawConfig;
export { app, db };
