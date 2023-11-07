import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

interface Props extends ICellRendererParams {}

const OrderCellRenderer = (props: Props) => {
	const order = props.data.order;

	if (order === 0) return null;
	return <div>{order}</div>;
};

export default OrderCellRenderer;
