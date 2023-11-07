import { useCallback, useState } from 'react';
import FirebaseUtil from '../utils/FirebaseUtil';

const useDelete = () => {
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelete = useCallback(async ({ id, collectionName }) => {
		try {
			const isDelete = confirm('삭제하시겠습니까?');
			if (isDelete) {
				setIsDeleting(true);
				await FirebaseUtil.deleteDocument(collectionName, id);
				setIsDeleting(false);
				alert('삭제가 완료되었습니다.');
			}
		} catch (e: any) {
			console.error(e);
			alert('삭제 실패');
		}
	}, []);

	return { handleDelete, isDeleting, setIsDeleting };
};

export default useDelete;
