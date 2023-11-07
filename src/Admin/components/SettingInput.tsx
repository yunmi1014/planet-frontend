import styled from '@emotion/styled';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface Props {
	type?: string;
	name?: string;
	padding?: string;
	textAlign?: 'left' | 'center' | 'right';
	fontSize?: string;
	placeholder?: string;
	register?: UseFormRegister<FieldValues>;
	registerOptions?: RegisterOptions<FieldValues>;
	defaultValue?: string | number;
	isDisabled?: boolean;
	value?: string | number;
	readOnly?: boolean;
	step?: string;
	formNoValidate?: boolean;
	onInput?: (e: any) => void;
}

const SettingInput = (props: Props) => {
	const registerProps = props.register ? props.register(props.name ?? '', props.registerOptions) : {};

	return <StyledInput className="styledInput" disabled={props.isDisabled} defaultValue={props.defaultValue} value={props.value} type={props.type} padding={props.padding} textAlign={props.textAlign} fontSize={props.fontSize} placeholder={props.placeholder} {...registerProps} readOnly={props.readOnly} onInput={props.onInput} step={props?.step} formNoValidate={props?.formNoValidate} />;
};

export default SettingInput;

const StyledInput = styled.input<any>`
	flex: 1;
	width: 100%;
	height: 100%;
	padding: ${({ padding }) => (padding ? padding : '12px 16px')};
	border-radius: 10px;
	border: 1px solid #e4e6f0;
	background: #fff;
	text-align: ${({ textAlign }) => textAlign};
	font-size: ${({ fontSize }) => (fontSize ? fontSize : '14px')};
	font-family: 'Pretendard Bold';
	line-height: 16px;
	letter-spacing: -0.28px;
	&::placeholder {
		color: #9395a6;
	}
	&:focus {
		outline: none;
	}
`;
