import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../src/Admin/components/AdminLayout';
import FormModify from '../../../src/Admin/components/FormModify';
import { RumorCollectionName } from '../../../src/models/RumorModel';
import useModify from '../../../src/Admin/hooks/useModify';
import { FormInputType } from '../../../src/Admin/components/FormInputRenderer';
import { SelectOption } from '../../../src/types/SelectOption';
import useRumorDetail from '../../../src/Admin/features/rumor/useRumorDetail';

export type RumorDataType = {
	key: any;
	type: FormInputType;
	height: string;
	flex: number;
	selectOptions?: SelectOption[];
};

const Modify = () => {
	const router = useRouter();
	const id = router.query.id as string;
	const { handleModify } = useModify({ id: id, collectionName: RumorCollectionName });
	const { data } = useRumorDetail();

	// 여기에 정의한대로 수정페이지의 레이아웃이 구성됩니다.
	// 이중배열 타입인 이유는 가로,세로 테이블형태를 나타내기 위함입니다.
	const layoutData: RumorDataType[][] = [
		[
			{ key: 'id', type: 'box', height: '40px', flex: 1 },
			{ key: 'name', type: 'text', height: '40px', flex: 1 },
		],
		[
			{ key: 'phone', type: 'text', height: '40px', flex: 1 },
			{ key: 'url', type: 'text', height: '40px', flex: 1 },
		],
	];

	return (
		<AdminLayout>
			<FormModify data={data} layoutData={layoutData} collectionName={RumorCollectionName} onSubmit={handleModify} />
		</AdminLayout>
	);
};

export default Modify;
