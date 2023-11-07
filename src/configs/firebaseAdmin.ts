import { credential } from 'firebase-admin';
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let firebaseAdmin: App;
if (getApps().length === 0) {
	firebaseAdmin = initializeApp({
		credential: credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY!)),
	});
}

export const firebaseAuthAdmin = getAuth(firebaseAdmin!);
export const firestoreAdmin = getFirestore(firebaseAdmin!);
