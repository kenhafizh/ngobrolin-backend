import { getFirebaseAdmin } from '../../../configs/firebase';
import { UserData } from '../types/auth.types';
import { logger } from '../../../utils/logger';

const COLLECTION_NAME = 'users';

export class UserRepository {
  private get db() {
    return getFirebaseAdmin().firestore();
  }

  async create(userData: Omit<UserData, 'uid'>): Promise<UserData> {
    const docRef = this.db.collection(COLLECTION_NAME).doc();
    const uid = docRef.id;

    const user: UserData = {
      uid,
      ...userData,
    };

    await docRef.set(user);
    logger.info('User created in Firestore', { uid, username: user.username });

    return user;
  }

  async findByUsername(username: string): Promise<UserData | null> {
    const snapshot = await this.db
      .collection(COLLECTION_NAME)
      .where('username', '==', username)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as UserData;
  }

  async findByEmail(email: string): Promise<UserData | null> {
    const snapshot = await this.db
      .collection(COLLECTION_NAME)
      .where('email', '==', email)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    return snapshot.docs[0].data() as UserData;
  }

  async findByUid(uid: string): Promise<UserData | null> {
    const doc = await this.db.collection(COLLECTION_NAME).doc(uid).get();

    if (!doc.exists) return null;

    return doc.data() as UserData;
  }

  async update(uid: string, data: Partial<UserData>): Promise<void> {
    await this.db.collection(COLLECTION_NAME).doc(uid).update({
      ...data,
      updatedAt: new Date().toISOString(),
    });
    logger.info('User updated in Firestore', { uid });
  }

  async delete(uid: string): Promise<void> {
    await this.db.collection(COLLECTION_NAME).doc(uid).delete();
    logger.info('User deleted from Firestore', { uid });
  }
}

export const userRepository = new UserRepository();
