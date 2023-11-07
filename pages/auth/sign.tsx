import styled from '@emotion/styled';
import React, { useCallback } from 'react';
import { auth } from '../../src/configs/firebase';
import { useGetCsrfToken, useLogin, useSignUp } from '../../src/hooks/useAuth';

import KakaoLogoIcon from 'public/assets/kakao.svg';
import NaverLogoIcon from 'public/assets/naver.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { regex } from '@/utils/regex';
import { LoginParams, SignUpParams } from '@/api/auth/auth.types';

const SignPage = () => {
	const { data: csrfTokenData } = useGetCsrfToken();

	const { register, watch, handleSubmit } = useForm<SignUpParams>({
		defaultValues: {
			email: '',
			password: '',
			passwordConfirm: '',
			name: '',
			phone: '',
		},
	});

	const { register: loginRegister, handleSubmit: loginHandleSubmit } = useForm<LoginParams>({
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onKakaoLogin = useCallback(() => {
		const kakaoLoginParams = new URLSearchParams({
			client_id: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
			redirect_uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/oauth/callback/kakao' : `https://${process.env.NEXT_PUBLIC_DOMAIN}/oauth/callback/kakao`,
			response_type: 'code',
		} as Record<string, string>);

		window.location.href = `https://kauth.kakao.com/oauth/authorize?${kakaoLoginParams}`;
	}, []);

	const onNaverLogin = useCallback(() => {
		if (!csrfTokenData) return;

		const naverLoginParams = new URLSearchParams({
			response_type: 'code',
			client_id: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
			redirect_uri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/oauth/callback/naver' : `https://${process.env.NEXT_PUBLIC_DOMAIN}/oauth/callback/naver`,
			state: csrfTokenData.token,
		} as Record<string, string>);

		window.location.href = `https://nid.naver.com/oauth2.0/authorize?${naverLoginParams}`;
	}, [csrfTokenData]);

	const onLogOut = useCallback(async () => {
		await auth.signOut();
	}, []);

	const validatePassword = useCallback(
		(value: string) => {
			if (watch('password') !== value) {
				return '비밀번호와 비밀번호 확인이 일치하지 않습니다.';
			}

			return true;
		},
		[watch],
	);
	const { mutate: signup } = useSignUp();
	const onSignUp: SubmitHandler<SignUpParams> = useCallback(
		(values) => {
			signup(values);
		},
		[signup],
	);
	const { mutate: login } = useLogin();
	const onLogin: SubmitHandler<LoginParams> = useCallback(
		(values) => {
			login(values);
		},
		[login],
	);

	return (
		<Layout>
			<SignForm onSubmit={handleSubmit(onSignUp)}>
				<input type="email" placeholder="이메일을 입력해주세요." {...register('email', { required: true, pattern: regex.emailRegex })} />
				<input type="password" placeholder="비밀번호를 입력해주세요.." {...register('password', { required: true })} />
				<input type="password" placeholder="비밀번호 확인을 입력해주세요." {...register('passwordConfirm', { required: true, validate: validatePassword })} />
				<input type="text" placeholder="이름을 입력해주세요." {...register('name', { required: true })} />
				<input type="tel" placeholder="연락처를 입력해주세요." {...register('phone', { required: true, pattern: regex.cellPhoneRegex })} />
				<button>회원가입</button>
			</SignForm>

			<SignForm onSubmit={loginHandleSubmit(onLogin)}>
				<input type="email" placeholder="이메일을 입력해주세요." {...loginRegister('email', { required: true, pattern: regex.emailRegex })} />
				<input type="password" placeholder="비밀번호를 입력해주세요.." {...loginRegister('password', { required: true })} />
				<button>로그인</button>
			</SignForm>

			<ButtonGroup>
				<KakaoLoginButton onClick={onKakaoLogin}>
					<KakaoLogoIcon />
					<span>카카오로 로그인하기</span>
				</KakaoLoginButton>

				<NaverLoginButton onClick={onNaverLogin}>
					<NaverLogoIcon />
					<span>네이버로 로그인하기</span>
				</NaverLoginButton>

				<LogoutButton onClick={onLogOut}>로그아웃</LogoutButton>
			</ButtonGroup>
		</Layout>
	);
};

const Layout = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 32px;
`;

const SignForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 12px;
	width: 300px;

	input {
		height: 48px;
		padding: 8px 12px;
	}

	button {
		height: 48px;
		background: #8a3db6;
		color: #fff;
		font-weight: 500;
		border-radius: 8px;
	}
`;

const ButtonGroup = styled.div`
	display: flex;
	align-items: center;
	flex-direction: column;
	gap: 24px;

	button {
		width: 300px;
		padding: 12px 0;
		border-radius: 8px;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;

		font-weight: 500;
	}
`;

const KakaoLoginButton = styled.button`
	background: #f7e600;
	color: #3a1d1d;
`;

const NaverLoginButton = styled.button`
	background: #2eb500;
	color: #fff;
`;

const LogoutButton = styled.button`
	border: 1px solid #333;
`;

export default SignPage;
