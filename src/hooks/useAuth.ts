import { useQuery, useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { signInWithCustomToken } from 'firebase/auth';
import { useRouter } from 'next/router';
import { getCsrfTokenApi, kakaoLoginApi, loginApi, naverLoginApi, signupApi } from '../api/auth/auth';
import { auth } from '../configs/firebase';

export const useSignUp = () => {
	const router = useRouter();

	return useMutation(signupApi, {
		onSuccess: async ({ customToken }) => {
			await signInWithCustomToken(auth, customToken);
			router.replace('/');
		},
		onError: (err) => {
			if (isAxiosError(err)) {
				alert(err.response?.data?.message);
			}
		},
	});
};

export const useLogin = () => {
	const router = useRouter();

	return useMutation(loginApi, {
		onSuccess: () => {
			router.replace('/');
		},
	});
};

// 요청 성공 시 커스텀 토큰을 받고, 커스텀 토큰을 이용하여 로그인 처리를 합니다.
export const useKakaoLogin = () => {
	const router = useRouter();

	return useMutation(kakaoLoginApi, {
		onSuccess: async ({ customToken }) => {
			await signInWithCustomToken(auth, customToken);
			router.replace('/');
		},
	});
};

export const useGetCsrfToken = () => {
	return useQuery(['CSRF_TOKEN'], getCsrfTokenApi);
};

// 요청 성공 시 커스텀 토큰을 받고, 커스텀 토큰을 이용하여 로그인 처리를 합니다.
export const useNaverLogin = () => {
	const router = useRouter();

	return useMutation(naverLoginApi, {
		onSuccess: async ({ customToken }) => {
			await signInWithCustomToken(auth, customToken);
			router.replace('/');
		},
	});
};
