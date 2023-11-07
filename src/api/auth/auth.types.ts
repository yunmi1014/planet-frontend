export interface NaverLoginParams {
	code: string;
	state: string;
}

export type SignUpParams = {
	passwordConfirm: string;
	name: string;
	phone: string;
	isAdmin?: boolean;
} & LoginParams;

export type LoginParams = {
	email: string;
	password: string;
};
