import { Server } from 'socket.io';
import { AuthSocket } from '../../../types';
import { ChatService } from '../services/chat.service';
import { OnlineUserRepository } from '../../notification/services/online-user.repository';
import { NotificationService } from '../../notification/services/notification.service';
export declare function registerChatSocket(socket: AuthSocket, io: Server, chatService: ChatService, onlineUsers: OnlineUserRepository, notificationService: NotificationService): void;
//# sourceMappingURL=chat.socket.d.ts.map