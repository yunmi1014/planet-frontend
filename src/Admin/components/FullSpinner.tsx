import { Flex, Spinner } from '@chakra-ui/react';
import React from 'react';

const FullSpinner = () => {
	return (
		<Flex flex={1} align="center" justify="center">
			<Spinner />
		</Flex>
	);
};

export default FullSpinner;
