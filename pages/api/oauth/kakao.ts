import type { NextApiRequest, NextApiResponse } from 'next';
import { ICode, ICustomToken } from '../../../src/api/api.types';
import authService from '../../../src/services/authService/authService';
import userService from '../../../src/services/userService/userService';

interface ExtendedNextApiRequest extends NextApiRequest {
	body: ICode;
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<ICustomToken>) {
	if (req.method !== 'POST') return;
	const { code } = req.body;

	const { access_token } = await authService.getKakaoToken(code);
	const kakaoUser = await authService.getKakaoUser(access_token);

	const id = `kakao_${kakaoUser.id}`;
	const {
		email,
		profile: { nickname: name },
		phone_number,
	} = kakaoUser.kakao_account;

	const user = await authService.findUserById(id);
	if (!user) {
		await authService.signUp({ uid: id });
		await userService.createUser({ id, name, phone: phone_number ? phone_number.replace('+82 ', '0') : '', email, provider: 'kakao' });
	}

	const customToken = await authService.createCustomToken(id);

	res.status(200).json({ customToken });
}
