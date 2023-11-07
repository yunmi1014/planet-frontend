import { useQuery } from '@tanstack/react-query';
import { getInquiryListApi } from '../../../api/inquiry/inquiry';
import { InquiryCollectionName } from '../../../models/InquiryModel';

const useInquiryList = () => {
	const result = useQuery([InquiryCollectionName], () => getInquiryListApi());
	return result;
};

export default useInquiryList;
