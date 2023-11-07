import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import MyGrid from '../../../src/Admin/components/DataTable/MyGrid';
import useRumorColumnDefinition from '../../../src/Admin/features/rumor/useRumorColumnDefinition';
import TableGroupMenu from '../../../src/Admin/components/TableGroupMenu/TableGroupMenu';
import { RumorExcelPropertyNames, RumorModel, RumorCollectionName } from '../../../src/models/RumorModel';
import AdminLayout from '../../../src/Admin/components/AdminLayout';
import useRumorList from '../../../src/Admin/features/rumor/useRumorList';

const List = () => {
	const { data, refetch } = useRumorList();
	const { columnDefs } = useRumorColumnDefinition();

	const excelHeaders = RumorExcelPropertyNames.map((x) => ({
		key: x,
		label: RumorModel.translate(x),
	}));

	return (
		<AdminLayout>
			<Flex direction={'column'} w="100%" h="full">
				<TableGroupMenu collectionName={RumorCollectionName} refetch={refetch} excelHeaders={excelHeaders} data={data!} />
				<MyGrid rowData={data} columnDefs={columnDefs} />
			</Flex>
		</AdminLayout>
	);
};

export default List;
