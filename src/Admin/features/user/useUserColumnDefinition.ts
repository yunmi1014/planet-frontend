import { GridOptions, ColDef } from 'ag-grid-community';
import { useState } from 'react';
import RowMenuCellRenderer from '../../components/DataTable/cellRenderer/RowMenuCellRenderer';
import { UserVisiblePropertyNames, UserModel, UserCollectionName } from '../../../models/UserModel';
import { DateUtil } from '../../utils/DateUtil';

// 테이블 칼럼 정의할때 테이블에 옵션을 넘기는데 이곳에서 한번에 옵션을 정의할 수 있게 정리
const useUserColumnDefinition = () => {
	const [columnDefs, setColumnDefs] = useState<GridOptions['columnDefs']>(
		UserVisiblePropertyNames.map((name) => {
			const defaultConfig: ColDef = {
				field: name,
				headerName: UserModel.translate(name),
			};

			if (name === 'id')
				return {
					...defaultConfig,
					flex: 0.8,
					headerCheckboxSelection: true,
					headerCheckboxSelectionFilteredOnly: true,
					checkboxSelection: true,
				};
			if (name === 'email') return { ...defaultConfig, flex: 1.5 };
			if (name === 'createdAt')
				return {
					...defaultConfig,
					sortable: true,
					sort: 'desc' as any,
					valueFormatter: ({ value }) => {
						return DateUtil.formatTimestampOrDateString(value);
					},
				};
			return defaultConfig;
		}).concat([{ field: '메뉴', cellRenderer: RowMenuCellRenderer, cellRendererParams: { collectionName: UserCollectionName } }]),
	);

	return { columnDefs, setColumnDefs };
};

export default useUserColumnDefinition;
