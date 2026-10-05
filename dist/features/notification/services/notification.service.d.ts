import { PushNotificationPayload } from '../types/notification.types';
export declare class NotificationService {
    registerToken(socketId: string, username: string, fcmToken?: string): void;
    removeUser(socketId: string): void;
    updateFcmToken(socketId: string, fcmToken: string): void;
    sendToUser(socketId: string, payload: PushNotificationPayload): Promise<void>;
    getOnlineUsers(): {
        id: string;
        username: string;
    }[];
}
export declare const notificationService: NotificationService;
//# sourceMappingURL=notification.service.d.ts.map