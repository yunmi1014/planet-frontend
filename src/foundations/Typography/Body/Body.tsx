import { Box, Text, TextProps, TypographyProps } from '@chakra-ui/react';
import React, { useState, useCallback, useMemo, useEffect, ReactNode } from 'react';

export interface BodyProps extends TextProps {
	size: 'b1' | 'b2' | 'b3' | 'b4' | 'b5';
	children?: ReactNode;
	html?: string;
}

const Body = ({ size = 'b3', children, html, ...props }: BodyProps) => {
	const fontWeight = props.fontWeight === 'bold' ? { fontFamily: 'heading', fontWeight: 'bold' } : { fontFamily: 'body', fontWeight: 'normal' };

	if (html) {
		return (
			<Text size={size} dangerouslySetInnerHTML={{ __html: html }} {...fontWeight} {...props} suppressHydrationWarning>
				{children}
			</Text>
		);
	}

	return (
		<Text size={size} {...fontWeight} {...props}>
			{children}
		</Text>
	);
};

Body.defaultProps = {
	fontWeight: 'normal',
	size: 'inherit',
};

export default Body;
