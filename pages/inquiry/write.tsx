import React, { useCallback, useState } from 'react';
import { css, Global } from '@emotion/react';
import CustomSelect from '@/components/CustomSelect/CustomSelect';
import styled from '@emotion/styled';
import { SelectOption } from '@/types/SelectOption';
import { SingleValue } from 'react-select';
import { IAddressOption, ISigunguOption } from '@/types/address.types';
import addressOptions from '../../public/assets/address.json';

const InquiryWritePage = () => {
	const [sido, setSido] = useState<SingleValue<IAddressOption> | null>(null);
	const [sigungu, setSigungu] = useState<SingleValue<ISigunguOption> | null>(null);
	const [eupMyeonDong, setEupMyeonDong] = useState<SingleValue<SelectOption> | null>(null);

	const onChangeSido = useCallback(
		(option: SingleValue<IAddressOption>) => {
			if (!option) return;

			setSido(option);

			const isExistSigungu = option.sigunguList.find((sigunguItem) => sigunguItem === sigungu);
			if (!isExistSigungu) {
				setSigungu(null);
				setEupMyeonDong(null);
			}
		},
		[sigungu],
	);
	const onChangeSigungu = useCallback((option: SingleValue<ISigunguOption>) => {
		if (!option) return;

		setSigungu(option);

		setEupMyeonDong((eupMyeonDong) => {
			const isExistEupMyeonDong = option.eupMyeonDongList.find((eupMyeonDongItem) => eupMyeonDongItem === eupMyeonDong);
			if (!isExistEupMyeonDong) {
				return null;
			}

			return eupMyeonDong;
		});
	}, []);
	const onChangeEupMyeonDong = useCallback((option: SingleValue<SelectOption>) => {
		setEupMyeonDong(option);
	}, []);

	return (
		<>
			<Global styles={[reactSelectContainerStyle, reactSelectMenuStyle]} />

			<Container>
				<CustomSelect placeholder="시/도" options={addressOptions} onChange={onChangeSido} value={sido} noOptionsMessage="시/도" />
				<CustomSelect placeholder="시/군/구" options={sido?.sigunguList ?? []} onChange={onChangeSigungu} value={sigungu} noOptionsMessage="시/군/구" />
				<CustomSelect placeholder="읍/면/동" options={sigungu?.eupMyeonDongList ?? []} onChange={onChangeEupMyeonDong} value={eupMyeonDong} noOptionsMessage="읍/면/동" />
			</Container>
		</>
	);
};

const Container = styled.div`
	padding: 32px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	gap: 16px;
`;

const reactSelectContainerStyle = css`
	.react-select-container {
		width: fit-content;

		.react-select__control {
			cursor: pointer;
			padding: 0 16px;
			width: 360px;
			min-height: 50px;
			background: #fff;
			border: 1px solid #ccc;
			border-radius: 6px;

			.react-select__value-container {
				.react-select__placeholder {
					color: #ccc;
				}
				.react-select__single-value {
					font-size: 16px;
					line-height: 22px;
					letter-spacing: -0.4px;
				}
			}

			.react-select__indicators {
				.react-select__indicator-separator {
					display: none;
				}

				.react-select__dropdown-indicator {
				}
			}
		}

		.react-select__control--menu-is-open {
			border: 1px solid skyblue;
		}
		.react-select__control--is-disabled {
			pointer-events: auto;
			cursor: not-allowed;
		}
	}
`;

const reactSelectMenuStyle = css`
	.react-select-container {
		.react-select__menu {
			top: calc(100% + 4px);
			padding: 4px 0px;
			background: #fff;
			border-radius: 6px;
			filter: drop-shadow(0px 6px 20px rgba(48, 48, 48, 0.25));

			.react-select__menu-list {
				max-height: unset; // default값 제거
				overflow-y: visible; // default값 제거
				max-height: 500px;
				overflow-y: auto;
			}
			.react-select__option {
				cursor: pointer;
				display: flex;
				align-items: center;
				padding: 13px 12px;
				height: 48px;

				// hacky code
				&:hover {
					background: skyblue;
				}
			}

			.react-select__option--is-focused.react-select__option--is-selected {
				background: skyblue;
			}

			.react-select__option--is-disabled {
				cursor: not-allowed;
				color: #ccc;

				// hacky code
				&:hover {
					background: #fff;
				}
			}
		}
	}
`;

export default InquiryWritePage;
