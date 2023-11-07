import { ToolbarItemOptions } from '@toast-ui/editor/types/ui';
import { Editor } from '@toast-ui/react-editor';
import { isEmpty } from 'lodash';
import { useMemo, useCallback, useRef, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { uploadFileApi } from '../api/file';
import { uploadedImagesState } from '../atoms/uploadImages';

interface UseUploadImageParams {
	editorRef: React.RefObject<Editor | null>;
	uploadFilePath: string;
}

// 토스트 에디터의 기본 이미지 업로드 기능은 여러 이미지를 업로드하는 것이 불가능합니다.
// 따라서 툴바의 이미지 업로드 기능을 커스터 마이징하여 변경하였습니다.
const useUploadImage = ({ editorRef, uploadFilePath }: UseUploadImageParams) => {
	const inputFileRef = useRef<HTMLInputElement>(null);
	const setUploadImages = useSetRecoilState(uploadedImagesState);

	useEffect(() => {
		const clickHandler = () => {
			if (!inputFileRef.current) return;

			inputFileRef.current.click();
		};

		const imageButton = window.document.querySelector(`.image.toastui-editor-toolbar-icons`);
		if (!imageButton) return;

		imageButton.addEventListener('click', clickHandler);

		return () => {
			imageButton.removeEventListener('click', clickHandler);
		};
	}, []);

	// 이미지를 업로드하는 로직입니다. 변경이 필요할 경우 수정하여 사용하시면 됩니다.
	const onUploadImage = useCallback(
		async (e: React.ChangeEvent<HTMLInputElement>) => {
			if (!editorRef.current) return;

			const { files } = e.target;
			if (!files) return;

			const imageUrls: string[] = [];
			for (const file of [...files]) {
				const result = await uploadFileApi({ path: uploadFilePath, file });
				if (isEmpty(result)) return;

				imageUrls.push(result.url);
				setUploadImages((prev) => [...prev, result.url]);
			}

			const editor = editorRef.current.getInstance();

			for (const imageUrl of imageUrls) {
				editor.exec('addImage', { imageUrl });
			}
		},
		[editorRef, setUploadImages, uploadFilePath],
	);

	const createImageButton = useCallback(() => {
		const button = document.createElement('button');

		button.className = 'image toastui-editor-toolbar-icons';
		button.style.margin = '0';

		return button;
	}, []);

	const toorbarItems: (string | ToolbarItemOptions)[][] = useMemo(() => {
		return [
			['heading', 'bold', 'italic', 'strike'],
			['hr', 'quote'],
			['ul', 'ol', 'task', 'indent', 'outdent'],
			[
				'table',
				{
					name: 'image',
					tooltip: '이미지 삽입',
					el: createImageButton(),
				},
				'link',
			],
		];
	}, [createImageButton]);

	return { toorbarItems, inputFileRef, onUploadImage };
};

export default useUploadImage;
