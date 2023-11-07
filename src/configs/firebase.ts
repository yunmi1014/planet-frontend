import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: 파이어베이스 설정정보를 교체해주세요 (고객사 파이어베이스 사전 설정 필수)
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FB_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};
// 이미 초기화된 Firebase 앱이 없으면 초기화
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const firestorage = getStorage(firebaseApp);

export { firebaseApp, auth, firestore, firestorage };
