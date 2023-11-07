import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: 파이어베이스 설정정보를 교체해주세요 (고객사 파이어베이스 사전 설정 필수)
const firebaseConfig = {};

// 이미 초기화된 Firebase 앱이 없으면 초기화
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const firestorage = getStorage(firebaseApp);

export { firebaseApp, auth, firestore, firestorage };
