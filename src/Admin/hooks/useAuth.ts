import { isEmpty, isNil, merge } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { getUserApi } from '../../api/user/user';
import { serverTimestamp } from 'firebase/firestore';
import FirebaseUtil from '../utils/FirebaseUtil';
import { UserCollectionName, UserModel } from '../../models/UserModel';

const useAuth = () => {
	const router = useRouter();
	// 파이어베이스 인증정보가 변경되고, firestore에서 서비스 유저정보를 fetch해오는 동안 isLoading은 true가 된다.
	const [isLoading, setIsLoading] = useState(true);
	// 파이어베이스 유저
	const [firebaseUserMe, setFirebaseUserMe] = useState<User | null>(null);
	// 서비스 유저
	const [userMe, setUserMe] = useState<UserModel | null>(null);

	const isLogin = !isEmpty(userMe);
	const isAdmin = isLogin && userMe?.isAdmin === true;

	useEffect(() => {
		// 파이어베이스 인증 상태가 변경되면 (로그인 or 로그아웃)
		onAuthStateChanged(auth, async (firebaseUserMe) => {
			setIsLoading(true);

			// 파이어베이스유저 설정
			setFirebaseUserMe(firebaseUserMe);

			// 서비스유저 설정
			const userData = await getUserApi(firebaseUserMe?.uid!);
			setUserMe(userData ? new UserModel(userData) : null);

			setIsLoading(false);
		});
	}, []);

	const join = useCallback(async (email: string, password: string) => {
		try {
			// Firebase Authentication을 사용하여 새로운 사용자를 생성합니다.
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);

			// 사용자가 생성되면 Firestore에 해당 사용자의 세부 정보를 저장합니다.
			const uid = userCredential.user.uid;
			const userData = new UserModel({
				id: uid,
				email: email,
				isAdmin: true,
				provider: 'email',
			});
			const userJsonData = merge(userData.toJson!(), {
				createdAt: serverTimestamp(),
			});

			// Firestore에 사용자 데이터를 저장합니다.
			await FirebaseUtil.setDocument(UserCollectionName, uid, userJsonData);

			return { userCredential, userData };
		} catch (e: any) {
			console.log(e);
			alert(e?.message);
			return null;
		}
	}, []);

	const login = useCallback(async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const uid = userCredential.user.uid;
			const user = await getUserApi(uid);

			if (!user) {
				await signOut(auth);
				throw new Error('가입되지 않은 회원입니다.');
			}

			if (!user.isAdmin) {
				await signOut(auth);
				throw new Error('관리자계정이 아닙니다.');
			}

			return user;
		} catch (e: any) {
			console.log(e);
			alert(e?.message);
			return null;
		}
	}, []);

	const logout = useCallback(async () => {
		signOut(auth);
		router.push('/admin');
	}, [router]);

	const sendPasswordResetEmail = useCallback(async (email: string) => {
		return sendPasswordResetEmail(email);
	}, []);

	return { isLoading, isLogin, isAdmin, firebaseUserMe, userMe, join, login, logout, sendPasswordResetEmail };
};

export default useAuth;
