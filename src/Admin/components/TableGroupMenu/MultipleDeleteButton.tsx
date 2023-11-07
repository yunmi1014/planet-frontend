import React, { useCallback, useState } from 'react';
import Button from '../Button/Button';
import FirebaseUtil from '../../utils/FirebaseUtil';

interface Props {
	ids: string[];
	disabled?: boolean;
	collectionName: string;
	refetch?;
}

export const MultipleDeleteButton = ({ ids, disabled, collectionName, refetch }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleDelete = useCallback(async () => {
		const answer = confirm(`정말로 ${ids?.length}개를 삭제하시겠습니까?`);
		if (!answer) return;
		setIsLoading(true);
		const promises = ids.map((x) => {
			return FirebaseUtil.deleteDocument(collectionName, x);
		});
		await Promise.all(promises);
		setIsLoading(false);
		refetch();
	}, [collectionName, ids, refetch]);

	return (
		<Button height={42} colorScheme={'blue'} isLoading={isLoading} onClick={handleDelete} disabled={disabled}>
			{ids?.length || 0}개 삭제하기
		</Button>
	);
};
