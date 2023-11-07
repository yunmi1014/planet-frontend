import React, { useCallback, useEffect } from 'react';

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/i18n/ko-kr';

// Toast UI Editor
import '@toast-ui/editor/dist/toastui-editor.css';
import useUploadImage from '../../hooks/useUploadImage';
import editorStorage from './editorStorage';

interface ToastEditorProps {
	editorRef: React.RefObject<Editor>;
	uploadFilePath: string;
	initialValue?: string;
}

const ToastEditor = ({ editorRef, initialValue, uploadFilePath }: ToastEditorProps) => {
	const { toorbarItems, inputFileRef, onUploadImage } = useUploadImage({ uploadFilePath, editorRef });

	// 관리자 페이지에서 사용할 필요 없습니다.
	// 로컬 스토리지에 저장된 내용을 불러오는 로직입니다.
	useEffect(() => {
		if (!editorRef?.current) return;
		//props로 넘겨받은 초기값이 없을 경우에 storage에 저장된 내용을 불러온다.
		if (!initialValue) {
			const editorContent = editorStorage.get();
			editorRef.current.getInstance().setMarkdown(editorContent?.content ?? '');
		}
	}, [editorRef, initialValue]);

	return (
		<>
			<Editor
				ref={editorRef}
				placeholder="내용을 입력해주세요."
				initialValue={initialValue}
				height="600px" // 높이는 임시용입니다. 디자인이 확정되면 변경될 예정입니다.
				initialEditType="wysiwyg"
				useCommandShortcut
				hideModeSwitch
				toolbarItems={toorbarItems}
				language="ko-KR"
			/>
			<input type="file" multiple accept="image/*" hidden onChange={onUploadImage} ref={inputFileRef} />
		</>
	);
};

export default ToastEditor;
