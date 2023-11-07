// Kakao
export interface KakaoToken {
	token_type: string;
	access_token: string;
	id_token: string;
	expires_in: number;
	refresh_token: string;
	refresh_token_expires_in: number;
	scope: string;
}

export interface KakaoUser {
	id: number;
	connected_at: Date;
	properties: KakaoProperty;
	kakao_account: KakaoAccount;
}

interface KakaoAccount {
	profile_nickname_needs_agreement: boolean;
	profile: KakaoProperty;
	name_needs_agreement: boolean;
	name: string;
	has_email: boolean;
	email_needs_agreement: boolean;
	is_email_valid: boolean;
	is_email_verified: boolean;
	email: string;
	has_phone_number: boolean;
	phone_number_needs_agreement: boolean;
	phone_number: string;
}

interface KakaoProperty {
	nickname: string;
}

// Naver
export interface NaverToken {
	access_token: string;
	refresh_token: string;
	token_type: string;
	expires_in: number;
	error: string;
	error_description: string;
}

export interface NaverLoginResponse {
	resultcode: string;
	message: string;
	response: NaverUserInfo;
}

interface NaverUserInfo {
	id: string;
	nickname: string;
	name: string;
	email: string;
	gender: string;
	age: string;
	birthday: string;
	profile_image: string;
	birthyear: string;
	mobile: string;
}

interface FireBaseAuthError {
	code: string;
}
export const isAuthError = (error: any): error is FireBaseAuthError => {
	return 'code' in error;
};
