import axios from 'axios';

export const client = axios.create({
	baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : `https://${process.env.NEXT_PUBLIC_DOMAIN}/api`,
});
