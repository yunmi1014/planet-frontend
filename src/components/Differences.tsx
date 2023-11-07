import { styled } from 'styled-components';
import Container from './Container';
import { Flex, HStack, VStack } from '@chakra-ui/react';
import Image from 'next/image';

interface Props {
	isMobile?: boolean;
	differences?: {
		icon: string;
		iconBackground: string;
		title: string;
		description: string;
		mobileDescription: string;
	}[];
}

const Differeces = (props: Props) => {
	const { isMobile } = props;

	return (
		<Container margin={isMobile ? '68px 0' : '80px auto 120px auto'} padding={isMobile ? '0 20px' : ''} maxWidth={isMobile ? '507px' : undefined}>
			<VStack spacing={isMobile ? '16px' : '12px'} marginBottom={isMobile ? '72px' : '96px'} width="100%">
				<Subtitle $isMobile={isMobile}>Why ATH BASE</Subtitle>
				<Title $isMobile={isMobile}>
					<StyledText>ATH 지표</StyledText>는 무엇이 다른가요?
				</Title>
			</VStack>
			<Flex direction={isMobile ? 'column' : 'row'} width="100%" gap={isMobile ? '64px' : '48px'}>
				{props.differences?.map((item, index) => {
					return (
						<Feature $isMobile={isMobile} key={index}>
							<Icon>
								<Image src={item.icon} width={isMobile ? 48 : 64} height={isMobile ? 48 : 64} alt="아이콘" />
							</Icon>
							<IconBackground $isMobile={isMobile}>
								<Image src={item.iconBackground} width={isMobile ? 100 : 140} height={isMobile ? 100 : 140} alt="그래디언트" />
							</IconBackground>
							<FeatureTitle $isMobile={isMobile}>{item.title}</FeatureTitle>
							<FeatureDescription
								$isMobile={isMobile}
								dangerouslySetInnerHTML={{
									__html: isMobile ? item.mobileDescription : item.description,
								}}
							></FeatureDescription>
						</Feature>
					);
				})}
			</Flex>
		</Container>
	);
};

export default Differeces;

Differeces.defaultProps = {
	differences: [
		{
			icon: '/images/difference1.png',
			iconBackground: '/images/purple_gradient.png',
			title: '리페인트(repaint) 없는 진짜 매매 지표',
			description: `시중의 지표들은 대부분 후행적이거나 단일 근거로 쓰이며,<br/>시그널이 떴다가 사라지는 리페인트가 잦아 수익을 내기가 힘듭니다.
    ATH는 개발자의 노하우가 담긴 오랜 연구와 백테스팅,<br/> 실제 매매를 통한 검증으로 높은 승률을 낼 수 있는<br/>다중 근거 기반 지표를 개발했습니다.`,
			mobileDescription: `시중의 지표들은 대부분 후행적이거나 단일 근<br/>거로 쓰이며, 시그널이 떴다가 사라지는 리페인<br/>트가 잦아 수익을 내기가 힘듭니다.<br/>
      ATH는 개발자의 노하우가 담긴 오랜 연구와<br/> 백테스팅, 실제 매매를 통한 검증으로 높은 승<br/>률을 낼 수 있는 다중 근거 기반<br/> 지표를 개발했습니다.`,
		},
		{
			icon: '/images/difference2.png',
			iconBackground: '/images/green_gradient.png',
			title: '백테스팅 기준 승률 80%',
			description: `시중 지표 매매에서 제공하는 시그널 승률은 <br/>평균 40% 정도에 그치지만, <br/>ATH가 제공하는 다중 근거 기반 지표의 시그널 승률은 <br/>백테스팅 기준 평균 80% 이상입니다.`,
			mobileDescription: '시중 지표 매매에서 제공하는 시그널 승률은<br/> 평균 40% 정도에 그치지만,<br/> ATH가 제공하는 다중 근거 기반 지표의 시그<br/>널 승률은 백테스팅 기준<br/> 평균 80% 이상입니다.',
		},
	],
};

const Subtitle = styled.span<any>`
	color: #8b95a1;
	text-align: center;
	font-family: Pretendard Medium;
	font-size: 20px;
	line-height: 1.4;

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 13px;
  line-height: 18px; /* 138.462% */
  `}
`;

const Title = styled.div<any>`
	text-align: center;
	font-family: Pretendard Bold;
	font-size: 42px;
	line-height: 1.333;

	color: #fff;

	font-family: Pretendard Bold;
	font-size: 42px;
	line-height: 56px;

	${({ $isMobile }) =>
		$isMobile &&
		`
    text-align: center;
    font-size: 24px;
    line-height: 32px; /* 133.333% */
`}
`;

const StyledText = styled.span<any>`
	background: linear-gradient(91deg, #ddfef8 30.91%, #57ead1 60.59%, #9669ff 89.08%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const Feature = styled.div<any>`
	position: relative;
	display: flex;
	// width: 100%;
	padding: 64px 32px 48px 32px;
	flex-direction: column;
	flex: 1;

	border-radius: 24px;
	background: rgba(255, 255, 255, 0.05);
	box-shadow: 0px 1px 2px 0px rgba(255, 255, 255, 0.25) inset;

	${({ $isMobile }) =>
		$isMobile &&
		`padding: 48px 24px 40px 24px;
  `}
`;

const Icon = styled.div<any>`
	position: absolute;
	top: -32px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3;
`;

const FeatureTitle = styled.div<any>`
	color: var(--gray-white, #fff);
	text-align: center;

	font-family: Pretendard Bold;
	font-size: 24px;
	line-height: 32px; /* 133.333% */
	margin-top: 10px;

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 18px;
  line-height: 24px; /* 133.333% */
  `}
`;

const FeatureDescription = styled.p<any>`
	color: var(--gray-200, #caced4);
	text-align: center;
	font-family: Pretendard Medium;
	font-size: 18px;
	line-height: 24px; /* 133.333% */
	margin-top: 24px;

	div {
		margin-top: 8px;
	}

	${({ $isMobile }) =>
		$isMobile &&
		`
			font-family: Pretendard;
			font-size: 16px;
			line-height: 22px; /* 137.5% */
		`}
`;

const IconBackground = styled.div<any>`
	position: absolute;

	z-index: 2;

	${({ $isMobile }) =>
		!$isMobile &&
		`
  top: -70px;
  left: 51%;
  transform: translateX(-50%);
  `}

	${({ $isMobile }) =>
		$isMobile &&
		`
  top: -50px;
  left: 51%;
  transform: translateX(-50%);
`}
`;
