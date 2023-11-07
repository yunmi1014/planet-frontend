import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import MyGrid from '../../../src/Admin/components/DataTable/MyGrid';
import useDanceColumnDefinition from '../../../src/Admin/features/dance/useDanceColumnDefinition';
import TableGroupMenu from '../../../src/Admin/components/TableGroupMenu/TableGroupMenu';
import { DanceExcelPropertyNames, DanceModel, DanceCollectionName } from '../../../src/models/DanceModel';
import AdminLayout from '../../../src/Admin/components/AdminLayout';
import useDanceList from '../../../src/Admin/features/dance/useDanceList';

const List = () => {
	const { data, refetch } = useDanceList();
	const { columnDefs } = useDanceColumnDefinition();

	const excelHeaders = DanceExcelPropertyNames.map((x) => ({
		key: x,
		label: DanceModel.translate(x),
	}));

	return (
		<AdminLayout>
			<Flex direction={'column'} w="100%" h="full">
				<TableGroupMenu collectionName={DanceCollectionName} refetch={refetch} excelHeaders={excelHeaders} data={data!} />
				<MyGrid rowData={data} columnDefs={columnDefs} />
			</Flex>
		</AdminLayout>
	);
};

export default List;
