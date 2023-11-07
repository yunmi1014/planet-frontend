import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Stack } from '@chakra-ui/layout';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import useAuth from '../../../src/Admin/hooks/useAuth';

function AdminLoginPage() {
	const router = useRouter();
	const { login } = useAuth();

	const onSubmit = useCallback(async (data, { setSubmitting }) => {
		setSubmitting(true);

		try {
			const { email, password } = data;
			await login(email, password);
			router.push('/admin');
		} catch (e: any) {
			console.error(e);
			alert(e.message);
		}

		setSubmitting(false);
	}, []);

	return (
		<Stack align="center" flexDirection="column" mx="auto" marginTop={160}>
			<Box fontSize={38} fontWeight={600}>
				로그인
			</Box>
			<Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
				{({ isSubmitting, handleSubmit }) => {
					return (
						<Box as="form" onSubmit={handleSubmit as any} w="550px" px="16" py="8">
							<Stack spacing="4">
								<Input as={Field} name="email" placeholder="이메일을 입력해주세요" />
								<Input as={Field} name="password" type="password" placeholder="비밀번호를 입력해주세요" />
							</Stack>
							<Text color="gray.500" mt="4" fontSize="xs" textAlign="right" textDecoration="underline" cursor="pointer" onClick={() => router.push('/admin/auth/resetPassword')}>
								비밀번호 변경
							</Text>
							<Button type="submit" colorScheme="blue" width="full" mt="4" size="lg" fontSize={'lg'} isLoading={isSubmitting}>
								로그인하기
							</Button>
							<Text color="gray.500" fontSize="xs" mt="8" textAlign="center" textDecoration="underline" cursor="pointer" onClick={() => router.push('/admin/auth/join')}>
								아직 회원이 아니신가요? 회원가입
							</Text>
						</Box>
					);
				}}
			</Formik>
		</Stack>
	);
}

export default AdminLoginPage;
