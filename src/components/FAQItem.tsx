import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex } from '@chakra-ui/react';
import Image from 'next/image';
import { useState } from 'react';
import { styled } from 'styled-components';

interface Prosp {
	title: string;
	content: string;
	postscript: string;
	mobileTitle: string;
	mobileContent: string;
	mobilePostscript: string;
	isMobile: boolean;
}

const FAQItem = (props: Prosp) => {
	const [isOpen, setIsOpen] = useState(false);
	const { isMobile } = props;
	return (
		<AccordionItem>
			<Flex width="100%" justify="center">
				<AccordionButton maxW={isMobile ? '467px' : '800px'} onClick={() => setIsOpen(!isOpen)} padding="0">
					<Flex width="100%" direction="column" align="flex-start" gap="8px" borderRadius="12px" background="rgba(255, 255, 255, 0.05);" boxShadow=" 0px 1px 2px 0px rgba(255, 255, 255, 0.25) inset;" padding="24px" _hover={{ background: 'rgba(255, 255, 255, 0.15);' }}>
						<Flex width="100%" align="center" justify="space-between">
							<Content $isMobile={isMobile}>
								<span
									dangerouslySetInnerHTML={{
										__html: isMobile ? props.mobileTitle : props.title,
									}}
								/>
							</Content>
							{isOpen && <Image src="/images/x-close.png" width={24} height={24} alt="x 기호" />}
							{!isOpen && <Image src="/images/plus.png" width={24} height={24} alt="+ 기호" />}
						</Flex>
						<AccordionPanel padding="0">
							<Answer
								dangerouslySetInnerHTML={{
									__html: isMobile ? props.mobileContent : props.content,
								}}
							/>
							{props.postscript && (
								<PostScript
									dangerouslySetInnerHTML={{
										__html: isMobile ? props.mobilePostscript : props.postscript,
									}}
								></PostScript>
							)}
						</AccordionPanel>
					</Flex>
				</AccordionButton>
			</Flex>
		</AccordionItem>
	);
};

export default FAQItem;

const Content = styled.div<any>`
	color: var(--gray-white, #fff);

	/* Text lg/Bold */
	font-family: Pretendard Bold;
	font-size: 18px;
	line-height: 24px; /* 133.333% */

	${({ $isMobile }) =>
		$isMobile &&
		`
	text-align: left;
  font-size: 18px;
  line-height: 24px;
  `}
`;

const Answer = styled.div`
	text-align: left;
	color: var(--gray-200, #caced4);
	font-family: Pretendard Medium;
	font-size: 16px;
	line-height: 22px; /* 137.5% */
`;

const PostScript = styled.div`
	color: var(--gray-200, #caced4);

	text-align: left;
	font-family: Pretendard Bold;
	font-size: 14px;
	line-height: 20px; /* 142.857% */
	margin-top: 8px;
`;
