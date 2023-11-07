import { useQuery } from '@tanstack/react-query';
import { isNil } from 'lodash';
import { useRouter } from 'next/router';
import { getUserApi } from '../../../api/user/user';
import { UserCollectionName } from '../../../models/UserModel';

const useUserDetail = () => {
	const router = useRouter();
	const userId = router.query.id as string;

	const result = useQuery([UserCollectionName, userId], () => getUserApi(userId), {
		enabled: !isNil(userId),
	});

	return result;
};

export default useUserDetail;
