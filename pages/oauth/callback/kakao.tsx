import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useKakaoLogin } from '../../../src/hooks/useAuth';

const KakaoCallback = () => {
	const router = useRouter();
	const { mutate: kakaoLogin } = useKakaoLogin();

	useEffect(() => {
		if (!router.query.code) return;

		kakaoLogin(router.query.code + '');
	}, [kakaoLogin, router.query.code]);

	return null;
};

export default KakaoCallback;
