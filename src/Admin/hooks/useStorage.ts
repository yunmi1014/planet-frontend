// lodash에서 두 가지 유틸리티 함수를 임포트합니다.
// compact는 배열에서 falsy 값들을 제거하고
// isEmpty는 주어진 값이 비어있는지를 확인합니다.
import { compact, isEmpty } from 'lodash';

// React의 상태 관리 Hook을 임포트합니다.
import { useState } from 'react';

// 파일 업로드를 위한 API 함수를 임포트합니다.
import { uploadFileApi } from '../../api/file';

// `useStorage` hook의 프롭 타입을 정의합니다.
export interface UseStorageProps {
	path: string; // 파일을 저장할 경로
	// 파일 업로드 후에 실행될 선택적 콜백 함수
	onAfterFileUpload?: ({ files, urls, storagePaths }: { files: File[]; urls: string[]; storagePaths: string[] }) => any;
}

// `useStorage`라는 custom hook을 정의합니다.
export const useStorage = ({ path, onAfterFileUpload }: UseStorageProps) => {
	// 파일의 다운로드 URL을 관리하는 상태
	const [downloadUrls, setDownloadUrls] = useState<string[]>([]);

	// 스토리지에서의 파일 경로를 관리하는 상태
	const [storageFilePaths, setStorageFilePaths] = useState<string[]>([]);

	// 파일 변경 이벤트 핸들러
	const handleFileOnChange = async (event: any) => {
		event.preventDefault(); // 기본 이벤트 액션을 중단

		// 선택된 파일들을 File 객체 배열로 변환
		const files = Array.from(event.target.files) as File[];

		// 각 파일을 업로드하고, 그 결과를 Promise로 묶어 배열로 관리
		const uploadPromises = files.map((file: File) => uploadFileApi({ path, file }));
		const uploadResults = await Promise.all(uploadPromises); // 모든 파일 업로드가 완료될 때까지 대기

		// 업로드 결과가 비어있으면 함수 종료
		if (isEmpty(uploadResults)) return;

		// 업로드된 파일의 다운로드 URL과 스토리지 경로를 추출
		const downloadUrls = compact(uploadResults.map((x) => x?.url));
		const storageFilePaths = compact(uploadResults.map((x) => x?.storagePath));

		// 상태 업데이트
		setDownloadUrls(downloadUrls);
		setStorageFilePaths(storageFilePaths);

		// 파일 업로드 후의 콜백이 제공되면 실행
		onAfterFileUpload && onAfterFileUpload({ files: files, urls: downloadUrls, storagePaths: storageFilePaths });
	};

	// hook에서 반환되는 값들
	return { handleFileOnChange, storageFilePaths, downloadUrls };
};
