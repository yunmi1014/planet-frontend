import { Box, Flex } from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import MyGrid from '../../../src/Admin/components/DataTable/MyGrid';
import useInquiryColumnDefinition from '../../../src/Admin/features/inquiry/useInquiryColumnDefinition';
import TableGroupMenu from '../../../src/Admin/components/TableGroupMenu/TableGroupMenu';
import { InquiryExcelPropertyNames, InquiryModel, InquiryCollectionName } from '../../../src/models/InquiryModel';
import AdminLayout from '../../../src/Admin/components/AdminLayout';
import useInquiryList from '../../../src/Admin/features/inquiry/useInquiryList';

const List = () => {
	const { data, refetch } = useInquiryList();
	const { columnDefs } = useInquiryColumnDefinition();

	const excelHeaders = InquiryExcelPropertyNames.map((x) => ({
		key: x,
		label: InquiryModel.translate(x),
	}));

	return (
		<AdminLayout>
			<Flex direction={'column'} w="100%" h="full">
				<TableGroupMenu collectionName={InquiryCollectionName} refetch={refetch} excelHeaders={excelHeaders} data={data!} />
				<MyGrid rowData={data} columnDefs={columnDefs} />
			</Flex>
		</AdminLayout>
	);
};

export default List;
