import React, { useCallback, useEffect, useState } from 'react';
import { Center, Stack } from '@chakra-ui/layout';
import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import { useRouter } from 'next/router';
import useAuth from '../../../src/Admin/hooks/useAuth';

interface Props {}

const AdminJoinPage = (props: Props) => {
	const router = useRouter();
	const { join } = useAuth();

	const onSubmit = useCallback(
		async (data, { setSubmitting }) => {
			const answer = prompt('관리자 비밀번호를 입력해주세요');
			// TODO: 비밀번호를 변경하고 고객사에 알려주세요
			if (answer !== 'dkthql12@') return;

			const { email, password } = data;

			try {
				setSubmitting(true);
				await join(email, password);
				router.push('/admin');
				setSubmitting(false);
			} catch (e: any) {
				console.error(e);
				alert(e.message);
			}
		},
		[join, router],
	);

	return (
		<Flex flexDirection="column" mx="auto" align="center" marginTop={144}>
			<Heading my="4" textAlign={'center'} fontSize="5xl">
				회원가입
			</Heading>
			<Formik initialValues={{ email: '', password: '' }} onSubmit={onSubmit}>
				{({ isSubmitting, handleSubmit }) => {
					return (
						<Box as="form" onSubmit={handleSubmit as any} w="550px" px="16" py="8">
							<Stack spacing="4">
								<Input as={Field} name="email" placeholder="이메일을 입력해주세요" />
								<Input as={Field} name="password" type="password" placeholder="비밀번호를 입력해주세요" />
							</Stack>
							<Text color="gray.500" fontSize="xs" textAlign="right" mt="4" textDecoration="underline" cursor="pointer" onClick={() => router.push('/admin/auth/login')}>
								이미 가입하셨나요? 로그인
							</Text>
							<Button type="submit" colorScheme="blue" width="full" mt="8" size="lg" fontSize="lg" isLoading={isSubmitting}>
								회원가입하기
							</Button>
						</Box>
					);
				}}
			</Formik>
		</Flex>
	);
};

export default AdminJoinPage;
