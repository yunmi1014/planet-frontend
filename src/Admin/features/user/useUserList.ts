import { useQuery } from '@tanstack/react-query';
import { getUserListApi } from '../../../api/user/user';
import { UserCollectionName, UserModel } from '../../../models/UserModel';

const useUserList = () => {
	const result = useQuery([UserCollectionName], () => getUserListApi());
	return result;
};

export default useUserList;
