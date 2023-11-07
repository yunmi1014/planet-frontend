import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../configs/firebase';
import { ICustomToken, IToken } from '../api.types';
import { client } from '../client';
import { NaverLoginParams, LoginParams, SignUpParams } from './auth.types';

export const signupApi = async (signUpData: SignUpParams) => {
	const { data } = await client.post<ICustomToken>('/auth/signup', signUpData);
	return data;
};

export const loginApi = ({ email, password }: LoginParams) => {
	return signInWithEmailAndPassword(auth, email, password);
};

export const logoutApi = () => {
	return auth.signOut();
};

export const resetPasswordApi = (email: string) => {
	return sendPasswordResetEmail(auth, email);
};

export const kakaoLoginApi = async (code: string) => {
	const { data } = await client.post<ICustomToken>('/oauth/kakao', {
		code,
	});
	return data;
};

export const getCsrfTokenApi = async () => {
	const { data } = await client.get<IToken>('/csrf');
	return data;
};

export const naverLoginApi = async ({ code, state }: NaverLoginParams) => {
	const { data } = await client.post<ICustomToken>('/oauth/naver', {
		code,
		state,
	});
	return data;
};
