import { firestore } from '../../configs/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

/**
 * 이 파일은 순서와 타임스탬프를 결합하여 Document의 순서를 변경하는 로직을 담고 있습니다.
 * 사용자가 항목의 순서를 변경할 때마다 지정된 순서와 서버의 타임스탬프가 해당 항목에 할당됩니다.
 * 순서가 중복될 경우 타임스탬프를 기반으로 최신 항목이 앞에 위치하게 됩니다.
 */
const useChangeOrder = ({ collectionName, currentDocumentId }) => {
	const changeOrder = async (newOrder) => {
		try {
			const currentDocRef = doc(firestore, collectionName, currentDocumentId);

			// 사용자가 지정한 순서와 현재 타임스탬프로 항목을 업데이트합니다.
			await updateDoc(currentDocRef, {
				order: newOrder,
				orderTimestamp: serverTimestamp(), // 순서가 중복된 경우 해당 타임스탬프가 더 최신인것이 앞으로 나오게끔 조회하면 됩니다.
			});

			return true;
		} catch (error: any) {
			console.error('Error changing order:', error);
			alert(`순서 변경 중 오류가 발생했습니다. ${error?.message}`);
			return false;
		}
	};

	return { changeOrder };
};

export default useChangeOrder;
