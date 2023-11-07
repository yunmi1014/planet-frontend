import styled from '@emotion/styled';
import { components, DropdownIndicatorProps } from 'react-select';
import ChevronDownIcon from 'public/assets/chevron_down.svg';
import { SelectOption } from '@/types/SelectOption';

const DropdownIndicator = <TOption extends SelectOption>(props: DropdownIndicatorProps<TOption, false>) => {
	return (
		<components.DropdownIndicator {...props}>
			<ChevronDownWrapper isActive={props.selectProps.menuIsOpen}>
				<ChevronDownIcon />
			</ChevronDownWrapper>
		</components.DropdownIndicator>
	);
};

const ChevronDownWrapper = styled.div<IsActive>`
	svg {
		transform: ${({ isActive }) => (isActive ? 'rotate(180deg)' : 'rotate(0)')};
	}
`;

export default DropdownIndicator;
