import React, { useCallback, useState } from 'react';
import { Stack } from '@chakra-ui/layout';
import { Box, Button, Input } from '@chakra-ui/react';
import { Field, Formik } from 'formik';
import useAuth from '../../../src/Admin/hooks/useAuth';

interface Props {}

const ResetPasswordPage = (props: Props) => {
	const { sendPasswordResetEmail } = useAuth();
	const [isSubmitted, setIsSubmitted] = useState(false);

	const onSubmit = useCallback(
		async (data, { setSubmitting }) => {
			try {
				setSubmitting(true);
				await sendPasswordResetEmail(data.email);
				setSubmitting(false);
				setIsSubmitted(true);
			} catch (e: any) {
				alert(e.message);
				console.error(e);
			}
		},
		[sendPasswordResetEmail],
	);

	return (
		<Box flexDirection="column" mx="auto" mt="40">
			<Box fontSize={38} fontWeight={600} textAlign="center">
				비밀번호 변경
			</Box>
			<Formik initialValues={{ email: '' }} onSubmit={onSubmit}>
				{({ isSubmitting, handleSubmit }) => {
					return (
						<Box as="form" onSubmit={handleSubmit as any} w="550px" px="16" py="8" margin="0 auto">
							<Stack spacing="4">
								<Input as={Field} name="email" placeholder="이메일을 입력해주세요" disabled={isSubmitted} size="lg" />
							</Stack>
							<Button type="submit" colorScheme="blue" width="full" mt="8" size="lg" fontSize={'lg'} isLoading={isSubmitting} isDisabled={isSubmitted}>
								{isSubmitted ? '이메일을 확인해주세요.' : '비밀번호 변경 링크 전송'}
							</Button>
						</Box>
					);
				}}
			</Formik>
		</Box>
	);
};

export default ResetPasswordPage;
