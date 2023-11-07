import { HStack } from '@chakra-ui/react';
import React from 'react';
import { MultipleDeleteButton } from './MultipleDeleteButton';
import { useRecoilValue } from 'recoil';
import { isMultipleSelectState, selectedItemIdListState, selectedItemListState } from '../../states/rootState';
import ExtractExcelButton from './ExtractExcelButton';
import CreateButton from './CreateButton';
import { DocumentData } from 'firebase/firestore';

interface Props {
	collectionName: string;
	refetch?: any;
	excelHeaders: { key: string; label: string }[];
	data: DocumentData[];
	hasCreateButton?: boolean;
}

const TableGroupMenu = ({ collectionName, refetch, excelHeaders, data, hasCreateButton }: Props) => {
	const isMultipleSelect = useRecoilValue(isMultipleSelectState);
	const selectedItemIdList = useRecoilValue(selectedItemIdListState);
	const selectedItemList = useRecoilValue(selectedItemListState);

	return (
		<HStack justifyContent={'flex-end'} p="2">
			{hasCreateButton && <CreateButton />}
			<ExtractExcelButton ids={selectedItemIdList} disabled={!isMultipleSelect} headers={excelHeaders} data={selectedItemList || []} collectionName={collectionName} />
			<MultipleDeleteButton ids={selectedItemIdList} disabled={!isMultipleSelect} collectionName={collectionName} refetch={refetch} />
		</HStack>
	);
};

export default TableGroupMenu;
