'use client';

import { styled } from 'styled-components';
import Container from './Container';
import { Flex } from '@chakra-ui/react';
import MyAccordion from './MyAccordion';

interface Props {
	isMobile: boolean;
}

const FAQ = (props: Props) => {
	const { isMobile } = props;
	return (
		<Container margin={isMobile ? '68px auto' : '96px auto'} padding={isMobile ? '0 20px' : '0'}>
			<Flex direction="column" alignItems="center" width="100%">
				<Title $isMobile={isMobile}>[FAQ] 자주 묻는 질문</Title>
				<MyAccordion isMobile={isMobile} />
			</Flex>
		</Container>
	);
};

export default FAQ;

const Title = styled.span<any>`
	color: var(--gray-white, #fff);
	text-align: center;

	font-family: Pretendard Bold;
	font-size: 42px;
	line-height: 56px; /* 133.333% */
	margin-bottom: 64px;

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 24px;
  line-height: 32px;
  margin-bottom: 48px;
  `}
`;
