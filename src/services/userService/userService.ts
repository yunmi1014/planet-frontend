import { firestoreAdmin } from '../../configs/firebaseAdmin';
import { FieldValue } from 'firebase-admin/firestore';
import { UserModel } from '../../models/UserModel';

class UserService {
	private static instanceRef: UserService;
	private userCollection = firestoreAdmin.collection('user');

	private constructor() {}

	static getInstance(): UserService {
		if (UserService.instanceRef === undefined) {
			UserService.instanceRef = new UserService();
		}
		return UserService.instanceRef;
	}

	async createUser(user: Omit<UserModel, 'createdAt'>) {
		this.userCollection.doc(user.id).set({
			...user,
			createdAt: FieldValue.serverTimestamp(),
		});
	}
}

const userService = UserService.getInstance();
export default userService;
