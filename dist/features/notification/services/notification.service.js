"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationService = exports.NotificationService = void 0;
const online_user_repository_1 = require("./online-user.repository");
const fcm_service_1 = require("./fcm.service");
class NotificationService {
    registerToken(socketId, username, fcmToken) {
        online_user_repository_1.onlineUserRepository.add(socketId, username, fcmToken);
    }
    removeUser(socketId) {
        online_user_repository_1.onlineUserRepository.remove(socketId);
    }
    updateFcmToken(socketId, fcmToken) {
        online_user_repository_1.onlineUserRepository.updateFcmToken(socketId, fcmToken);
    }
    async sendToUser(socketId, payload) {
        const user = online_user_repository_1.onlineUserRepository.getBySocketId(socketId);
        if (user?.fcmToken) {
            await fcm_service_1.fcmService.sendPush(user.fcmToken, payload);
        }
    }
    getOnlineUsers() {
        return online_user_repository_1.onlineUserRepository.getAll().map((u) => ({
            id: u.socketId,
            username: u.username,
        }));
    }
}
exports.NotificationService = NotificationService;
exports.notificationService = new NotificationService();
//# sourceMappingURL=notification.service.js.map