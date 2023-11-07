import { SelectOption } from './SelectOption';

export interface IAddressOption extends SelectOption {
	sigunguList: ISigunguOption[];
}

export interface ISigunguOption extends SelectOption {
	eupMyeonDongList: SelectOption[];
}
