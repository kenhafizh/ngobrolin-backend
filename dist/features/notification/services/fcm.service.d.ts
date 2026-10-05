import { PushNotificationPayload } from '../types/notification.types';
declare class FcmService {
    sendPush(fcmToken: string, payload: PushNotificationPayload): Promise<boolean>;
}
export declare const fcmService: FcmService;
export {};
//# sourceMappingURL=fcm.service.d.ts.map