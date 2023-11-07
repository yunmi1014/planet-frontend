export type SelectOption = {
	label: string;
	value: string;
};

/**
 * firestore에 아래와같은 형태로 select의 options을 정의하고 있음
 * pricePerSquareMeterOptions: { // 셀렉트명
    '0': '100만원 이하',
    '1': '100~130만원',
    '2': '130~160만원',
    '3': '160~200만원',
    '4': '200만원 이상',
  },
 */
export interface FirestoreSelectOption {
	[key: string]: string;
}
