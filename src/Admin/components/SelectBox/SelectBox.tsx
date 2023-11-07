import React, { useEffect, useState } from 'react';
import Select, { PropsValue } from 'react-select';
import { Control, Controller, ControllerRenderProps } from 'react-hook-form';
import { SelectOption } from '../../../types/SelectOption';

interface Props {
	control: Control;
	name: string;
	options: SelectOption[];
	defaultValue?: SelectOption;
	required?: boolean;
	readonly?: boolean;
}

const SelectBox = (props: Props) => {
	const { control, name, options, defaultValue, required, readonly } = props;

	return (
		<div className="selectbox-container">
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				rules={{ required: required ? '필수 항목입니다.' : false }} // 검증 규칙 추가
				render={({ field }) => {
					const selectOption = field?.value;

					return (
						<Select
							{...field}
							options={options}
							isClearable
							isSearchable
							isDisabled={readonly}
							// form을 제출할때에는 옵션을 제출하는것이 아닌 옵션의 value를 제출해야한다.
							onChange={(option: SelectOption | null) => field.onChange(option?.value)}
							onBlur={field.onBlur}
							// 올바른 옵션 객체를 찾아서 전달, react-select에는 value값으로 옵션의 value가 아닌 옵션 자체를 넘겨야한다.
							value={options?.find((option) => option.value === selectOption?.value)}
						/>
					);
				}}
			/>
		</div>
	);
};

export default SelectBox;
