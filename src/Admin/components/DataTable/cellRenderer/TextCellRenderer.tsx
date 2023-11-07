import { Input } from '@chakra-ui/input';
import { Box, Tooltip } from '@chakra-ui/react';
import { ICellRendererParams } from 'ag-grid-community';
import dayjs, { isDayjs } from 'dayjs';
import { debounce, isDate, isNaN } from 'lodash';
import React, { useCallback, useState } from 'react';

interface Props extends ICellRendererParams {}

const TextCellRenderer = (props: Props) => {
	const [value, setValue] = useState(isNaN(Date.parse(props.value)) ? props.value : dayjs(props.value).format('YYYY년 MM월 DD일 HH:mm:ss'));

	return (
		<Tooltip label={value} cursor="pointer">
			<Input px="0" w="full" value={value} variant="ghost" background="transparent" size="sm" noOfLines={1} readOnly />
		</Tooltip>
	);
};

export default TextCellRenderer;
