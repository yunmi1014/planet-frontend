import axios from 'axios';
import { CreateRequest } from 'firebase-admin/auth';
import { NaverLoginParams } from '../../api/auth/auth.types';
import { firebaseAuthAdmin } from '../../configs/firebaseAdmin';
import { KakaoToken, KakaoUser, NaverLoginResponse, NaverToken } from './authService.types';

class AuthService {
	private static instanceRef: AuthService;

	private constructor() {}

	static getInstance(): AuthService {
		if (AuthService.instanceRef === undefined) {
			AuthService.instanceRef = new AuthService();
		}
		return AuthService.instanceRef;
	}

	// kakao
	async getKakaoToken(code: string) {
		const { data } = await axios<KakaoToken>({
			url: 'https://kauth.kakao.com/oauth/token',
			method: 'POST',
			data: {
				grant_type: 'authorization_code',
				client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
				redirect_uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/oauth/callback/kakao' : `https://${process.env.NEXT_PUBLIC_DOMAIN}/oauth/callback/kakao`,
				code,
				client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
			},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
		});
		return data;
	}

	async getKakaoUser(accessToken: string) {
		const { data } = await axios<KakaoUser>({
			url: 'https://kapi.kakao.com/v2/user/me',
			method: 'POST',
			data: {
				property_keys: ['kakao_account.email', 'kakao_account.name', 'kakao_acount.profile.nickname'],
			},
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
			},
		});
		return data;
	}

	// naver
	async getNaverToken({ code, state }: NaverLoginParams) {
		const { data } = await axios<NaverToken>({
			url: 'https://nid.naver.com/oauth2.0/token',
			method: 'GET',
			params: {
				grant_type: 'authorization_code',
				client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
				client_secret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
				code,
				state,
			},
		});
		return data;
	}

	async getNaverUser(accessToken: string) {
		const { data } = await axios<NaverLoginResponse>({
			url: 'https://openapi.naver.com/v1/nid/me',
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'text/json;charset=utf-8',
			},
		});
		return data;
	}

	async findUserById(uid: string) {
		try {
			const user = await firebaseAuthAdmin.getUser(uid);
			return user;
		} catch (err) {
			return null;
		}
	}

	async findUserByEmail(email: string) {
		try {
			const user = await firebaseAuthAdmin.getUserByEmail(email);
			return user;
		} catch (err) {
			return null;
		}
	}

	async signUp(createRequest: CreateRequest) {
		try {
			const user = await firebaseAuthAdmin.createUser(createRequest);
			return user;
		} catch (err) {
			throw err;
		}
	}

	async createCustomToken(uid: string) {
		return await firebaseAuthAdmin.createCustomToken(uid);
	}
}

const authService = AuthService.getInstance();
export default authService;
