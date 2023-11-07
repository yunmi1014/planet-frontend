import { Flex, useMediaQuery } from '@chakra-ui/react';
import React from 'react';
import Header from '../src/components/Header';
import Hero from '../src/components/Hero';
import SlideSection from '../src/components/SlideSection';
import Differeces from '../src/components/Differences';
import FAQ from '../src/components/FAQ';
import Features from '../src/components/Features';
import Footer from '../src/components/Footer';
import Preview from '../src/components/Preview';
import Preview2 from '../src/components/Preview2';
import useBreakPoint from '../src/hooks/useBreakpoints';

const MainPage = (props) => {
	const { isMobile } = useBreakPoint(props.isMobile);

	return null;
	return (
		<Flex direction="column" align="center" width="100%" bg="#020420">
			<Header isMobile={isMobile} />
			<Hero isMobile={isMobile} />
			<SlideSection isMobile={isMobile} />
			<Differeces isMobile={isMobile} />
			<Features isMobile={isMobile} />
			<Preview isMobile={isMobile} />
			<Preview2 isMobile={isMobile} />
			<FAQ isMobile={isMobile} />
			<Footer isMobile={isMobile} />
		</Flex>
	);
};

export default MainPage;
