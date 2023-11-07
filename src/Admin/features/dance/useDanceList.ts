import { useQuery } from '@tanstack/react-query';
import { DanceCollectionName } from '../../../models/DanceModel';
import FirebaseUtil from '../../utils/FirebaseUtil';

const useDanceList = () => {
	const result = useQuery([DanceCollectionName], () => FirebaseUtil.getDocumentsFromCollection(DanceCollectionName));
	return result;
};

export default useDanceList;
