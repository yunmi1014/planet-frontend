import styled from '@emotion/styled';
import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

const Container = (props: Props) => {
	return (
		<Wrapper>
			<Content>{props.children}</Content>
		</Wrapper>
	);
};

export default Container;

const Wrapper = styled.div`
	background: #fff;
	width: 100%;
	height: 100%;
`;

const Content = styled.div`
	width: 100%;
	overflow: hidden;
`;
