"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fcmService = void 0;
const firebase_1 = require("../../../configs/firebase");
const logger_1 = require("../../../utils/logger");
class FcmService {
    async sendPush(fcmToken, payload) {
        const admin = (0, firebase_1.getFirebaseAdmin)();
        const message = {
            token: fcmToken,
            notification: {
                title: payload.title,
                body: payload.body,
            },
            data: payload.data || {},
            android: {
                priority: 'high',
                notification: {
                    channelId: 'chat_messages',
                    sound: 'default',
                },
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1,
                    },
                },
            },
        };
        try {
            const response = await admin.messaging().send(message);
            logger_1.logger.info('FCM sent', { response });
            return true;
        }
        catch (err) {
            logger_1.logger.error('FCM failed', { error: err.message });
            return false;
        }
    }
}
exports.fcmService = new FcmService();
//# sourceMappingURL=fcm.service.js.map