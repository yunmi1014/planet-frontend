'use client';

import Image from 'next/image';
import { styled } from 'styled-components';
import WaterMark from './WaterMark';

interface Props {
	isMobile?: boolean;
	cards: string[];
}

const SlideSection2 = (props: Props) => {
	const { isMobile } = props;

	return (
		<SliderContainer className="slider-container" $isMobile={isMobile}>
			<Slider className="slider" $isMobile={isMobile}>
				<SlideTrack className="slide-track" $isMobile={isMobile}>
					{props.cards.concat([...props.cards]).map((card, index) => {
						return (
							<Slide key={index} gap={isMobile ? '12px' : '0'}>
								<ImageWrapper>
									<WaterMark>
										<Image src={card} width={isMobile ? 240 : 280} height={isMobile ? 256 : 300} alt="수익률" priority />
									</WaterMark>
								</ImageWrapper>
							</Slide>
						);
					})}
				</SlideTrack>
				<Gradation className="gradation" $isMobile={isMobile} />
			</Slider>
		</SliderContainer>
	);
};

export default SlideSection2;

SlideSection2.defaultProps = {
	cards: ['/images/cards/card1.png', '/images/cards/card2.png', '/images/cards/card3.png', '/images/cards/card4.png', '/images/cards/card5.png', '/images/cards/card6.png', '/images/cards/card7.png', '/images/cards/card8.png', '/images/cards/card9.png', '/images/cards/card10.png', '/images/cards/card11.png', '/images/cards/card12.png', '/images/cards/card13.png', '/images/cards/card14.png', '/images/cards/card15.png', '/images/cards/card16.png'],
};

const SliderContainer = styled.div<any>`
	width: 100%;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;

	margin: 64px 0;

	${({ $isMobile }) =>
		$isMobile &&
		`
    height: 256px;
    margin: 48px 0;
  `}
	position: relative;
`;

// 슬라이드 개수만큼 너비
const Slider = styled.div<any>`
	display: flex;
	width: calc(280px * 16);
	height: 100%;
	position: relative;
	overflow: hidden;

	${({ $isMobile }) =>
		$isMobile &&
		`
    width: calc(240px * 16);
  `}
`;

const SlideTrack = styled.div<any>`
	display: flex;
  width: fit-content;
	height: 100%;
  // position: absolute;
  left: 0
	// animation: slideAnimation 20s linear infinite;
  &:hover {
    animation-play-state: paused;
  }

	@keyframes slideAnimation {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-280px * 16));
		}
	}

  ${({ $isMobile }) =>
		$isMobile &&
		`
  left: 50%;
  transform: translateX(-50%);
  // animation: slideAnimation 15s linear infinite;
  @keyframes slideAnimation {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-240px * 16));
		}
	}
  `}
`;

const Slide = styled.div<any>`
	height: 100%;
	flex-shrink: 0;
	margin-right: ${({ gap }) => gap};
`;

const ImageWrapper = styled.div`
	width: fit-content;
	border-radius: 17px;
	overflow: hidden;
`;

const Gradation = styled.div<any>`
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	pointer-events: none;
	z-index: 5;
	background: linear-gradient(270deg, rgba(0, 0, 2, 1) 0%, rgba(217, 217, 217, 0) 25%, rgba(217, 217, 217, 0) 25.52%, rgba(217, 217, 217, 0) 50.52%, rgba(217, 217, 217, 0) 73.96%, rgba(0, 0, 2, 1) 100%);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

	${({ $isMobile }) =>
		$isMobile &&
		`
		height: 100%;
	`}
`;
