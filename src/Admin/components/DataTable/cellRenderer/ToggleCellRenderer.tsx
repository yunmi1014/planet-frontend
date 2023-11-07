import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

interface Props extends ICellRendererParams {}

const ToggleCellRenderer = (props: Props) => {
	const isShow = props.data.isShow;

	return <div>{isShow ? 'O' : 'X'}</div>;
};

export default ToggleCellRenderer;
