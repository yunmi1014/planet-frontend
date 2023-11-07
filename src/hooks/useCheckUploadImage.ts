import { useCallback } from 'react';
import { deleteFileApi } from '../api/file';

const useCheckUploadImage = () => {
	const getFilenameFromImageUrl = useCallback((imageUrl: string) => {
		return decodeURIComponent(imageUrl).split('?')[0].split('/').pop();
	}, []);

	const getImagesFromContent = useCallback((content: string) => {
		const regex = /!\[([^\]]*)\]\(([^)]+)\)/g; // ![altText](imageUrl)
		const images: string[] = [];

		let match: RegExpExecArray | null;
		while ((match = regex.exec(content)) !== null) {
			const imageUrl = match[2];
			images.push(imageUrl);
		}

		return images;
	}, []);

	const checkUploadImages = useCallback(
		async (markDownContent: string, uploadImages: string[]) => {
			const imagesFromContent = getImagesFromContent(markDownContent);

			for (const uploadImage of uploadImages) {
				const isExist = imagesFromContent.includes(uploadImage);
				if (!isExist) {
					const filename = getFilenameFromImageUrl(uploadImage) ?? '';
					await deleteFileApi({ path: `/review/${filename}` });
				}
			}
		},
		[getFilenameFromImageUrl, getImagesFromContent],
	);

	return { getImagesFromContent, checkUploadImages };
};

export default useCheckUploadImage;
