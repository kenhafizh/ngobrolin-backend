import { getFirebaseAdmin } from '../../../configs/firebase';
import { PushNotificationPayload } from '../types/notification.types';
import { logger } from '../../../utils/logger';

class FcmService {
  async sendPush(fcmToken: string, payload: PushNotificationPayload): Promise<boolean> {
    const admin = getFirebaseAdmin();

    const message = {
      token: fcmToken,
      notification: {
        title: payload.title,
        body: payload.body,
      },
      data: payload.data || {},
      android: {
        priority: 'high' as const,
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
      logger.info('FCM sent', { response });
      return true;
    } catch (err: any) {
      logger.error('FCM failed', { error: err.message });
      return false;
    }
  }
}

export const fcmService = new FcmService();
