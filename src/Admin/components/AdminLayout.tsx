import React, { ReactNode, useEffect } from 'react';
import styled from '@emotion/styled';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import AdminProfile from './AdminProfile';
import useAuth from '../hooks/useAuth';
import Navbar, { NavType } from './Navbar/Navbar';
import TableGlobalStyle from './DataTable/style/TableGlobalStyle';

interface Props {
	children?: ReactNode;
	navData: NavType[];
}

const AdminLayout = ({ children, navData }: Props) => {
	const router = useRouter();
	const { isLoading, isLogin, isAdmin, userMe } = useAuth();

	// 인증 상태에 따른 화면 분기
	useEffect(() => {
		if (isLoading) return;

		if (!isLogin) {
			router.push('/admin/auth/login');
			return;
		}

		if (!isAdmin) {
			alert('관리자 계정으로 로그인해주세요');
			router.push('/admin/auth/login');
			return;
		}
	}, [isLoading, isAdmin, isLogin, userMe, router]);

	if (!isAdmin) return null;
	return (
		<>
			<Flex flexDir="column" bg="gray.50" w="full" h="100vh" pos="relative" overflow={'auto'}>
				<Flex w="full" p="4" justify="flex-end" borderBottom="1px" borderColor="gray.30" boxShadow="base">
					<AdminProfile />
				</Flex>
				<Flex flex={1}>
					<Navbar navData={navData} />
					<Children>{children}</Children>
				</Flex>
			</Flex>
			<TableGlobalStyle />
		</>
	);
};

AdminLayout.defaultProps = {
	navData: [
		{
			title: '사용자 목록',
			route: '/admin/user',
		},
		{
			title: '댄스챌린지',
			route: '/admin/dance',
		},
		{
			title: '소문내기',
			route: '/admin/rumor',
		},
		{
			title: '상담신청',
			route: '/admin/inquiry',
		},
	],
};

export default AdminLayout;

const Children = styled.div`
	width: 100%;
`;
