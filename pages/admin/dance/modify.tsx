import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../src/Admin/components/AdminLayout';
import FormModify from '../../../src/Admin/components/FormModify';
import { DanceCollectionName } from '../../../src/models/DanceModel';
import useModify from '../../../src/Admin/hooks/useModify';
import { FormInputType } from '../../../src/Admin/components/FormInputRenderer';
import { SelectOption } from '../../../src/types/SelectOption';
import useDanceDetail from '../../../src/Admin/features/dance/useDanceDetail';

export type DanceDataType = {
	key: any;
	type: FormInputType;
	height: string;
	flex: number;
	selectOptions?: SelectOption[];
};

const Modify = () => {
	const router = useRouter();
	const id = router.query.id as string;
	const { handleModify } = useModify({ id: id, collectionName: DanceCollectionName });
	const { data } = useDanceDetail();

	// 여기에 정의한대로 수정페이지의 레이아웃이 구성됩니다.
	// 이중배열 타입인 이유는 가로,세로 테이블형태를 나타내기 위함입니다.
	const layoutData: DanceDataType[][] = [
		[
			{ key: 'id', type: 'box', height: '40px', flex: 1 },
			{ key: 'name', type: 'text', height: '40px', flex: 1 },
			{ key: 'phone', type: 'text', height: '40px', flex: 1 },
		],
		[
			{ key: 'url', type: 'text', height: '40px', flex: 1 },
			{ key: 'address', type: 'text', height: '40px', flex: 1 },
			{ key: 'detailAddress', type: 'text', height: '40px', flex: 1 },
		],
	];

	return (
		<AdminLayout>
			<FormModify data={data} layoutData={layoutData} collectionName={DanceCollectionName} onSubmit={handleModify} />
		</AdminLayout>
	);
};

export default Modify;
