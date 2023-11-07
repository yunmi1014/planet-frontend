import { css, Global } from '@emotion/react';
import React from 'react';

const TableGlobalStyle = () => {
	return (
		<Global
			styles={css`
				.ag-react-container: {
					width: 100%;
					background: black;
				}
				.ag-row {
					div[col-id='0'] {
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
				.ag-cell {
					input {
						height: 100%;
					}
				}
			`}
		/>
	);
};

export default TableGlobalStyle;
