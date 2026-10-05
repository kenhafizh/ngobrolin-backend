import { onlineUserRepository } from './online-user.repository';
import { fcmService } from './fcm.service';
import { PushNotificationPayload } from '../types/notification.types';

export class NotificationService {
  registerToken(socketId: string, username: string, fcmToken?: string): void {
    onlineUserRepository.add(socketId, username, fcmToken);
  }

  removeUser(socketId: string): void {
    onlineUserRepository.remove(socketId);
  }

  updateFcmToken(socketId: string, fcmToken: string): void {
    onlineUserRepository.updateFcmToken(socketId, fcmToken);
  }

  async sendToUser(socketId: string, payload: PushNotificationPayload): Promise<void> {
    const user = onlineUserRepository.getBySocketId(socketId);
    if (user?.fcmToken) {
      await fcmService.sendPush(user.fcmToken, payload);
    }
  }

  getOnlineUsers() {
    return onlineUserRepository.getAll().map((u) => ({
      id: u.socketId,
      username: u.username,
    }));
  }
}

export const notificationService = new NotificationService();
