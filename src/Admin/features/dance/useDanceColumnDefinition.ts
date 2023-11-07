import { useState } from 'react';
import { GridOptions, ColDef } from 'ag-grid-community';
import { DanceVisiblePropertyNames, DanceModel, DanceCollectionName } from '../../../models/DanceModel';
import RowMenuCellRenderer from '../../components/DataTable/cellRenderer/RowMenuCellRenderer';
import dayjs from 'dayjs';
import { DateUtil } from '../../utils/DateUtil';

// 테이블 칼럼 정의할때 테이블에 옵션을 넘기는데 이곳에서 한번에 옵션을 정의할 수 있게 정리
const useDanceColumnDefinition = () => {
	const [columnDefs, setColumnDefs] = useState<GridOptions['columnDefs']>(
		DanceVisiblePropertyNames.map((name) => {
			const defaultConfig: ColDef = {
				field: name,
				headerName: DanceModel.translate(name),
			};

			if (name === 'id')
				return {
					...defaultConfig,
					headerCheckboxSelection: true,
					headerCheckboxSelectionFilteredOnly: true,
					checkboxSelection: true,
				};

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
		}).concat([{ field: '', flex: 0.5, cellRenderer: RowMenuCellRenderer, cellRendererParams: { collectionName: DanceCollectionName } }]),
	);

	return { columnDefs, setColumnDefs };
};

export default useDanceColumnDefinition;
