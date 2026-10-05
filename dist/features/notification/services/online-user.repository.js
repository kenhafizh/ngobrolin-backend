"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onlineUserRepository = exports.OnlineUserRepository = void 0;
class OnlineUserRepository {
    constructor() {
        this.users = new Map();
    }
    add(socketId, username, fcmToken) {
        this.users.set(socketId, { socketId, username, fcmToken });
    }
    remove(socketId) {
        this.users.delete(socketId);
    }
    getBySocketId(socketId) {
        return this.users.get(socketId) || null;
    }
    getByUsername(username) {
        for (const user of this.users.values()) {
            if (user.username === username)
                return user;
        }
        return null;
    }
    getAll() {
        return Array.from(this.users.values());
    }
    updateFcmToken(socketId, fcmToken) {
        const user = this.users.get(socketId);
        if (user) {
            user.fcmToken = fcmToken;
        }
    }
}
exports.OnlineUserRepository = OnlineUserRepository;
exports.onlineUserRepository = new OnlineUserRepository();
//# sourceMappingURL=online-user.repository.js.map