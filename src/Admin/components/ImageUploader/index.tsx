import { Button, Flex, HStack, Input } from '@chakra-ui/react';
import { FieldValues, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CloseIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import { useStorage } from '../../hooks/useStorage';

interface Props {
	uploadPath: string;
	name: string;
	watch: UseFormWatch<FieldValues>;
	setValue: UseFormSetValue<FieldValues>;
}

const ImageUploader = (props: Props) => {
	const imageUrls = props.watch(props.name) || [];
	const { handleFileOnChange } = useStorage({
		path: props.uploadPath,
		onAfterFileUpload: ({ files, urls, storagePaths }) => props.setValue(props.name, imageUrls.concat(urls)),
	});

	const handleRemoveUrl = (targetUrl: string) => {
		const updateUrls = imageUrls.filter((url) => url !== targetUrl);
		props.setValue(props.name, updateUrls);
	};

	return (
		<Flex direction="column" width="100%">
			<Input type="file" onChange={handleFileOnChange} accept="image/*" multiple width="fit-content" variant={'filled'} size="lg" />
			<HStack flex={1} overflowX="auto">
				{imageUrls?.map((url, index) => (
					<div key={index} style={{ margin: '10px 0', position: 'relative' }}>
						<ImageWrapper>
							<StyledButton onClick={() => handleRemoveUrl(url)}>
								<CloseIcon color="white" />
							</StyledButton>
							<Image src={url} alt="" />
						</ImageWrapper>
					</div>
				))}
			</HStack>
		</Flex>
	);
};

export default ImageUploader;

const StyledButton = styled(Button)`
	right: -10px;
	top: -10px;
	width: 40px;
	height: 40px;
	border-radius: 40px;
	background: black;
	position: absolute;
	z-index: 10;
`;

const ImageWrapper = styled.div`
	width: 300px;
	height: 200px;
	flex-shrink: 0;
`;

const Image = styled.img`
	object-fit: contain;
	width: 100%;
	height: 100%;
	flex: 0 0 0;
`;
