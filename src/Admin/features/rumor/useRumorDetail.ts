import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { RumorCollectionName } from '../../../models/RumorModel';
import FirebaseUtil from '../../utils/FirebaseUtil';

const useRumorDetail = () => {
	const router = useRouter();
	const id = router.query.id as string;
	const result = useQuery([RumorCollectionName, id], () => FirebaseUtil.getDocumentFromCollection(RumorCollectionName, id));

	return result;
};

export default useRumorDetail;
