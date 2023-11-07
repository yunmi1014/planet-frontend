import { plainToClass, instanceToPlain } from 'class-transformer';
import { Timestamp } from 'firebase/firestore';
import { compact, isUndefined, omitBy } from 'lodash';

// 테이블에 노출 시키고 싶은 항목들
export const RumorVisiblePropertyNames = ['id', 'name', 'phone', 'url', 'createdAt'];
// 엑셀 추출시 필요한 항목들
export const RumorExcelPropertyNames = ['id', 'name', 'phone', 'url', 'createdAt'];

// TODO: 파이어베이스 컬렉션 이름
export const RumorCollectionName = 'rumor';

export class RumorModel {
	id: string; // documentId
	name: string; // 이름
	phone: string; // 연락처
	url: string; // 영상 URL
	createdAt: Timestamp; // 생성일

	constructor(props) {
		return plainToClass(RumorModel, props);
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
				return '휴대폰 번호';
			case 'url':
				return 'URL';
			case 'createdAt':
				return '등록일시';
			default:
				return key;
		}
	}

	// todo : 확인
	toString() {
		const message = compact([this.name ? `${RumorModel.translate('name')}: ${this.name}` : null, this.phone ? `${RumorModel.translate('phone')}: ${this.phone}` : null]);

		return message.join('\n');
	}

	toJson() {
		return omitBy(instanceToPlain(this), isUndefined);
	}
}
