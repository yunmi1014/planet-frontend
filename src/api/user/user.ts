import { doc, DocumentData, getDoc } from 'firebase/firestore';
import { find, merge } from 'lodash';
import FirebaseUtil from '../../Admin/utils/FirebaseUtil';
import { UserCollectionName, UserModel } from '../../models/UserModel';

/**
 * firestore는 nosql이므로 쿼리문을 통해서 조인을 할 수 없습니다.
 * 따라서 각 문서를 가져와서 외래키를 실제 문서로 대체하는 로직을 어플리케이션단에서 진행합니다. (아래 함수에서)
 */
const joinUser = ({ document }: { document: DocumentData }) => {
	//  실제로 테이블에 보여주는 데이터는 조인이 완료된 데이터를 보여줘야한다.
	const joinedData = merge(document);
	return new UserModel(joinedData);
};

// 조인된 목록데이터를 가져온다
// 원래 데이터에 저장된 외래키를 Join하여 완성된 데이터를 반환하는것이 목적이다.
export const getUserListApi = async () => {
	const documents = await FirebaseUtil.getDocumentsFromCollection(UserCollectionName);
	const joinedUsers = documents.map((document) => joinUser({ document }));
	return joinedUsers;
};

export const getUserApi = async (id: string) => {
	try {
		const document = await FirebaseUtil.getDocumentFromCollection(UserCollectionName, id);
		const joinedUser = joinUser({ document });
		return joinedUser;
	} catch (e) {
		console.error(e);
		return null;
	}
};
