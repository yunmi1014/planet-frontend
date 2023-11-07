import { Box, Text, TypographyProps, Button as ChakraButton, ButtonProps as ChakraButtonProps, Flex } from '@chakra-ui/react';
import { merge, isEmpty } from 'lodash';
import Link from 'next/link';
import React, { useState, useCallback, useMemo, useEffect, ReactNode, ReactElement } from 'react';

export interface ButtonProps extends ChakraButtonProps {
	height?: number;
	children: ReactNode;
	leftIcon?: ReactElement;
	rightIcon?: ReactElement;
	link?: string;
}

const Button = (props: ButtonProps) => {
	const { variant, height, children, leftIcon, rightIcon, link, ...rest } = props;
	const [buttonHeight, setButtonHeight] = useState(height!);
	const paddingX = getPaddingXByHeight(height!);
	const fontSize = getFontSizeByHeight(height!);
	const gutter = getGutterBetweenIconAndText(height!);

	const LeftIcon = useMemo(() => {
		if (isEmpty(leftIcon)) return null;
		return <Box paddingRight={`${gutter}px`}>{leftIcon}</Box>;
	}, [gutter, leftIcon]);

	const RightIcon = useMemo(() => {
		if (isEmpty(rightIcon)) return null;
		return <Box paddingLeft={`${gutter}px`}>{rightIcon}</Box>;
	}, [gutter, rightIcon]);

	useEffect(() => {
		setButtonHeight(height!);
	}, [height]);

	if (link) {
		return (
			<Link href={link} target="_blank" rel="noreferrer">
				<ChakraButton variant={variant} h={`${height}px`} minH={`${height}px`} fontSize={`${fontSize}px`} paddingX={`${paddingX}px`} {...rest}>
					{LeftIcon}
					<Box>{children}</Box>
					{RightIcon}
				</ChakraButton>
			</Link>
		);
	}

	return (
		<ChakraButton variant={variant} h={`${height}px`} minH={`${height}px`} fontSize={`${fontSize}px`} paddingX={`${paddingX}px`} {...rest}>
			{LeftIcon}
			<Box mt="2px">{children}</Box>
			{RightIcon}
		</ChakraButton>
	);
};

Button.defaultProps = {
	variant: 'solid',
	height: 48,
};

function getPaddingXByHeight(height: number) {
	return height / 2 - 4;
}

function getFontSizeByHeight(height: number) {
	if (height <= 30) return 12;
	else if (height <= 40) return 14;
	else if (height <= 50) return 16;
	else if (height <= 70) return 18;
	return height / 3;
}

function getGutterBetweenIconAndText(height: number) {
	if (height <= 30) return 2;
	else if (height <= 40) return 4;
	else if (height <= 60) return 8;
	else if (height <= 70) return 12;
	return 14;
}

export default Button;
