import { OnlineUserInfo } from '../types/notification.types';
export declare class OnlineUserRepository {
    private users;
    add(socketId: string, username: string, fcmToken?: string): void;
    remove(socketId: string): void;
    getBySocketId(socketId: string): OnlineUserInfo | null;
    getByUsername(username: string): OnlineUserInfo | null;
    getAll(): OnlineUserInfo[];
    updateFcmToken(socketId: string, fcmToken: string): void;
}
export declare const onlineUserRepository: OnlineUserRepository;
//# sourceMappingURL=online-user.repository.d.ts.map