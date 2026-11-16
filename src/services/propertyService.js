// Property Service for RentConnect
// -------------------------------------------------------------
// Centralized data access layer for property listings.
// Attempts to load live listings from Firebase Firestore when configured.
// Automatically falls back to local sample data (mockProperties) when:
//   1. Firebase credentials are not provided.
//   2. The 'properties' collection in Firestore is empty.
//   3. A network or permission error occurs.

import { collection, getDocs, doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured, firebaseConfig } from './firebase';
import { mockProperties, CATEGORIES } from '../data/mockProperties';

export { CATEGORIES, mockProperties };

/**
 * Get current Firebase integration status.
 * Never falsely reports connected if credentials or db are missing.
 */
export function getFirebaseStatus() {
  return {
    isConfigured: isFirebaseConfigured,
    projectId: firebaseConfig.projectId || null,
    hasDbInstance: Boolean(db),
  };
}

/**
 * Fetch all property listings.
 * @returns {Promise<{
 *   data: Array<Object>,
 *   source: 'firestore' | 'local' | 'fallback',
 *   isLive: boolean,
 *   count: number,
 *   reason?: string
 * }>}
 */
export async function getProperties() {
  if (!isFirebaseConfigured || !db) {
    return {
      data: mockProperties,
      source: 'local',
      isLive: false,
      count: mockProperties.length,
      reason: 'Firebase not configured in .env.local; using local sample data.',
    };
  }

  try {
    const colRef = collection(db, 'properties');
    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.warn(
        '[RentConnect] Firestore "properties" collection is currently empty. Falling back to local sample properties.'
      );
      return {
        data: mockProperties,
        source: 'fallback',
        isLive: false,
        count: mockProperties.length,
        reason: 'Firestore "properties" collection is empty.',
      };
    }

    const properties = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));

    console.info(`[RentConnect] Successfully loaded ${properties.length} live listings from Firestore.`);
    return {
      data: properties,
      source: 'firestore',
      isLive: true,
      count: properties.length,
    };
  } catch (error) {
    console.error(
      `[RentConnect] Failed to read from Firestore (${error.message}). Falling back to local sample properties.`
    );
    return {
      data: mockProperties,
      source: 'fallback',
      isLive: false,
      count: mockProperties.length,
      reason: error.message,
    };
  }
}

/**
 * Fetch a single property by its unique ID.
 * @param {string} id - Property ID (e.g. 'shop-adajan-01')
 * @returns {Promise<{
 *   data: Object | null,
 *   source: 'firestore' | 'local' | 'fallback',
 *   isLive: boolean,
 *   reason?: string
 * }>}
 */
export async function getPropertyById(id) {
  if (!isFirebaseConfigured || !db) {
    const local = mockProperties.find((p) => p.id === id) || null;
    return {
      data: local,
      source: 'local',
      isLive: false,
      reason: 'Firebase not configured; using local data.',
    };
  }

  try {
    const docRef = doc(db, 'properties', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        data: { id: docSnap.id, ...docSnap.data() },
        source: 'firestore',
        isLive: true,
      };
    }

    // If not found in Firestore, check mock data fallback
    const local = mockProperties.find((p) => p.id === id) || null;
    if (local) {
      console.warn(`[RentConnect] Listing "${id}" not found in Firestore. Serving from local fallback.`);
      return {
        data: local,
        source: 'fallback',
        isLive: false,
        reason: 'Not found in Firestore collection.',
      };
    }

    return {
      data: null,
      source: 'firestore',
      isLive: true,
    };
  } catch (error) {
    console.error(`[RentConnect] Error fetching property "${id}" from Firestore:`, error.message);
    const local = mockProperties.find((p) => p.id === id) || null;
    return {
      data: local,
      source: 'fallback',
      isLive: false,
      reason: error.message,
    };
  }
}

/**
 * Optional helper: Seed sample properties to Firestore.
 * Useful when the user sets up their Firebase project for the first time.
 */
export async function seedPropertiesToFirestore() {
  if (!isFirebaseConfigured || !db) {
    throw new Error('Cannot seed: Firebase is not configured.');
  }

  const results = [];
  for (const property of mockProperties) {
    const docRef = doc(db, 'properties', property.id);
    await setDoc(docRef, property);
    results.push(property.id);
  }

  console.info(`[RentConnect] Successfully seeded ${results.length} properties to Firestore!`);
  return results;
}
