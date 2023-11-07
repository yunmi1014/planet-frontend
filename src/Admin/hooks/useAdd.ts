import { useCallback, useState } from 'react';
import { doc, serverTimestamp, query, setDoc } from 'firebase/firestore';
import { firestore } from '../../configs/firebase';
import { uid } from 'uid';
import { isNil, merge, omitBy } from 'lodash';

const useAdd = (collectionName: string, id = uid(25)) => {
	const handleAdd = useCallback(
		async (values: any) => {
			try {
				const docRef = doc(firestore, collectionName, id);
				const data = merge({ id, createdAt: serverTimestamp() }, values);
				await setDoc(docRef, omitBy(data, isNil));
				alert('저장 성공');
			} catch (e: any) {
				console.error(e);
				alert(`저장 실패: ${e?.message}`);
			}
		},
		[collectionName, id],
	);

	return { handleAdd };
};

export default useAdd;
