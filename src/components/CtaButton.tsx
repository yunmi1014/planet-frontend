import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	isMobile: boolean;
	icon?: ReactNode;
	text: string;
	link?: string;
}

const CtaButton = (props: Props) => {
	return (
		<a href={props.link} target="_blank">
			<StyledButton className="button-container" $isMobile={props.isMobile}>
				{props.icon}
				<Text className="button-text" $isMobile={props.isMobile}>
					{props.text}
				</Text>
			</StyledButton>
		</a>
	);
};

export default CtaButton;

CtaButton.defaultProps = {
	text: '문의하기',
};

const StyledButton = styled.span<any>`
	display: flex;
	width: 100%;
	justify-content: center;
	align-items: center;
	padding: 12px 20px;
	gap: 12px;

	border-radius: 8px;
	outline: 1px solid rgba(255, 255, 255, 0.4);
	background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.2) 100%);

	box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
	box-sizing: border-box;
	${({ $isMobile }) => $isMobile && `padding: 8px 12px;`}
`;

const Text = styled.span<any>`
	color: #fff;
	font-family: Pretendard Bold;
	font-size: 18px;
	line-height: 1.333; /* 133.333% */
	${({ $isMobile }) => $isMobile && ` font-size: 12px; line-height: 16px;`}
`;
