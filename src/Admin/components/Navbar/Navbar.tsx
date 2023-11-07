import React from 'react';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Body from '../../../foundations/Typography/Body/Body';

export type NavType = { title: string; route: string };

interface Props {
	navData: NavType[];
}

const Navbar = (props: Props) => {
	const router = useRouter();

	return (
		<Stack minW="125px" h="fit-content" bg="gray.100" spacing={0}>
			{props.navData?.map((item, index) => {
				const isSelected = router.route === item.route;
				return (
					<Body key={index} p="4" cursor="pointer" color="#111" _hover={{ opacity: 0.7, bg: 'blue.100' }} bg={isSelected ? 'blue.100' : undefined} onClick={() => router.push(item.route)}>
						{item.title}
					</Body>
				);
			})}
		</Stack>
	);
};

export default Navbar;
