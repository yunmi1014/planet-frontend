import { atom, selector } from 'recoil';

// 아이템 목록
// export const ItemListState = atom<UserModel[] | InquiryModel[] | PortfolioModel[] | ReviewModel[]>({
//   key: "ItemListState",
//   default: null,
// });

type Models = any;

// 선택된 아이템
export const selectedItemState = atom<Models>({
	key: 'selectedItemState',
	default: null,
});

// 선택된 아이템 목록
export const selectedItemListState = atom<Models[]>({
	key: 'selectedItemListState',
	default: [],
});

// 선택된 아이템 아이디 목록
export const selectedItemIdListState = selector<string[]>({
	key: 'selectedItemIdListState',
	get: ({ get }) => {
		const selectedItemList = get(selectedItemListState);
		return selectedItemList?.map((x) => x!.id);
	},
});

// 선택된 항목이 2개 이상인가?
export const isMultipleSelectState = selector({
	key: 'isMultipleSelectState',
	get: ({ get }) => {
		const selectedItemList = get(selectedItemListState);
		return selectedItemList?.length >= 1;
	},
});

// TODO
type SelectOption = {
	label: string;
	value: string;
};
type SelectOptions = SelectOption[];

export const selectOptionsState = atom<SelectOptions>({
	key: 'selectOptionsState',
	default: [],
});

// pricePerSquareMeter 셀렉트 옵션
// export const pricePerSquareMeterState = selector<SelectOptions>({
//   key: 'pricePerSquareMeterState',
//   get: ({ get }) => {
//     const optionsState = get(selectOptionsState);
//     const target = find(optionsState, { id: 'pricePerSquareMeter' });
//     const { id, options } = target;
//     return Object.keys(options).map((value, index) => {
//       return {
//         label: options[index],
//         value,
//       };
//     });
//   },
// });

// pricePerSquareMeter 셀렉트 옵션
// export const spaceSizeTypeState = selector<
//   {
//     label: string;
//     value: string;
//   }[]
// >({
//   key: 'spaceSizeTypeState',
//   get: ({ get }) => {
//     const optionState = get(selectOptionsState);
//     const target = find(optionState, { id: 'spaceSizeType' });
//     const { id, options } = target;
//     return Object.keys(options).map((value, index) => {
//       return {
//         label: options[index],
//         value,
//       };
//     });
//   },
// });
