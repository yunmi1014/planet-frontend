import { useCallback, useState } from 'react';
import FirebaseUtil from '../utils/FirebaseUtil';

interface Props {
	id: string | number;
	collectionName: string;
}

const useModify = ({ collectionName }: Props) => {
	const handleModify = useCallback(
		async (data) => {
			try {
				await FirebaseUtil.modifyDocument({ collectionName: collectionName, data: data });
				alert('수정이 완료되었습니다.');
			} catch (e: any) {
				alert(`수정 중 에러가 발생했습니다. ${e?.message}`);
				console.error(e);
			}
		},
		[collectionName],
	);

	return { handleModify };
};

export default useModify;
