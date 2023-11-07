import { Box, Flex, HStack } from '@chakra-ui/react';
import Image from 'next/image';
import CtaButton from './CtaButton';
import styled from 'styled-components';

interface Props {
	isMobile: boolean;
}

const Header = (props: Props) => {
	const { isMobile } = props;

	return (
		<HStack minH={isMobile ? '60px' : '100px'} width="100%" padding={isMobile ? '14px 20px' : '0'} justify="space-between" position="fixed" top="0" zIndex="9999" backdropFilter="blur(5px)" justifyContent="center">
			<Flex width="100%" maxW={'1240px'} justify="space-between" align="center">
				<Box width={isMobile ? '35px' : '64px'} height={isMobile ? '28px' : '52px'} position="relative">
					<Image src="/images/logo/ath_logo.png" alt="ATH" fill />
				</Box>
				<CtaButtonWrapper>
					<CtaButton link="https://t.me/el10044" icon={<Image src="/images/logo/telegram_logo.png" width={isMobile ? 16 : 24} height={isMobile ? 16 : 24} alt="텔레그램" />} isMobile={isMobile} />
				</CtaButtonWrapper>
			</Flex>
		</HStack>
	);
};

export default Header;

const CtaButtonWrapper = styled.div`
	width: fit-content;
	z-index: 2;
`;
