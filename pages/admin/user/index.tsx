import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import MyGrid from '../../../src/Admin/components/DataTable/MyGrid';
import useUserColumnDefinition from '../../../src/Admin/features/user/useUserColumnDefinition';
import TableGroupMenu from '../../../src/Admin/components/TableGroupMenu/TableGroupMenu';
import { UserExcelPropertyNames, UserModel, UserCollectionName } from '../../../src/models/UserModel';
import AdminLayout from '../../../src/Admin/components/AdminLayout';
import useUserList from '../../../src/Admin/features/user/useUserList';

const List = () => {
	const { data, refetch } = useUserList();
	const { columnDefs: UserColumnDefs } = useUserColumnDefinition();

	const excelHeaders = UserExcelPropertyNames.map((x) => ({
		key: x,
		label: UserModel.translate(x),
	}));

	return (
		<AdminLayout>
			<Flex direction={'column'} w="100%" h="full">
				<TableGroupMenu collectionName={UserCollectionName} refetch={refetch} excelHeaders={excelHeaders} data={data!} />
				<MyGrid rowData={data} columnDefs={UserColumnDefs} />
			</Flex>
		</AdminLayout>
	);
};

export default List;
