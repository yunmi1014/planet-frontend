import { atom } from 'recoil';

export const uploadedImagesState = atom<string[]>({
	key: 'uploadImagesState',
	default: [],
});
