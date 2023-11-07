import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getInquiryDetailApi } from '../../../api/inquiry/inquiry';
import { InquiryCollectionName } from '../../../models/InquiryModel';

const useInquiryDetail = () => {
	const router = useRouter();
	const inquiryId = router.query.id as string;

	// 포트폴리오 데이터 selectOptions 데이터를 받아온 다음에 실행되도록 enabled 옵션을 사용
	const { data: inquiry, refetch } = useQuery([InquiryCollectionName, inquiryId], () => getInquiryDetailApi({ inquiryId }));

	return { inquiry, mutate: refetch };
};

export default useInquiryDetail;
