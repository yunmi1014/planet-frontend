'use client';

import Image from 'next/image';
import { styled } from 'styled-components';

interface Props {
	icon: string;
	title: string;
	description: string;
	isMobile?: boolean;
}

const PreviewItem = (props: Props) => {
	const { isMobile } = props;
	return (
		<Wrappper className="previewItem-container" $isMobile={isMobile}>
			<IconWrapper>
				<Image src={props.icon} width={isMobile ? 40 : 48} height={isMobile ? 40 : 48} alt="아이콘" />
			</IconWrapper>
			<Title $isMobile={isMobile}>{props.title}</Title>
			<Description dangerouslySetInnerHTML={{ __html: props.description }} />
		</Wrappper>
	);
};

export default PreviewItem;

const Wrappper = styled.div<any>`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 320px;
	padding: 40px 32px;
	border-radius: 24px;
	background: rgba(255, 255, 255, 0.05);
	box-shadow: 0px 1px 2px 0px rgba(255, 255, 255, 0.25) inset;

	${({ $isMobile }) =>
		$isMobile &&
		`
    width: 100%;
    max-width: 467px;
		min-height: unset;
    margin: 0 auto;
    padding: 32px 24px;
  `}
`;

const IconWrapper = styled.div`
	margin-bottom: 20px;
`;

const Title = styled.span<any>`
	color: var(--gray-white, #fff);
	text-align: center;

	font-family: Pretendard Bold;
	font-size: 24px;
	line-height: 32px; /* 133.333% */
	margin-bottom: 8px;

	${({ $isMobile }) =>
		$isMobile &&
		`
  font-size: 20px;
  line-height: 28px;
  `}
`;

const Description = styled.span`
	color: var(--gray-200, #caced4);
	text-align: center;

	/* Text md/Medium */
	font-family: Pretendard Medium;
	font-size: 16px;
	line-height: 22px; /* 137.5% */
`;
