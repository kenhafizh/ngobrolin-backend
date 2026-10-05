import { OnlineUserInfo } from '../types/notification.types';

export class OnlineUserRepository {
  private users: Map<string, OnlineUserInfo> = new Map();

  add(socketId: string, username: string, fcmToken?: string): void {
    this.users.set(socketId, { socketId, username, fcmToken });
  }

  remove(socketId: string): void {
    this.users.delete(socketId);
  }

  getBySocketId(socketId: string): OnlineUserInfo | null {
    return this.users.get(socketId) || null;
  }

  getByUsername(username: string): OnlineUserInfo | null {
    for (const user of this.users.values()) {
      if (user.username === username) return user;
    }
    return null;
  }

  getAll(): OnlineUserInfo[] {
    return Array.from(this.users.values());
  }

  updateFcmToken(socketId: string, fcmToken: string): void {
    const user = this.users.get(socketId);
    if (user) {
      user.fcmToken = fcmToken;
    }
  }
}

export const onlineUserRepository = new OnlineUserRepository();
