import React, { useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../src/Admin/components/AdminLayout';
import FormModify from '../../../src/Admin/components/FormModify';
import { InquiryCollectionName } from '../../../src/models/InquiryModel';
import useModify from '../../../src/Admin/hooks/useModify';
import { InquiryType } from '../../../src/types/FormInputType';
import { FormInputType } from '../../../src/Admin/components/FormInputRenderer';
import { SelectOption } from '../../../src/types/SelectOption';
import useInquiryDetail from '../../../src/Admin/features/inquiry/useInquiryDetail';

export type InquiryDataType = {
	key: keyof InquiryType;
	type: FormInputType;
	height: string;
	flex: number;
	selectOptions?: SelectOption[];
};

const Modify = () => {
	const router = useRouter();
	const id = router.query.id as string;
	const { handleModify } = useModify({ id: id, collectionName: InquiryCollectionName });
	const { inquiry } = useInquiryDetail();

	// 여기에 정의한대로 수정페이지의 레이아웃이 구성됩니다.
	// 이중배열 타입인 이유는 가로,세로 테이블형태를 나타내기 위함입니다.
	const layoutData: InquiryDataType[][] = [
		[
			{ key: 'id', type: 'box', height: '40px', flex: 1 },
			{ key: 'name', type: 'text', height: '40px', flex: 1 },
			{ key: 'phone', type: 'text', height: '40px', flex: 1 },
		],
		[
			{ key: 'sido', type: 'text', height: '40px', flex: 1 },
			{ key: 'gugun', type: 'text', height: '40px', flex: 1 },
			{ key: 'childrenAge', type: 'text', height: '40px', flex: 1 },
		],
	];

	return (
		<AdminLayout>
			<FormModify data={inquiry} layoutData={layoutData} collectionName={InquiryCollectionName} onSubmit={handleModify} />
		</AdminLayout>
	);
};

export default Modify;
