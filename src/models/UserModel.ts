import { plainToClass, instanceToPlain } from 'class-transformer';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';
import { compact, isUndefined, omitBy } from 'lodash';

// 테이블에 노출 시키고 싶은 항목들
export const UserVisiblePropertyNames = ['id', 'name', 'phone', 'email', 'provider', 'createdAt'];
// 엑셀 추출시 필요한 항목들
export const UserExcelPropertyNames = ['id', 'name', 'phone', 'email', 'provider', 'createdAt'];

// 파이어베이스 컬렉션 이름
export const UserCollectionName = 'user';

export class UserModel {
	id: string;
	name: string;
	phone: string;
	email: string;
	isAdmin?: boolean;
	provider?: 'email' | 'kakao' | 'naver'; // 해당유저가 어떤 방식으로 가입된 회원인지를 구분
	createdAt?: Timestamp;

	constructor(props: Partial<UserModel>) {
		return plainToClass(UserModel, props);
	}

	// 어드민 테이블 헤더에 표시할 이름
	static translate(key: string) {
		switch (key) {
			case 'name':
				return '이름';
			case 'phone':
				return '휴대폰 번호';
			case 'email':
				return '이메일';
			case 'password':
				return '비밀번호';
			case 'provider':
				return '가입방식';
			case 'createdAt':
				return '등록일시';
			default:
				return key;
		}
	}

	// todo : 확인
	toString?() {
		const message = compact([this.name ? `${UserModel.translate('name')}: ${this.name}` : null, this.phone ? `${UserModel.translate('phone')}: ${this.phone}` : null, this.createdAt ? `등록일시: ${dayjs(this.createdAt.toDate()).format('YYYY년 MM월 DD일 HH:mm')}` : null]);

		return message.join('\n');
	}

	toJson?() {
		return omitBy(instanceToPlain(this), isUndefined);
	}
}
