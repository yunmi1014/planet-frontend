'use client';

import { styled } from 'styled-components';
import Container from './Container';
import { Flex } from '@chakra-ui/react';
import Image from 'next/image';
import CtaButton from './CtaButton';

interface Props {
	isMobile: boolean;
}

const Footer = (props: Props) => {
	const { isMobile } = props;
	return (
		<>
			<Container margin={isMobile ? '48px auto 96px auto' : '56px auto'}>
				<Flex direction={isMobile ? 'column' : 'row'} justify="space-between" align="center" padding={isMobile ? '0' : '64px'} gap={isMobile ? '32px' : '0px'}>
					<Text
						$isMobile={isMobile}
						dangerouslySetInnerHTML={{
							__html: '<span>수익을 가져다 주는 지표 매매, <br/>직접 써보는게 제일 빠릅니다.</span>',
						}}
					/>
					<ButtonWrapper $isMobile={isMobile}>
						<CtaButton link="https://t.me/el10044" icon={<Image src="/images/logo/telegram_logo.png" width={24} height={24} alt="텔레그램" />} isMobile={isMobile} />
					</ButtonWrapper>
				</Flex>
			</Container>
			<ImageWrapper>
				<Image src="/images/footer_gradient.png" fill alt="푸터 이미지" />
			</ImageWrapper>
		</>
	);
};

export default Footer;

const Text = styled.span<any>`
	color: var(--base-white, #fff);

	font-family: Pretendard Bold;
	font-size: 32px;
	line-height: 44px; /* 137.5% */

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 20px;
  line-height: 28px;
  `}
`;

const ButtonWrapper = styled.span<any>`
	min-width: 253px;
	z-index: 2;
	.button-container {
		padding: 16px;
	}
	${({ $isMobile }) =>
		$isMobile &&
		`
    min-width: 335px;
		.button-container {

			padding: 14px 20px;
		}

		.button-text {
			font-size: 16px;
			line-height: 22px;
		}
  `}
`;

const ImageWrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 166px;
	bottom: 0;
`;
