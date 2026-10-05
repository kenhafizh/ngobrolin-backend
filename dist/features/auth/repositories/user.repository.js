"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = exports.UserRepository = void 0;
const firebase_1 = require("../../../configs/firebase");
const logger_1 = require("../../../utils/logger");
const COLLECTION_NAME = 'users';
class UserRepository {
    get db() {
        return (0, firebase_1.getFirebaseAdmin)().firestore();
    }
    async create(userData) {
        const docRef = this.db.collection(COLLECTION_NAME).doc();
        const uid = docRef.id;
        const user = {
            uid,
            ...userData,
        };
        await docRef.set(user);
        logger_1.logger.info('User created in Firestore', { uid, username: user.username });
        return user;
    }
    async findByUsername(username) {
        const snapshot = await this.db
            .collection(COLLECTION_NAME)
            .where('username', '==', username)
            .limit(1)
            .get();
        if (snapshot.empty)
            return null;
        return snapshot.docs[0].data();
    }
    async findByEmail(email) {
        const snapshot = await this.db
            .collection(COLLECTION_NAME)
            .where('email', '==', email)
            .limit(1)
            .get();
        if (snapshot.empty)
            return null;
        return snapshot.docs[0].data();
    }
    async findByUid(uid) {
        const doc = await this.db.collection(COLLECTION_NAME).doc(uid).get();
        if (!doc.exists)
            return null;
        return doc.data();
    }
    async update(uid, data) {
        await this.db.collection(COLLECTION_NAME).doc(uid).update({
            ...data,
            updatedAt: new Date().toISOString(),
        });
        logger_1.logger.info('User updated in Firestore', { uid });
    }
    async delete(uid) {
        await this.db.collection(COLLECTION_NAME).doc(uid).delete();
        logger_1.logger.info('User deleted from Firestore', { uid });
    }
}
exports.UserRepository = UserRepository;
exports.userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map