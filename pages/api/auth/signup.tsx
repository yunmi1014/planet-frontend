import { SignUpParams } from '@/api/auth/auth.types';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ErrorResponse, ICustomToken } from '../../../src/api/api.types';
import authService from '../../../src/services/authService/authService';
import userService from '../../../src/services/userService/userService';

interface ExtendedNextApiRequest extends NextApiRequest {
	body: SignUpParams;
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<ICustomToken | ErrorResponse>) {
	if (req.method !== 'POST') return;
	const { email, password, passwordConfirm, name, phone, isAdmin = false } = req.body;

	if (password !== passwordConfirm) {
		return res.status(400).json({ message: '비밀번호와 비밀번호 확인이 일치하지 않습니다.' });
	}

	const isExist = await authService.findUserByEmail(email);
	if (isExist) {
		return res.status(400).json({ message: '이미 가입된 이메일이 존재합니다.' });
	}

	const { uid } = await authService.signUp({ email, password });
	await userService.createUser({ id: uid, email, name, phone, isAdmin, provider: 'email' });

	const customToken = await authService.createCustomToken(uid);

	res.status(200).json({ customToken });
}
