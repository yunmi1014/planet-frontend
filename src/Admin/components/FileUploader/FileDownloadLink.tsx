import { CloseIcon } from '@chakra-ui/icons';
import { Flex, Link } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React from 'react';

type Props = {
	fileUrl: string;
	label: string;
	onClickRemoveButton?: any;
};

const FileDownloadLink = (props: Props) => {
	const { fileUrl, label, onClickRemoveButton } = props;

	return (
		<Flex gap="4px">
			<Link href={fileUrl} download={true} fontSize="sm" color="gray.300">
				{label}
			</Link>
			<StyledButton onClick={onClickRemoveButton}>
				<CloseIcon color="white" width="10px" h=" 10px" />
			</StyledButton>
		</Flex>
	);
};

const StyledButton = styled.div`
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: black;
	z-index: 10;
	padding: 0px 7px;
	cursor: pointer;
`;

export default FileDownloadLink;
