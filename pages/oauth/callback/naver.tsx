import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useNaverLogin } from '../../../src/hooks/useAuth';

const NaverCallback = () => {
	const router = useRouter();

	const { mutate: naverLogin } = useNaverLogin();
	useEffect(() => {
		const { code, state } = router.query;
		if (!code || !state) return;

		naverLogin({ code: code + '', state: state + '' });
	}, [naverLogin, router.query]);

	return null;
};

export default NaverCallback;
