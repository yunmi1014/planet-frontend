import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

export class DateUtil {
	static formatTimestampOrDateString(value: any): string {
		// Firestore Timestamp라면
		if (value && typeof value.toDate === 'function') {
			return dayjs(value.toDate()).format('YYYY년 MM월 DD일 HH:mm:ss');
		}

		// String 형식의 날짜라면
		if (typeof value === 'string') {
			return dayjs(value).format('YYYY년 MM월 DD일 HH:mm:ss');
		}

		// 혹은 다른 기본값을 반환
		return value;
	}

	static toFirestoreTimestamp(dateString: string | Timestamp): Timestamp | string {
		// 이미 Timestamp형식이라 다시 변환할 필요가 없는 경우
		if ((dateString as any)._methodName === 'serverTimestamp') return dateString;

		if (typeof dateString !== 'string') {
			// 입력이 문자열이 아닌 경우 null 반환
			return dateString;
		}

		const date = dayjs(dateString, 'YYYY년 MM월 DD일 HH:mm:ss').toDate();

		// 변환된 Date 객체가 유효하지 않은 경우 null 반환
		if (isNaN(date.getTime())) {
			return '';
		}

		return Timestamp.fromDate(date);
	}
}
