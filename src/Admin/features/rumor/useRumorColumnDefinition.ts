import { useState } from 'react';
import { GridOptions, ColDef } from 'ag-grid-community';
import { RumorVisiblePropertyNames, RumorModel, RumorCollectionName } from '../../../models/RumorModel';
import RowMenuCellRenderer from '../../components/DataTable/cellRenderer/RowMenuCellRenderer';
import { DateUtil } from '../../utils/DateUtil';

// 테이블 칼럼 정의할때 테이블에 옵션을 넘기는데 이곳에서 한번에 옵션을 정의할 수 있게 정리
const useRumorColumnDefinition = () => {
	const [columnDefs, setColumnDefs] = useState<GridOptions['columnDefs']>(
		RumorVisiblePropertyNames.map((name) => {
			const defaultConfig: ColDef = {
				field: name,
				headerName: RumorModel.translate(name),
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
		}).concat([{ field: '', flex: 0.5, cellRenderer: RowMenuCellRenderer, cellRendererParams: { collectionName: RumorCollectionName } }]),
	);

	return { columnDefs, setColumnDefs };
};

export default useRumorColumnDefinition;
