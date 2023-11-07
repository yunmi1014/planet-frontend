import { atom } from 'recoil';
import { UserModel } from '../models/UserModel';

export const userState = atom<UserModel | null>({
	key: 'userState',
	default: null,
});
