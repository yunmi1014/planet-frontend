import React, { useCallback, useState } from 'react';
import ExcelDownloadButton, { ExcelDownloadButtonProps } from '../Excel/ExcelDownloadButton';
import Button from '../Button/Button';

interface Props {
	ids: (string | number)[];
	disabled?: boolean;
	headers: ExcelDownloadButtonProps['headers'];
	data: ExcelDownloadButtonProps['data'];
	collectionName: string;
}

const ExtractExcelButton = ({ ids, disabled, headers, data, collectionName }: Props) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleClick = useCallback(async () => {
		setIsLoading(true);
		setIsLoading(false);
	}, []);

	return (
		<Button height={42} colorScheme={'blue'} isLoading={isLoading} onClick={handleClick} disabled={disabled}>
			<ExcelDownloadButton headers={headers!} data={data} filename={`${collectionName} List`}>
				{ids?.length || 0}개 엑셀 추출
			</ExcelDownloadButton>
		</Button>
	);
};

ExtractExcelButton.defaultProps = {
	headers: [
		{ label: '성', key: 'lastname' },
		{ label: '이름', key: 'firstname' },
		{ label: '이메일', key: 'email' },
	],
	data: [{ firstname: 'Ahmed', lastname: 'Tomi', email: 'ah@smthing.co.com' }],
};

export default ExtractExcelButton;
