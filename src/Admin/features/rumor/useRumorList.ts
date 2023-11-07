import { useQuery } from '@tanstack/react-query';
import { RumorCollectionName } from '../../../models/RumorModel';
import FirebaseUtil from '../../utils/FirebaseUtil';

const useRumorList = () => {
	const result = useQuery([RumorCollectionName], () => FirebaseUtil.getDocumentsFromCollection(RumorCollectionName));
	return result;
};

export default useRumorList;
