import React, { ReactNode } from 'react';
import { CSVLink } from 'react-csv';

/** 예시
  const headers = [
    { label: "First Name", key: "firstname" },
  ];
  const data = [
    { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  ];
 */
export interface ExcelDownloadButtonProps {
	headers: { label: string; key: string }[];
	data: { [key: string]: any }[];
	children?: ReactNode;
	filename?: string;
}

const ExcelDownloadButton = ({ headers, data, children, filename }: ExcelDownloadButtonProps) => {
	return (
		<CSVLink headers={headers} data={data} filename={filename}>
			{children}
		</CSVLink>
	);
};

ExcelDownloadButton.defaultProps = {
	children: '엑셀 추출하기',
	filename: 'data.csv',
};

export default ExcelDownloadButton;
