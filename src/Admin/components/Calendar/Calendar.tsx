import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';
import CalendarIcon from '../../../../public/images/icons/date_range.svg';
import { DateUtil } from '../../utils/DateUtil';

interface Props {
	date: string;
	name: string;
	register: UseFormRegister<FieldValues>;
	registerOptions?: RegisterOptions<FieldValues>;
	icon?: ReactNode;
	disabled?: boolean;
	readonly?: boolean;
}

const Calendar = (props: Props) => {
	return (
		<Wrapper className="calendar-container">
			<DateBox className="calendar-date">{DateUtil.formatTimestampOrDateString(props.date)}</DateBox>
			<CalendarIcon color="#b7b9c9" width="25px" height="25px" />
			<CalendarInput disabled={props.disabled} className="calendar-input" id={props.name} type="datetime-local" {...props.register(props.name, props.registerOptions)} readOnly={props.readonly} />
		</Wrapper>
	);
};

export default Calendar;

const Wrapper = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	gap: 0 12px;
	align-items: center;
	position: relative;
	border-radius: 16px;
	border: 1px solid #e4e6f0;
	background: #fff;
	padding: 0 15px;
`;

const DateBox = styled.span`
	flex: 1;
	color: #353644;
	font-family: Pretendard Bold;
	font-size: 18px;
	letter-spacing: -0.24px;
	text-align: right;
`;

const CalendarInput = styled.input`
	&::-webkit-calendar-picker-indicator,
	&::-webkit-datetime-edit {
		width: 100%;
		opacity: 0;
	}
	&::-webkit-inner-spin-button {
		width: 100%;
		// opacity: 0;
		appearance: none;
	}
	width: 100%;
	height: 100%;
	left: 0;
	appearance: none;
	outline: none;
	background: transparent;
	position: absolute;
`;
