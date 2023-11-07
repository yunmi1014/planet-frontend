import { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
	isMobile?: boolean;
	children: ReactNode;
	height?: string;
	margin?: string;
	padding?: string;
	maxWidth?: string;
}

const Container = (props: Props) => {
	return (
		<Wrapper margin={props.margin} padding={props.padding} maxWidth={props.maxWidth}>
			{props.children}
		</Wrapper>
	);
};

export default Container;

const Wrapper = styled.div<any>`
	position: relative;
	width: 100%;
	max-width: ${({ maxWidth }) => maxWidth ?? '1240px'};
	margin: ${({ margin }) => margin ?? '0 auto'};
	height: ${({ height }) => height};
	padding: ${({ padding }) => padding};
`;
