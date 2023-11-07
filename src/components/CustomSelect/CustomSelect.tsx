import { SelectOption } from '@/types/SelectOption';
import React from 'react';
import Select, { SingleValue } from 'react-select';
import DropdownIndicator from './DropdownIndicator';

interface CustomSelectProps<TOption> {
	placeholder?: string;
	options: TOption[];
	value: SingleValue<TOption> | undefined;
	onChange: (option: SingleValue<TOption>) => void;
	noOptionsMessage: string;
}

const CustomSelect = <TOption extends SelectOption>({ placeholder, options, value, onChange, noOptionsMessage }: CustomSelectProps<TOption>) => {
	return <Select options={options} placeholder={placeholder} onChange={onChange} value={value} isSearchable={false} components={{ DropdownIndicator }} unstyled={true} className="react-select-container" classNamePrefix="react-select" noOptionsMessage={() => <div>{noOptionsMessage}</div>} />;
};

export default CustomSelect;
