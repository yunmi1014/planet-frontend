import { collection, getDocs, doc, getDoc, deleteDoc, updateDoc, query, where, addDoc, DocumentData, setDoc, WhereFilterOp, QueryConstraint, Query, limit, orderBy } from 'firebase/firestore';
import { firestorage, firestore } from '../../configs/firebase';
import { first, merge, isEmpty, toPlainObject, omitBy, isNil } from 'lodash';
import { deleteObject, ref } from 'firebase/storage';
import { DateUtil } from './DateUtil';

class FirebaseUtil {
	static getDocumentsFromCollection = async (collectionName: string, where?: QueryConstraint[], orderByOption?: [string, 'desc' | 'asc'], limitOption?: number) => {
		let baseQuery: Query = collection(firestore, collectionName);

		// 'where' 필터링 옵션이 제공되면, 해당 필터를 쿼리에 적용합니다.
		if (!isEmpty(where)) {
			baseQuery = query(baseQuery, ...where!);
		}

		// 'orderBy' 정렬 옵션이 제공되면, 해당 정렬을 쿼리에 적용합니다.
		if (!isEmpty(orderByOption)) {
			baseQuery = query(baseQuery, orderBy(orderByOption![0], orderByOption![1]));
		}

		// 'limit' 제한 옵션이 제공되면, 해당 제한을 쿼리에 적용합니다.
		if (!isEmpty(limitOption)) {
			baseQuery = query(baseQuery, limit(limitOption!));
		}

		// 위에서 정의한 쿼리 (필터링, 정렬, 제한 옵션이 적용된 경우 포함)로 문서들을 가져옵니다.
		const querySnapshot = await getDocs(baseQuery);

		// 가져온 문서들을 배열로 변환하고, 각 문서의 데이터와 문서 ID를 병합합니다.
		const documents = querySnapshot.docs.map((doc) => {
			const data = doc.data();
			return merge(data, { id: doc.id }) as DocumentData;
		});

		// 문서가 없으면 빈 배열을 반환하고, 그렇지 않으면 변환된 문서 배열을 반환합니다.
		return isEmpty(documents) ? [] : documents;
	};

	static getCollectionRef = (collectionName: string) => {
		return collection(firestore, collectionName);
	};

	static getDocumentFromCollection = async (collectionName: string, documentId: string) => {
		const queryRef = doc(firestore, collectionName, documentId);
		const querySnapshot = await getDoc(queryRef);
		if (querySnapshot.exists()) {
			const data = querySnapshot.data();
			return merge({ id: querySnapshot.id }, data);
		} else {
			console.log('No such Document!');
			return {};
		}
	};

	static getDocumentCountFromCollection = async (collectionName: string) => {
		const querySnapshot = await getDocs(collection(firestore, collectionName));
		return querySnapshot.size;
	};

	static deleteDocument = async (collectionName: string, documentId: string) => {
		await deleteDoc(doc(firestore, collectionName, documentId));
	};

	static deleteField = async (collectionName, id, field) => {
		const ref = doc(firestore, collectionName, id);
		await updateDoc(ref, { [field]: {} });
	};

	static addDocument = async (collectionName: string, data: any) => {
		const collectionRef = collection(firestore, collectionName);
		const transformedData = omitBy(merge(data, { createdAt: DateUtil.toFirestoreTimestamp(data?.createdAt) }), isNil);
		return await addDoc(collectionRef, transformedData);
	};

	static setDocument = async (collectionName: string, documentId: string, data: any) => {
		const transformedData = omitBy(merge(data, { createdAt: DateUtil.toFirestoreTimestamp(data?.createdAt) }), isNil);
		return await setDoc(doc(firestore, collectionName, documentId), transformedData);
	};

	static modifyDocument = async ({ collectionName, data }) => {
		const documentId = data.id;
		const updateDocumentRef = doc(firestore, collectionName, documentId);
		const transformedData = omitBy(merge(data, { createdAt: DateUtil.toFirestoreTimestamp(data?.createdAt) }), isNil);
		await updateDoc(updateDocumentRef, transformedData);
	};

	// 스토리지에 저장된 파일 삭제
	static deleteToFirebaseStorage = async (path: string) => {
		const storageRef = ref(firestorage, path);

		deleteObject(storageRef);
	};
}

export default FirebaseUtil;
