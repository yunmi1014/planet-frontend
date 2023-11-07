import { plainToClass, instanceToPlain } from 'class-transformer';
import { Timestamp } from 'firebase/firestore';
import { compact, isUndefined, omitBy } from 'lodash';

// 테이블에 노출 시키고 싶은 항목들
export const InquiryVisiblePropertyNames = ['id', 'name', 'phone', 'sido', 'gugun', 'childrenAge', 'createdAt'];
// 엑셀 추출시 필요한 항목들
export const InquiryExcelPropertyNames = ['id', 'name', 'phone', 'sido', 'gugun', 'childrenAge', 'createdAt'];

// TODO: 파이어베이스 컬렉션 이름
export const InquiryCollectionName = 'consulting';

export class InquiryModel {
	id: string; // documentId
	name: string; // 이름
	phone: string; // 연락처
	sido: string; // 시/도
	gugun: string; // 시/군/구
	childrenAge: string; // 나이
	createdAt: Timestamp; // 생성일

	constructor(props) {
		return plainToClass(InquiryModel, props);
	}

	// undefined 필드 제거
	toPlain() {
		return instanceToPlain(this, { exposeUnsetFields: false });
	}

	// TODO: 어드민 테이블 헤더에 표시할 이름
	static translate(key: string) {
		switch (key) {
			case 'name':
				return '이름';
			case 'phone':
				return '연락처';
			case 'sido':
				return '시/도';
			case 'gugun':
				return '시/군/구';
			case 'childrenAge':
				return '자녀나이';
			case 'createdAt':
				return '등록일시';
			default:
				return key;
		}
	}

	// todo : 확인
	toString() {
		const message = compact([this.name ? `${InquiryModel.translate('name')}: ${this.name}` : null, this.phone ? `${InquiryModel.translate('phone')}: ${this.phone}` : null]);

		return message.join('\n');
	}

	toJson() {
		return omitBy(instanceToPlain(this), isUndefined);
	}
}
