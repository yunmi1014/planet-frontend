import { ReactNode } from 'react';
import Watermark from '@uiw/react-watermark';

interface Props {
	width?: number;
	height?: number;
	imageUrl?: string;
	children: ReactNode;
}

const WaterMark = (props: Props) => {
	return (
		<Watermark image={props.imageUrl} width={280} height={300} offsetLeft={1} offsetTop={-3} rotate={0}>
			{props.children}
		</Watermark>
	);
};

export default WaterMark;

WaterMark.defaultProps = {
	imageUrl: '/images/watermark.png',
};
