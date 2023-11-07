'use client';

import { styled } from 'styled-components';
import Container from './Container';
import { Box, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import CtaButton from './CtaButton';

interface Props {
	isMobile: boolean;
}

const Hero = (props: Props) => {
	const { isMobile } = props;

	return (
		<Wrapper $isMobile={isMobile}>
			<TopGradient $isMobile={isMobile} />
			<Box width={isMobile ? '575px' : '1300px'} height={isMobile ? '360px' : '873px'} position="absolute" top={isMobile ? undefined : '75px'} left="50%" transform={isMobile ? 'translateX(-58%)' : 'translateX(-570px)'} bottom={isMobile ? '-22px' : undefined}>
				<Image src={isMobile ? '/images/hero_total_mobile.png' : '/images/hero_total.webp'} fill alt="메인 이미지" quality={isMobile ? 30 : 100} />
			</Box>
			<Container margin={isMobile ? '112px auto 370px auto' : '232px auto 216px auto'}>
				<LeftEllipse $isMobile={isMobile} />
				<RightEllipse $isMobile={isMobile} />
				<LeftGradient className="123" $isMobile={isMobile} />
				<RightGradient $isMobile={isMobile} />
				<Flex direction="column" align={isMobile ? 'center' : 'flex-start'} zIndex={30}>
					<Title $isMobile={isMobile}>
						<StyledTitle $isMobile={isMobile}>지표매매의 종착역</StyledTitle>
						<StyledTitle2 $isMobile={isMobile}>ATH</StyledTitle2>
					</Title>
					<SubTitle
						$isMobile={isMobile}
						dangerouslySetInnerHTML={{
							__html: `ATH는 기술에 근거한 지표를 제공하여<br/>가상화폐, 주식, 원유 등 어떤 시장에서도<br/>높은 승률과 지속적인 수익을 보장합니다.`,
						}}
					/>
					<CtaButtonWrapper $isMobile={isMobile}>
						<CtaButton link="https://t.me/el10044" icon={<Image src="/images/logo/telegram_logo.png" width={24} height={24} alt="텔레그램" />} isMobile={isMobile} />
					</CtaButtonWrapper>
				</Flex>
			</Container>
			<BottomGradient $isMobile={isMobile} />
		</Wrapper>
	);
};

export default Hero;

const Wrapper = styled.div<any>`
	width: 100%;
	height: 816px;
	// padding: 48px 0;
	overflow: hidden;
	position: relative;

	${({ $isMobile }) =>
		$isMobile &&
		`
    height: 686px;
    padding: 0 20px;
  `}
`;

const Title = styled.div<any>`
	margin-bottom: 24px;
	z-index: 10;

	${({ $isMobile }) =>
		$isMobile &&
		`
  margin-bottom: 16px;
`}
`;

const StyledTitle = styled.h1<any>`
	font-family: Pretendard extraBold;
	font-size: 60px;
	line-height: 1.2;
	letter-spacing: -1.2px;

	background: var(--gradation, linear-gradient(92deg, #ddfef8 11.1%, #57ead1 20.35%, #9669ff 65.24%));
	// background-position: 100%;
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;

	${({ $isMobile }) =>
		$isMobile &&
		`
    font-size: 32px;
    line-height: 44px; /* 137.5% */
`}
`;

const StyledTitle2 = styled.h1<any>`
	font-family: Pretendard extraBold;
	font-size: 60px;
	line-height: 1.2;
	color: #fff;
	line-height: 72px;
	letter-spacing: -1.2px;

	${({ $isMobile }) =>
		$isMobile &&
		`
  text-align: center;
  font-size: 32px;
  line-height: 44px; /* 137.5% */
`}
`;

const SubTitle = styled.div<any>`
	color: #fff;
	font-family: Pretendard Medium;
	font-size: 24px;
	line-height: 1.33;
	margin-bottom: 48px;
	z-index: 10;

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 14px;
  line-height: 20px; /* 142.857% */
  margin-bottom: 32px;
`}
`;

const CtaButtonWrapper = styled.div<any>`
	width: fit-content;
	.button-container {
		padding: 16px 28px;
	}
	z-index: 10;

	${({ $isMobile }) =>
		$isMobile &&
		`
	font-size: 14px;
	line-height: 20px; /* 142.857% */
	margin-bottom: 32px;

	.button-container {
		min-width: 335px;
		padding: 14px 20px;
	}

	.button-text {
		font-size: 16px;
	}
`}
`;

const TopGradient = styled.div<any>`
	position: absolute;
	width: 100%;
	height: 206px;
	background: linear-gradient(180deg, #161432 49.8%, rgba(22, 20, 50, 0) 100%);
	top: 0;
	z-index: 5;
	left: 0;

	${({ $isMobile }) =>
		$isMobile &&
		`
    background: linear-gradient(180deg, #161432 70.54%, rgba(22, 20, 50, 0.00) 99.96%);
    height: 502px;
  `}
`;

const BottomGradient = styled.div<any>`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 198px;
	background: linear-gradient(180deg, rgba(2, 4, 32, 0) 0%, #020420 100%);
	z-index: 7;

	${({ $isMobile }) =>
		$isMobile &&
		`
    height: 90px;
  `}
`;

const RightGradient = styled.div<any>`
	position: absolute;
	right: -150px;
	top: -151px;
	background: linear-gradient(270deg, #020420 34.64%, rgba(2, 4, 32, 0) 10.51%);
	width: 300px;
	height: 816px;
	filter: blur(20px);

	${({ $isMobile }) =>
		$isMobile &&
		`
    top: -40px;
    right: 50%;
    transform: translateX(290px);
    height: 686px;
  `}
`;

const LeftGradient = styled.div<any>`
	position: absolute;
	left: -100px;
	top: -151px;
	z-index: 1;
	width: 755px;
	height: 816px;
	background: linear-gradient(90deg, #020420 34.64%, rgba(2, 4, 32, 0) 95.51%);
	filter: blur(30px);

	${({ $isMobile }) =>
		$isMobile &&
		`
    width: 300px;
    top: -40px;
    left: 50%;
    transform: translateX(-400px);
    height: 686px;
`}
`;

const LeftEllipse = styled.div<any>`
	width: 863px;
	height: 549px;
	flex-shrink: 0;
	border-radius: 863px;
	background: rgba(40, 150, 255, 0.2);
	filter: blur(150px);
	position: absolute;
	left: -430px;
	top: -78px;
	z-index: 6;
	${({ $isMobile }) =>
		$isMobile &&
		`
		display: none;
	`}
`;

const RightEllipse = styled.div<any>`
	width: 726px;
	height: 588px;
	flex-shrink: 0;
	border-radius: 726px;
	background: rgba(148, 107, 249, 0.2);
	filter: blur(100px);
	position: absolute;
	right: -231px;
	bottom: -247px;
	z-index: 6;

	${({ $isMobile }) =>
		$isMobile &&
		`
	width: 269px;
	height: 218px;
	right: -19px;
	top: unset;
	bottom: -456px;

`}
`;
