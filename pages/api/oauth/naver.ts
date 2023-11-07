import type { NextApiRequest, NextApiResponse } from 'next';
import Tokens from 'csrf';
import { NaverLoginParams } from '../../../src/api/auth/auth.types';
import { ErrorResponse, ICustomToken } from '../../../src/api/api.types';
import authService from '../../../src/services/authService/authService';
import userService from '../../../src/services/userService/userService';

const tokens = new Tokens();

interface ExtendedNextApiRequest extends NextApiRequest {
	body: NaverLoginParams;
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<ICustomToken | ErrorResponse>) {
	if (req.method !== 'POST') return;

	const { code, state } = req.body;
	if (!tokens.verify(process.env.CSRF_TOKEN_SECRET ?? '', state)) {
		return res.status(401).json({ message: 'Invalid Token' });
	}

	const { access_token } = await authService.getNaverToken({ code, state });
	const { response } = await authService.getNaverUser(access_token);

	const id = `naver_${response.id}`;
	const { name, mobile: phone, email } = response;

	const user = await authService.findUserById(id);
	if (!user) {
		await authService.signUp({ uid: id });
		await userService.createUser({ id, name, phone, email, provider: 'naver' });
	}

	const customToken = await authService.createCustomToken(id);

	res.status(200).json({ customToken });
}
