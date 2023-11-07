import { Text, Avatar, IconButton, Menu, MenuButton, MenuItem, MenuList, VStack } from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';
import { BiLogInCircle, BiLogOutCircle, BiPlus } from 'react-icons/bi';
import { RiLockPasswordLine } from 'react-icons/ri';
import useAuth from '../hooks/useAuth';

const AdminProfile = () => {
	const router = useRouter();
	const { isLogin, userMe, logout } = useAuth();

	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Options"
				icon={
					<VStack>
						<Avatar size="sm" src={isLogin ? 'https://picsum.photos/50' : ''} />
						<Text color="gray.500" fontSize={'10px'}>
							{userMe?.email?.split('@')?.[0]}
						</Text>
					</VStack>
				}
				variant="ghost"
			/>
			<MenuList zIndex={99}>
				<MenuItem icon={<BiPlus size="24px" />} onClick={() => router.push('/admin/auth/join')}>
					새로운 관리자 계정 만들기
				</MenuItem>
				{!isLogin && (
					<MenuItem icon={<BiLogInCircle size="24px" />} onClick={() => router.push('/admin/auth/login')}>
						로그인하기
					</MenuItem>
				)}
				{isLogin && (
					<MenuItem icon={<RiLockPasswordLine size="22px" style={{ marginLeft: '2px' }} />} onClick={() => router.push('/admin/auth/resetPassword')}>
						비밀번호 변경
					</MenuItem>
				)}
				{isLogin && (
					<MenuItem
						icon={<BiLogOutCircle size="24px" />}
						onClick={() => {
							const answer = confirm('정말로 로그아웃 하시겠습니까?');
							if (answer) {
								logout();
							}
						}}
					>
						로그아웃
					</MenuItem>
				)}
			</MenuList>
		</Menu>
	);
};

export default AdminProfile;
