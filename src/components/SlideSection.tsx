'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay';
import Image from 'next/image';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';

interface Props {
	isMobile?: boolean;
	cards: string[];
}

const SlideSection = (props: Props) => {
	const [delay, setDelay] = useState(100);
	const [isLoading, setIsLoading] = useState(true);
	const { isMobile } = props;

	useEffect(() => {
		setDelay(0);
		setIsLoading(false);
	}, []);

	if (isLoading && isMobile) return null;

	return (
		<SwiperContainer $isMobile={isMobile}>
			<Swiper
				key={props.cards.length}
				direction="horizontal"
				spaceBetween={isMobile ? 12 : 32}
				slidesPerView={'auto'}
				loop={true}
				initialSlide={10}
				centeredSlides={isMobile ? true : false}
				speed={3000}
				autoplay={{
					delay: delay,
					disableOnInteraction: false,
				}}
				modules={[Autoplay]}
				pagination={{
					clickable: true,
				}}
			>
				{props.cards &&
					props.cards.map((card, index) => {
						return (
							<SwiperSlide key={index}>
								<ImageWrapper>
									<Image src={card} width={isMobile ? 240 : 280} height={isMobile ? 256 : 300} alt="수익률" quality={isMobile ? 30 : 75} />
								</ImageWrapper>
							</SwiperSlide>
						);
					})}
			</Swiper>
			<Gradation $isMobile={isMobile} />
		</SwiperContainer>
	);
};

export default SlideSection;

SlideSection.defaultProps = {
	cards: ['/images/cards/card1.png', '/images/cards/card2.png', '/images/cards/card3.png', '/images/cards/card4.png', '/images/cards/card5.png', '/images/cards/card6.png', '/images/cards/card7.png', '/images/cards/card8.png', '/images/cards/card9.png', '/images/cards/card10.png', '/images/cards/card11.png', '/images/cards/card12.png', '/images/cards/card13.png', '/images/cards/card14.png', '/images/cards/card15.png', '/images/cards/card16.png'],
};

const SwiperContainer = styled.div<any>`
	width: 100%;

	.swiper {
		transition-timing-function: linear;
	}

	.swiper-slide {
		width: fit-content;
		transition-timing-function: linear;
	}

	.swiper-wrapper {
		transition-timing-function: linear;
	}

	margin: 64px 0;

	${({ $isMobile }) =>
		$isMobile &&
		`
    margin: 48px 0;
  `}
	position: relative;
`;

const ImageWrapper = styled.div`
	width: fit-content;
	border-radius: 17px;
	overflow: hidden;
`;

const Gradation = styled.div<any>`
	width: 100%;
	height: 300px;
	position: absolute;
	bottom: 0;
	pointer-events: none;
	z-index: 5;
	background: linear-gradient(270deg, rgba(0, 0, 2, 1) 0%, rgba(217, 217, 217, 0) 25%, rgba(217, 217, 217, 0) 25.52%, rgba(217, 217, 217, 0) 50.52%, rgba(217, 217, 217, 0) 73.96%, rgba(0, 0, 2, 1) 100%);
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

	${({ $isMobile }) =>
		$isMobile &&
		`
		height: 256px;
	`}
`;
