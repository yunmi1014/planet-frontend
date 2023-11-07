import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import 'moment/locale/ko';
import { DayPickerRangeController } from 'react-dates';
import { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { VStack } from '@chakra-ui/react';
import { FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import { compact, pickBy } from 'lodash';
import BackButtonIcon from '../../../../public/images/icons/arrow_back_ios.svg';
import NextButtonIcon from '../../../../public/images/icons/arrow_forward_ios.svg';
import CalendarIcon from '../../../../public/images/icons/date_range.svg';
import moment, { Moment } from 'moment';
import SettingInput from '../SettingInput';

interface Props {
	date: string;
	practiceStartDate: string;
	practiceEndDate: string;
	name: string;
	startDateTitle: string;
	endDateTitle: string;
	placeholder?: string;
	registerOptions?: RegisterOptions<FieldValues>;
	icon?: ReactNode;
}

const CalendarRangePicker = (props: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [focusedInput, setFocusedInput] = useState('startDate');
	const [startDate, setStartDate] = useState<Moment | null>(null);
	const [endDate, setEndDate] = useState<Moment | null>(null);
	const [dateRange, setDateRange] = useState<string | null>(null);

	const { setValue, register } = useFormContext();
	const registerOptions = pickBy(props.registerOptions, (value) => value !== null);
	const formattedStartDate = moment(startDate).format('YYYY.MM.DD') || null;
	const formattedEndDate = moment(endDate).format('YYYY.MM.DD') || null;

	// 날짜 변경 시 호출되는 함수
	// dates에는 시작일과 종료일을 갖는 객체가 전달된다.
	// 이미 시작일, 종료일 선택한 경우, 다른 날짜를 선택하면 리셋되면서 다시 시작일부터 값이 채워진다.
	const handleDatesChange = (dates) => {
		// 이미 시작일, 종료일 선택한 경우 다음 날짜를 선택하면 시작일이 변경되고 종료일은 null 값으로 초기화한다.
		if (startDate && endDate) {
			setStartDate(dates.startDate);
			setFocusedInput('endDate');
			setEndDate(null);
			// 그 외의 경우 시작일, 종료일에 대응하는 선택한 날짜로 값이 채워진다.
		} else {
			setStartDate(dates.startDate);
			setEndDate(dates.endDate);
		}
	};

	// 버튼 클릭 시 선택된 일정 표시
	const handleClickButton = (e) => {
		e.stopPropagation();
		if (!formattedStartDate || !formattedEndDate) {
			alert('일정을 선택해주세요');
			return;
		}
		setIsOpen(false);
		setValue(props.name, dateRange, { shouldDirty: true });
	};

	// 클릭한 날짜는 focusedInput에 의해 무엇인지 결정된다.
	// focusedInpu은 null, 'startDate', 'endDate'의 값을 갖는다.
	// 'startDate'이면 시작일로 설정되고 'endDate'이면 종료일로 설정된다. null인 경우 아무일도 일어나지 않는다.
	// 내부적으로 focusedInput이 startDate -> endDate -> null 로 변경되기 때문에 null(시작일, 종료일 선택)이 되는 경우 다음 시작일을 선택할 수 있도록 focusedInput를 startDate로 변경한다. 그 외의 경우 기존 방식대로 변경된다.
	const handleFocusChange = (focusedInput) => {
		if (focusedInput === null) {
			setFocusedInput('startDate');
			return;
		}
		setFocusedInput(focusedInput);
	};

	// 캘린더에서 선택한 시작일, 종료일이 동일한 경우 단일 날짜를, 다른 경우 복수 날짜를 할당
	useEffect(() => {
		const isSelected = formattedStartDate && formattedEndDate;
		if (isSelected && formattedStartDate !== formattedEndDate) {
			setDateRange(formattedStartDate + ' ~ ' + formattedEndDate);
		}
		if (isSelected && formattedStartDate === formattedEndDate) {
			setDateRange(formattedStartDate);
		}
	}, [formattedStartDate, formattedEndDate]);

	useEffect(() => {
		setStartDate(moment(props.practiceStartDate));
		setEndDate(moment(props.practiceEndDate));
	}, [props.practiceStartDate, props.practiceEndDate]);

	return (
		<Wrapper onClick={() => setIsOpen(true)}>
			<StyledInputWrapper className="calendar-input-container" isActive={isOpen}>
				<StyledInput {...register(props.name, registerOptions)} value={props.date} disabled={true} placeholder={props.placeholder} />
				<CalendarIcon width="16px" height="16px" color={isOpen ? '#6B77F8' : '#9395A6'} />
			</StyledInputWrapper>
			{isOpen && (
				<DayPickerRangeControllerWrapper>
					<DayPickerRangeController
						startDate={startDate}
						endDate={endDate}
						onOutsideClick={() => setIsOpen(false)}
						monthFormat="YYYY년 M월"
						verticalBorderSpacing={4}
						onDatesChange={handleDatesChange}
						onFocusChange={handleFocusChange}
						focusedInput={focusedInput}
						numberOfMonths={2}
						daySize={24}
						minimumNights={0}
						hideKeyboardShortcutsPanel={true}
						navPrev={<BackButtonIcon width="16px" height="16px" color="#9395A6" />}
						navNext={<NextButtonIcon width="16px" height="16px" color="#9395A6" />}
						renderCalendarInfo={() => (
							<TabWrapper className="tab-container">
								<VStack spacing="16px">
									<VStack spacing="8px" align="left">
										<Title>{props.startDateTitle}</Title>
										<InputWrapper>
											<SettingInput fontSize="12px" value={formattedStartDate ?? ''} textAlign="center" padding="8px 0" readOnly />
										</InputWrapper>
									</VStack>
									<VStack spacing="8px" align="left">
										<Title>{props.endDateTitle}</Title>
										<InputWrapper>
											<SettingInput fontSize="12px" value={formattedEndDate ?? ''} textAlign="center" padding="8px 0" readOnly />
										</InputWrapper>
									</VStack>
								</VStack>
								<StyledButton type="button" onClick={handleClickButton}>
									선택 완료
								</StyledButton>
							</TabWrapper>
						)}
					/>
				</DayPickerRangeControllerWrapper>
			)}
		</Wrapper>
	);
};

export default CalendarRangePicker;

const Wrapper = styled.div`
	width: 100%;
	position: relative;
	z-index: 1;
`;

const StyledInput = styled.input`
	width: 100%;
	background: transparent;

	font-family: Pretendard Bold;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: -0.28px;

	&::placeholder {
		color: #9395a6;
		font-family: Pretendard;
		font-size: 14px;
		font-style: normal;
		font-weight: 700;
		line-height: 16px; /* 114.286% */
		letter-spacing: -0.28px;
	}
`;

const StyledInputWrapper = styled.div<any>`
	display: flex;
	padding: 12px 16px;
	border-radius: 10px;
	border: 1px solid ${({ isActive }) => (isActive ? '#6B77F8' : '#9395a6')};
	background: #fff;
`;

const DayPickerRangeControllerWrapper = styled.div`
	position: absolute;
	top: 100%;
	margin-top: 8px;

	[class='DayPicker DayPicker_1 DayPicker__horizontal DayPicker__horizontal_2 DayPicker__withBorder DayPicker__withBorder_3'] {
		width: 420px !important;
		background: transparent;
		box-shadow: none;
	}

	[class='DayPicker_transitionContainer DayPicker_transitionContainer_1 DayPicker_transitionContainer__horizontal DayPicker_transitionContainer__horizontal_2'] {
		width: 420px !important;
	}

	[class='DayPicker DayPicker_1 DayPicker__horizontal DayPicker__horizontal_2 DayPicker__withBorder DayPicker__withBorder_3'] > div {
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		width: 608px;
		height: 244px;

		padding: 24px;
		align-items: center;
		gap: 24px;

		border-radius: 10px;
		border: 1px solid #e4e6f0;
		background: #fff;
	}

	// 달력 치우짐 제거
	[class='CalendarMonthGrid CalendarMonthGrid_1 CalendarMonthGrid__horizontal CalendarMonthGrid__horizontal_2'] {
		// display: flex;
		left: 0;
	}

	[class='DayPicker_focusRegion DayPicker_focusRegion_1'] {
		width: 420px;
	}

	// 요일 제거
	[class='DayPicker_weekHeader DayPicker_weekHeader_1'] {
		display: none;
	}

	// 월
	[class='CalendarMonth_caption CalendarMonth_caption_1'] {
		color: #353644;
		font-family: Pretendard Bold;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: -0.28px;
		padding: 0 0 16px 0;
	}

	// 날짜
	.CalendarDay {
		color: #9395a6;
		font-family: Pretendard Bold;
		font-size: 12px;
		line-height: 16px;
		letter-spacing: -0.24px;
		vertical-align: middle;
		border: none;
	}

	// 네비게이션 배치
	[class='DayPickerNavigation DayPickerNavigation_1 DayPickerNavigation__horizontal DayPickerNavigation__horizontal_2'] {
		display: flex;
		justify-content: space-between;
	}

	// 월 패딩 조절
	[class='CalendarMonth_caption CalendarMonth_caption_1'] {
		padding: 0 0 16px 0;
	}

	// 선택한 날짜
	.CalendarDay__selected_start,
	.CalendarDay__selected_end {
		color: white;
		background: #6b77f8;
		border-radius: 4px;
	}

	// 선택한 날짜 사이 날짜
	.CalendarDay__selected_span {
		background: #e1e4fe;
	}

	// 달력 위치 고정
	[class='DayPicker DayPicker_1 DayPicker__horizontal DayPicker__horizontal_2 DayPicker__withBorder DayPicker__withBorder_3'] > div {
		display: flex;
		align-items: flex-start;
		margin: 0;
	}

	// 달력 패딩
	[class='CalendarMonth CalendarMonth_1'] {
		padding: 0;
	}

	// 달력 자체 패딩 제거
	[class='CalendarMonth CalendarMonth_1'] {
		padding: 0 !important;
	}

	// 첫 번째 달력 패딩
	[class='CalendarMonthGrid_month__horizontal CalendarMonthGrid_month__horizontal_1']:nth-of-type(2) {
		padding-right: 16px;
	}

	// 테이블 너비
	[class='CalendarMonthGrid CalendarMonthGrid_1 CalendarMonthGrid__horizontal CalendarMonthGrid__horizontal_2'] table {
		width: 194px;
	}

	// 두 번째 달력 패딩
	[class='CalendarMonthGrid_month__horizontal CalendarMonthGrid_month__horizontal_1']:nth-of-type(3) {
		padding-left: 16px;
	}
`;

const TabWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 116px;
	height: 100%;
	min-height: 196px;
	justify-content: space-between;
	padding-left: 24px;
	border-left: solid 1px #e4e6f0;

	&::before {
		content: '';
		height: 196px;
		width: 0;
		border-left: solid 1px #f8f8fc;
		background: black;
		position: absolute;
		left: 234px;
	}
`;

const Title = styled.span`
	color: #626474;
	font-family: Pretendard SemiBold;
	font-size: 14px;
	line-height: 16px;
	letter-spacing: -0.28px;
`;

const InputWrapper = styled.div`
	height: 32px;
	color: #6b77f8;
	font-family: Pretendard Bold;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: -0.24px;
`;

const StyledButton = styled.button`
	display: flex;
	height: 40px;
	padding: 16px 0;
	justify-content: center;
	align-items: center;
	gap: 10px;
	align-self: stretch;

	color: #fff;
	font-family: Pretendard Bold;
	font-size: 12px;
	line-height: 16px;
	letter-spacing: -0.24px;

	border-radius: 10px;
	background: #6b77f8;
`;
