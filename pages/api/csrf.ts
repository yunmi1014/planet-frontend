import type { NextApiRequest, NextApiResponse } from 'next';
import Tokens from 'csrf';
import { NaverLoginParams } from '../../src/api/auth/auth.types';
import { IToken } from '../../src/api/api.types';

const tokens = new Tokens();

interface ExtendedNextApiRequest extends NextApiRequest {
	body: NaverLoginParams;
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse<IToken>) {
	if (req.method !== 'GET') return;
	if (!process.env.CSRF_TOKEN_SECRET) {
		throw new Error('Please check the environment variables.');
	}

	const token = tokens.create(process.env.CSRF_TOKEN_SECRET);

	res.status(200).json({ token });
}
