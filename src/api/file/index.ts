import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 as uuidV4 } from 'uuid';
import { firestorage } from '../../configs/firebase';
import { StorageDeleteParams, StorageUploadParams } from './image.types';

const validateFileSize = (file: File) => {
	const limitSize = 10 * 1000 * 1000; // 10MB
	const fileSize = file?.size;
	if (fileSize > limitSize) {
		alert('파일용량은 10mb를 넘을 수 없습니다.');
		return false;
	}
	return true;
};

export const uploadFileApi = async ({ path, file }: StorageUploadParams) => {
	if (!validateFileSize(file)) return null;

	const fileName = file?.name;
	const ext = fileName?.split('.').pop();
	const storagePath = `/${path}/${uuidV4()}.${ext}`;
	const storageRef = ref(firestorage, storagePath);

	const result = await uploadBytes(storageRef, file);
	const url = await getDownloadURL(result.ref);

	return { url, storagePath };
};

export const deleteFileApi = async ({ path }: StorageDeleteParams) => {
	const storageRef = ref(firestorage, path);
	await deleteObject(storageRef);
};
