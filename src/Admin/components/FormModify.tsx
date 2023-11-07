import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Box, Button, Flex } from '@chakra-ui/react';
import { Editor } from '@toast-ui/react-editor';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import FormInputRenderer from './FormInputRenderer';
import Container from './Layout/Container';
import { ArrowLeftIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import { BsCheckLg } from 'react-icons/bs';

interface Props {
	layoutData?: any[][];
	data: any;
	collectionName: string;
	children?: ReactNode;
	onSubmit: (value: any) => void;
	editorRef?: React.MutableRefObject<Editor | null>;
}

const FormModify = (props: Props) => {
	const router = useRouter();
	const formMethods = useForm();
	const { layoutData, collectionName, data } = props;

	// 받아 온 상세페이지 데이터를 react-hook-form에 세팅하기 위함
	useEffect(() => {
		if (!data) return;
		formMethods.reset(data);
	}, [formMethods, data]);

	return (
		<Container>
			<Box bgColor="#fff" w="full" h="full" padding={10} display="flex" flexDirection="column">
				<FormProvider {...formMethods}>
					<form onSubmit={formMethods.handleSubmit(props.onSubmit)}>
						<Flex justifyContent="space-between">
							<Button type="button" padding={4} mb={10} onClick={() => router.back()} leftIcon={<ChevronLeftIcon />} colorScheme="blue">
								뒤로가기
							</Button>
							<Button type="submit" isLoading={formMethods.formState.isSubmitting} rightIcon={<BsCheckLg />} colorScheme="blue">
								수정하기
							</Button>
						</Flex>
						<Box>
							{layoutData?.map((row, index) => {
								return (
									<Flex key={index} gap="10px" mb={10} h="min-content">
										{row.map((cell, index) => {
											return <FormInputRenderer key={index} type={cell.type} flex={cell.flex} height={cell.height} collectionName={collectionName} name={cell.key} selectOptions={cell.selectOptions} editorRef={props.editorRef} />;
										})}
									</Flex>
								);
							})}
						</Box>
						{props.children}
					</form>
				</FormProvider>
			</Box>
		</Container>
	);
};

export default FormModify;
