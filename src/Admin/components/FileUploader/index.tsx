import { Box, Flex, Button, Link, VStack, Input } from '@chakra-ui/react';
import React from 'react';
import { UseFormWatch, FieldValues, UseFormSetValue, UseFormReset } from 'react-hook-form';
import { useStorage } from '../../hooks/useStorage';
import { deleteFileApi } from '../../../api/file';
import FileDownloadLink from './FileDownloadLink';
import FirebaseUtil from '../../utils/FirebaseUtil';
import { first } from 'lodash';

interface Props {
	uploadPath: string;
	collectionName: string;
	name: string;
	watch: UseFormWatch<FieldValues>;
	setValue: UseFormSetValue<FieldValues>;
}

const FileUploader = (props: Props) => {
	const { handleFileOnChange } = useStorage({
		path: props.uploadPath,
		onAfterFileUpload: ({ files, urls, storagePaths }) => props.setValue(props.name, { downloadUrl: first(urls), storagePath: first(storagePaths) }),
	});
	const id = props.watch('id');
	const file = props.watch(props.name);

	const handleRemoveFile = async (name: string, path: string) => {
		if (!confirm('파일을 삭제하시겠습니까?')) return;

		try {
			await FirebaseUtil.deleteField(props.collectionName, id, name);
			await deleteFileApi({ path });
			props.setValue(name, { downloadURL: '', storagePath: '' });
			alert('파일 삭제가 완료되었습니다');
		} catch (err: any) {
			console.error(err);
			alert(`파일 삭제 중 에러가 발생했습니다. ${err.toString()}`);
		}
	};

	return (
		<VStack w="full" justifyContent={'flex-start'} alignItems="flex-start">
			<Input type="file" onChange={handleFileOnChange} />
			{file?.downloadUrl && <FileDownloadLink fileUrl={file.downloadUrl} label={file.storagePath} onClickRemoveButton={() => handleRemoveFile(props.name, file.storagePath)} />}
		</VStack>
	);
};

export default FileUploader;
