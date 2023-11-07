import { useState } from 'react';
import { GridOptions, ColDef } from 'ag-grid-community';
import { InquiryVisiblePropertyNames, InquiryModel, InquiryCollectionName } from '../../../models/InquiryModel';
import RowMenuCellRenderer from '../../components/DataTable/cellRenderer/RowMenuCellRenderer';
import { DateUtil } from '../../utils/DateUtil';

// 테이블 칼럼 정의할때 테이블에 옵션을 넘기는데 이곳에서 한번에 옵션을 정의할 수 있게 정리
const useInquiryColumnDefinition = () => {
	const [columnDefs, setColumnDefs] = useState<GridOptions['columnDefs']>(
		InquiryVisiblePropertyNames.map((name) => {
			const defaultConfig: ColDef = {
				field: name,
				headerName: InquiryModel.translate(name),
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
		}).concat([{ field: '', flex: 0.5, cellRenderer: RowMenuCellRenderer, cellRendererParams: { collectionName: InquiryCollectionName } }]),
	);

	return { columnDefs, setColumnDefs };
};

export default useInquiryColumnDefinition;
