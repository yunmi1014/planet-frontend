import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { DanceCollectionName } from '../../../models/DanceModel';
import FirebaseUtil from '../../utils/FirebaseUtil';

const useDanceDetail = () => {
	const router = useRouter();
	const id = router.query.id as string;
	const result = useQuery([DanceCollectionName, id], () => FirebaseUtil.getDocumentFromCollection(DanceCollectionName, id));

	return result;
};

export default useDanceDetail;
