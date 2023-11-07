import 'ag-grid-community';
import { ColumnApi, GridApi, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { compact, isEmpty } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { selectOptionsState, selectedItemListState } from '../../states/rootState';
import { getLocaleText } from './locale/locale';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const MyGrid = ({ rowData, columnDefs }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const [gridApi, setGridApi] = useState<GridApi>();
	const [gridColumnApi, setGridColumnApi] = useState<ColumnApi>();
	const [selectedItems, setSelectedItems] = useRecoilState(selectedItemListState);

	const onGridReady: GridOptions['onGridReady'] = (params) => {
		setGridApi(params.api);
		setGridColumnApi(params.columnApi);
	};

	const onCellClicked = (cell) => {
		const id = cell.data.userId;
		id && router.push(`${router.pathname}/${id}`);
	};

	const onSelectionChanged = () => {
		const selectedNodes = gridApi?.getSelectedNodes();
		const selectedData = selectedNodes?.map((node) => node.data);
		setSelectedItems(selectedData as any);
	};

	useEffect(() => {
		gridApi?.redrawRows();
		setIsLoading(false);
	}, [gridApi, rowData]);

	return (
		<Box id="myGrid" className="ag-theme-alpine" w="full" p="4" pt="0" flex="1">
			{!isLoading && (
				<AgGridReact
					defaultColDef={{
						flex: 1,
						minWidth: 100,
						filter: true,
						sortable: true,
						resizable: true,
					}}
					rowSelection="multiple"
					columnDefs={columnDefs}
					onGridReady={onGridReady}
					onSelectionChanged={onSelectionChanged}
					rowData={rowData}
					onCellClicked={onCellClicked}
					getLocaleText={getLocaleText}
				/>
			)}
		</Box>
	);
};

export default MyGrid;
