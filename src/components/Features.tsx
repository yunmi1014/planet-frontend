'use client';

import { Box, Flex, VStack } from '@chakra-ui/react';
import Container from './Container';
import { styled } from 'styled-components';
import Image from 'next/image';

interface Props {
	isMobile?: boolean;
}

const Features = (props: Props) => {
	const { isMobile } = props;
	return (
		<Container margin={isMobile ? '68px 0' : '96px 0'} padding={isMobile ? '0 20px' : ''} maxWidth={isMobile ? '507px' : undefined}>
			<FeatureLeftGradation $isMobile={isMobile} />
			<FeatureRightGradation $isMobile={isMobile} />
			<VStack spacing={isMobile ? '16px' : '12px'} marginBottom={isMobile ? '48px' : '96px'} width="100%">
				<Subtitle $isMobile={isMobile}>Features</Subtitle>
				<Title $isMobile={isMobile}>
					<StyledText $isMobile={isMobile}>80%이상의 승률</StyledText>
					<span
						dangerouslySetInnerHTML={{
							__html: '을 책임지는<br/> 직관적인 투자를 경험해보세요',
						}}
					/>
				</Title>
			</VStack>
			<VStack spacing={isMobile ? '32px' : '96px'}>
				{/* feature 1 */}
				<Box height={isMobile ? '648px' : 'auto'} width="100%">
					<Feature $isMobile={isMobile}>
						<Flex width={isMobile ? '100%' : 'fit-conent'} justifyContent="center">
							<Box marginBottom={isMobile ? '68px' : '0'}>
								<Flex gap={isMobile ? '16px' : '28px'} marginBottom={isMobile ? '28px' : '48px'} align="flex-start" minW="287px">
									<Image src="/images/feature1.png" width={isMobile ? 40 : 64} height={isMobile ? 40 : 64} alt="아이콘" />
									<FeatureTitle
										$isMobile={isMobile}
										dangerouslySetInnerHTML={{
											__html: '스마트 트레이더를 위한<br/>확실한 도구 ATH Base',
										}}
									/>
								</Flex>
								<VStack spacing="12px" padding={isMobile ? '0 0 0 4px' : '0 0 0 12px'} align={'left'}>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: isMobile ? '타임 프레임 별로 추세를 파악하기에<br/> 용이한 구름대' : '타임 프레임 별로 추세를 파악하기에 용이한 구름대',
											}}
										/>
									</Flex>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: isMobile ? '추세 전환의 시작점과 전환점을<br/> 파악하기에 용이한 마이너' : '추세 전환의 시작점과 전환점을 파악하기에 용이한 마이너',
											}}
										/>
									</Flex>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: isMobile ? '고래와 세력들이 매집하는 패턴을<br/> 파악하고 기록해주는 웨일헌터' : '고래와 세력들이 매집하는 패턴을 파악하고 기록해주는 웨일헌터',
											}}
										/>
									</Flex>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: isMobile ? '그 외에도 멀티 이평선, 빔, 노름대 등<br/> 본인만의 매매법에 적용할 수 있는<br/> 다양한 지표 제공' : '그 외에도 멀티 이평선, 빔, 노름대 등 본인만의 매매법에 적용할 수 있는<br/> 다양한 지표 제공',
											}}
										/>
									</Flex>
								</VStack>
							</Box>
						</Flex>
						<Box position="absolute" right={isMobile ? '50%' : '0'} transform={isMobile ? 'translateX(50%)' : ''} bottom="0" zIndex="3" width={isMobile ? 300 : 554} height={isMobile ? 214 : 389}>
							<Image src={isMobile ? '/images/iMac1_mobile.png' : '/images/iMac1_pc.png'} fill alt="이미지" />
						</Box>
						<Feature1Gradation $isMobile={isMobile} />
					</Feature>
				</Box>
				{/* feature 2 */}
				<Box height={isMobile ? '592px' : 'auto'} width="100%">
					<Feature $isMobile={isMobile} $reverse={true}>
						<Flex width={isMobile ? '100%' : 'fit-content'} justifyContent="center">
							<Box marginBottom={isMobile ? '68px' : '0'}>
								<Flex gap={isMobile ? '16px' : '28px'} marginBottom={isMobile ? '28px' : '48px'} align="flex-start" minW="287px">
									<Image src="/images/feature2.png" width={isMobile ? 40 : 64} height={isMobile ? 40 : 64} alt="아이콘" />
									<FeatureTitle
										$isMobile={isMobile}
										dangerouslySetInnerHTML={{
											__html: '지지, 저항선을 활용한 <br/>쉬운 투자 ATH Note',
										}}
									/>
								</Flex>
								<VStack spacing="12px" padding={isMobile ? '0 0 0 4px' : '0 0 0 12px'} align={'left'}>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: isMobile ? '원칙적, 기계적으로 실매매할 수 있는<br/> 진입 장벽이 낮은 지표' : '원칙적, 기계적으로 실매매할 수 있는 진입 장벽이 낮은 지표',
											}}
										/>
									</Flex>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: isMobile ? '차트 파동의 분기와 시간을 계산하여<br/> 4가지 Level의 지지, 저항선 제공' : '차트 파동의 분기와 시간을 계산하여 4가지 Level의 지지, 저항선 제공',
											}}
										/>
									</Flex>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: isMobile ? '스캘핑, 스윙 등 개인의 트레이딩<br/> 성향에 따라 설정을 바꿔 사용할 수<br/> 있도록 옵션 제공' : '스캘핑, 스윙 등 개인의 트레이딩 성향에 따라 설정을 바꿔 <br/>사용할 수 있도록 옵션 제공',
											}}
										/>
									</Flex>
								</VStack>
							</Box>
						</Flex>
						<Box position="absolute" left={isMobile ? '50%' : '0'} transform={isMobile ? 'translateX(-50%)' : ''} bottom="0" zIndex="3" width={isMobile ? 300 : 580} height={isMobile ? 214 : 400}>
							<Image src={isMobile ? '/images/iMac2_mobile.png' : '/images/iMac2.png'} fill alt="이미지" />
						</Box>
						<Feature2Gradation $isMobile={isMobile} />
					</Feature>
				</Box>
				{/* feature3 */}
				<Box height={isMobile ? '592px' : 'auto'} width="100%">
					<Feature $isMobile={isMobile} $reverse={false}>
						<Flex width={isMobile ? '100%' : 'fit-content'} justifyContent="center">
							<Box marginBottom={isMobile ? '68px' : '0'}>
								<Flex gap={isMobile ? '16px' : '28px'} marginBottom={isMobile ? '28px' : '48px'} align="flex-start" minW="287px">
									<Image src="/images/feature3.png" width={isMobile ? 40 : 64} height={isMobile ? 40 : 64} alt="아이콘" />
									<FeatureTitle
										$isMobile={isMobile}
										dangerouslySetInnerHTML={{
											__html: '실제 매매에서 <br/>바로 수익을 낼 수 있는 지표',
										}}
									/>
								</Flex>
								<VStack spacing="12px" padding={isMobile ? '0 0 0 4px' : '0 0 0 12px'} align={'left'}>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: '지표를 이용한 승률 높은 자동매매',
											}}
										/>
									</Flex>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: '승률이 검증된 API 트레이딩',
											}}
										/>
									</Flex>
									<Flex gap="12px" align="flex-start">
										<Image src="/images/check-circle.png" width={isMobile ? 24 : 28} height={isMobile ? 24 : 28} alt="체크 아이콘" />
										<FeatureDescription
											$isMobile={isMobile}
											dangerouslySetInnerHTML={{
												__html: isMobile ? '높은 승률을 보장하는 실매매 데이터<br/> 대량 보유' : '높은 승률을 보장하는 실매매 데이터 대량 보유',
											}}
										/>
									</Flex>
								</VStack>
							</Box>
						</Flex>
						<Box position="absolute" right={isMobile ? '50%' : '0'} transform={isMobile ? 'translateX(58%)' : ''} bottom={isMobile ? '-270px' : '0'} zIndex="3" width={isMobile ? 720 : 820} height={isMobile ? 650 : 500}>
							<Image src={isMobile ? '/images/laptop_mobile2.png' : '/images/laptop.png'} fill alt="이미지" />
						</Box>
					</Feature>
				</Box>
			</VStack>
		</Container>
	);
};

export default Features;

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

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 24px;
  line-height: 32px;
`}
`;

const StyledText = styled.span<any>`
	background: linear-gradient(91deg, #ddfef8 0.39%, #57ead1 1.9%, #9669ff 60.92%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
`;

const Feature = styled.div<any>`
	display: flex;
	flex-direction: ${({ $reverse }) => ($reverse ? 'row-reverse' : 'row')};
	align-items: center;
	width: 100%;
	height: 488px;
	padding: 64px;
	border-radius: 24px;
	background: rgba(255, 255, 255, 0.05);
	box-shadow: 0px 1px 2px 0px rgba(255, 255, 255, 0.25) inset;
	overflow: hidden;
	position: relative;

	${({ $isMobile }) =>
		$isMobile &&
		`
    // max-width: 467px;
    height: 100%;
    flex-direction: column;
    align-items: center;
    padding: 48px 24px 0px 24px;
  `}
`;

const FeatureTitle = styled.span<any>`
	color: #fff;
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

const FeatureDescription = styled.span<any>`
	color: var(--gray-200, #caced4);

	font-family: Pretendard Medium;
	font-size: 18px;
	line-height: 24px; /* 133.333% */

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 16px;
  line-height: 22px;
  `}
`;

const Feature1Gradation = styled.div<any>`
	width: 598px;
	height: 482px;
	flex-shrink: 0;
	border-radius: 598px;
	background: linear-gradient(150deg, rgba(64, 161, 254, 0.35) 20.77%, rgba(127, 86, 217, 0.35) 64.94%);
	filter: blur(60px);
	position: absolute;
	right: -5px;
	bottom: -19px;

	${({ $isMobile }) =>
		$isMobile &&
		`
    width: 467px;
    height: 376px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    right: 43px;
    bottom: -131px;
  `}
`;
const Feature2Gradation = styled.div<any>`
	width: 598px;
	height: 482px;
	border-radius: 598px;
	background: linear-gradient(150deg, rgba(64, 161, 254, 0.35) 20.77%, rgba(127, 86, 217, 0.35) 64.94%);
	filter: blur(60px);
	position: absolute;
	left: -81px;
	bottom: -7px;

	${({ $isMobile }) =>
		$isMobile &&
		`
  width: 467px;
  height: 376px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  right: 43px;
  bottom: -131px;
`}
`;

const FeatureLeftGradation = styled.div<any>`
	width: 976px;
	height: 482px;
	flex-shrink: 0;
	border-radius: 976px;
	background: linear-gradient(150deg, rgba(64, 161, 254, 0.15) 20.77%, rgba(127, 86, 217, 0.15) 64.94%);
	filter: blur(60px);
	position: absolute;
	top: 82px;
	left: -584px;

	${({ $isMobile }) =>
		$isMobile &&
		`
    width: 469px;
    height: 382px;
    top: 8px;
    left: -211px;
  `}
`;

const FeatureRightGradation = styled.div<any>`
	width: 943px;
	height: 1544px;
	flex-shrink: 0;
	border-radius: 1544px;
	background: rgba(148, 107, 249, 0.12);
	filter: blur(100px);
	position: absolute;
	top: 456px;
	right: -550px;

	${({ $isMobile }) =>
		$isMobile &&
		`
  width: 313px;
  height: 1544px;
  top: 400px;
  right: -124px;
`}
`;
