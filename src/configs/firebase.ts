import * as admin from 'firebase-admin';
import * as path from 'path';
import { logger } from '../utils/logger';

let firebaseAdmin: admin.app.App | null = null;

export function initFirebase(): admin.app.App {
  if (firebaseAdmin) return firebaseAdmin;

  try {
    const serviceAccountPath = path.join(
      __dirname, '..', '..',
      process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './serviceAccountKey.json'
    );
    const serviceAccount = require(serviceAccountPath);

    firebaseAdmin = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    logger.info('Firebase Admin initialized');
    return firebaseAdmin;
  } catch (err) {
    logger.error('Firebase initialization failed', err);
    throw err;
  }
}

export function getFirebaseAdmin(): admin.app.App {
  if (!firebaseAdmin) {
    return initFirebase();
  }
  return firebaseAdmin;
}
