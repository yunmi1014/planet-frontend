import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { Box, Flex } from '@chakra-ui/react';
import FormInputRenderer from './FormInputRenderer';
import Button from './Button/Button';
import Container from './Layout/Container';
import { BsCheckLg } from 'react-icons/bs';
import { ChevronLeftIcon } from '@chakra-ui/icons';

interface Props {
	data: any;
	collectionName: string;
	onSubmit: (value: any) => void;
}

const FormAdd = (props: Props) => {
	const router = useRouter();
	const { data, collectionName, onSubmit } = props;
	const formMethods = useForm();

	return (
		<Container>
			<Box bgColor="#fff" w="100%" minH="100vh" padding={10} display="flex" flexDirection="column">
				<FormProvider {...formMethods}>
					<form onSubmit={formMethods.handleSubmit(onSubmit)}>
						<Flex justifyContent="space-between">
							<Button type="button" padding={4} mb={10} onClick={() => router.back()} leftIcon={<ChevronLeftIcon />} colorScheme="blue" height={36}>
								뒤로가기
							</Button>
							<Button type="submit" isLoading={formMethods?.formState?.isSubmitting} rightIcon={<BsCheckLg />} colorScheme="blue" height={36}>
								저장하기
							</Button>
						</Flex>
						{data.map((row, index) => {
							return (
								<Flex key={index} gap="10px" mb={10}>
									{row.map((cell, index) => {
										return <FormInputRenderer key={index} type={cell.type} flex={cell.flex} height={cell.height} collectionName={collectionName} name={cell.key} selectOptions={cell.selectOptions} />;
									})}
								</Flex>
							);
						})}
					</form>
				</FormProvider>
			</Box>
		</Container>
	);
};

export default FormAdd;
