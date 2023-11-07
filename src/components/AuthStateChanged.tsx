import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getUserApi } from '../api/user/user';
import { userState } from '../atoms/user';
import { auth } from '../configs/firebase';

const AuthStateChanged = () => {
	const setUser = useSetRecoilState(userState);
	const user = useRecoilValue(userState);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setUser(null);
				return;
			}

			const userMe = await getUserApi(user.uid);
			setUser(userMe);
		});

		return unsubscribe;
	}, [setUser]);

	return null;
};

export default AuthStateChanged;
