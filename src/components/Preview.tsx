'use client';

import { Grid, GridItem, VStack } from '@chakra-ui/react';
import Container from './Container';
import { styled } from 'styled-components';
import PreviewItem from './PreviewItem';
import Image from 'next/image';

interface Props {
	isMobile?: boolean;
	styledText?: string;
	title: string;
	gradient: string;
	gradientReverse: boolean;
	previews: {
		icon: string;
		title: string;
		description: string;
		mobileDescription: string;
	}[];
}

const Preview = (props: Props) => {
	const { isMobile } = props;
	return (
		<Container margin={isMobile ? '68px auto' : '96px auto'} padding={isMobile ? '0 20px' : '0'}>
			<GradientWrapper $gradientReverse={props.gradientReverse}>
				<Image src={props.gradient} width={848} height={419} alt="그라데이션" />
			</GradientWrapper>
			<VStack spacing={isMobile ? '16px' : '12px'} marginBottom={isMobile ? '48px' : '64px'} width="100%">
				<Subtitle $isMobile={isMobile}>Preview</Subtitle>
				<Title $isMobile={isMobile}>
					<span
						dangerouslySetInnerHTML={{
							__html: props.title,
						}}
					/>
				</Title>
			</VStack>
			<Grid templateColumns={isMobile ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)'} columnGap="32px" rowGap="32px">
				{props.previews &&
					props.previews.map((item, index) => {
						return <PreviewItem isMobile={isMobile} key={index} icon={item.icon} title={item.title} description={isMobile ? item.mobileDescription : item.description} />;
					})}
			</Grid>
		</Container>
	);
};

export default Preview;

Preview.defaultProps = {
	title: '<span>ATH BASE</span>는 다양한 지표를<br/>매매의 근거로 활용합니다',
	gradient: '/images/preview2Gradient.png',
	gradientReverse: false,
	previews: [
		{
			icon: '/images/icons/preview1.png',
			title: '구름대',
			description: '구름대는 타임 프레임 별로 추세를<br/>파악하기에 용이합니다. 멀티 구름대는<br/> 한 타임 프레임에서 다른 타임 프레임의<br/> 구름대를 한꺼번에 확인 가능하여 트레이더에게<br/> 새로운 가시적 경험을 제공할 것입니다.',
			mobileDescription: '구름대는 타임 프레임 별로 추세를<br/>파악하기에 용이합니다. 멀티 구름대는<br/> 한 타임 프레임에서 다른 타임 프레임의<br/> 구름대를 한꺼번에 확인 가능하여<br/> 트레이더에게 새로운 가시적 경험을<br/> 제공할 것입니다.',
		},
		{
			icon: '/images/icons/preview2.png',
			title: '마이너',
			description: '마이너는 고래와 세력들이 각 타임 프레임에 따라<br/>사고 판 흔적이 남는 지표입니다. 추세 전환의<br/> 시작점과 전환점을 파악하기에 용이하여<br/> 트레이더가 박스권에서 양방향을<br/> 모두 적극적으로 매매할 수 있도록 돕습니다.',
			mobileDescription: '마이너는 고래와 세력들이 각 타임 프레임에<br/>따라 사고 판 흔적이 남는 지표입니다.<br/> 추세 전환의 시작점과 전환점을<br/> 파악하기에 용이하여 트레이더가<br/> 박스권에서 양방향을 모두 적극적으로<br/> 매매할 수 있도록 돕습니다.',
		},
		{
			icon: '/images/icons/preview3.png',
			title: '웨일헌터',
			description: '웨일헌터는 고래의 직접적인 매집 패턴을 파악하여<br/> 매매에 활용합니다. 트레이더는 고래의 등에 업어타며 함께 포트폴리오를 구성할 수 있습니다.<br/> 별도 사용법 없이 직관적으로 매수 타점을<br/> 파악할 수 있는 낮은 난이도의 매매법입니다.',
			mobileDescription: '웨일헌터는 고래의 직접적인 매집 패턴을 파악<br/>하여 매매에 활용합니다. 트레이더는 고래의<br/> 등에 업어타며 함께 포트폴리오를<br/> 구성할 수 있습니다. 별도 사용법 없이<br/> 직관적으로 매수 타점을 파악할 수 있는<br/> 낮은 난이도의 매매법입니다.',
		},
		{
			icon: '/images/icons/preview4.png',
			title: '멀티 이평선',
			description: '멀티 이평선은 매매에 유용한 여러 값의 이평선들을<br/> 한 눈에 보여주어 캔들의 타임프레임마다<br/>상응하는 이평선 값들을 표기해 줍니다.<br/>트레이더는 멀티 이평선을 통해 지지선과<br/>저항선을 파악하여 효율적인 매매가 가능합니다.',
			mobileDescription: '멀티 이평선은 매매에 유용한 여러 값의 이평선<br/>들을 한 눈에 보여주어 캔들의 타임프레임마다<br/> 상응하는 이평선 값들을 표기해 줍니다.<br/> 트레이더는 멀티 이평선을 통해 지지선과<br/>저항선을 파악하여 효율적인<br/>매매가 가능합니다.',
		},
		{
			icon: '/images/icons/preview5.png',
			title: '빔',
			description: '빔은 마켓 메이커들의 시장 참여 물량 알고리즘을<br/>분석하여 강한 물량 진입 시도 흔적을 추적하고<br/>이를 차트에 기록한 지표입니다. 시장 방향성을<br/>반전시킬 수 있는 수급이 들어오는 지점을 분석해<br/>단기 추세 전환을 파악합니다.',
			mobileDescription: '빔은 마켓 메이커들의 시장 참여 물량<br/>알고리즘을 분석하여 강한 물량 진입<br/>시도 흔적을 추적하고 이를 차트에 기록한<br/>지표입니다. 시장 방향성을 반전시킬 수 있는<br/>수급이 들어오는 지점을 분석해<br/>단기 추세 전환을 파악합니다.',
		},
		{
			icon: '/images/icons/preview6.png',
			title: '노름대',
			description: '노름대는 각 분기별 고래들의 특정한 동향을<br/>파악해 강력한 지지/저항대를 산출해내는<br/>최종 구름대입니다. 시장의 여러가지 동향과<br/>자금 흐름을 파악하는 매우 정교한 알고리즘 <br/>바탕으로 한 지표입니다.',
			mobileDescription: '노름대는 각 분기별 고래들의 특정한 동향을<br/>파악해 강력한 지지/저항대를 산출해내는<br/> 최종 구름대입니다. 시장의 여러가지 동향과<br/>자금 흐름을 파악하는 매우 정교한 알고리즘<br/>바탕으로 한 지표입니다.',
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
  line-height: 18px; 
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

	span > span {
		background: linear-gradient(91deg, #ddfef8 -50%, #57ead1 -40%, #9669ff 48.68%);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 24px;
  line-height: 32px;
  `}
`;

const GradientWrapper = styled.div<any>`
	position: absolute;

	${({ $gradientReverse }) =>
		!$gradientReverse &&
		`
    top: -60px;
    right: -207px;
`}

	${({ $gradientReverse }) =>
		$gradientReverse &&
		`
  top: -60px;
  left: -207px;
  `}
`;
