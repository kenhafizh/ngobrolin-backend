import { Server } from 'socket.io';
import { AuthSocket } from '../../../types';
import { ChatService } from '../services/chat.service';
import { OnlineUserRepository } from '../../notification/services/online-user.repository';
import { NotificationService } from '../../notification/services/notification.service';
import { registerChatSocket } from './chat.socket';
import { registerTypingSocket } from './typing.socket';

export function registerChatHandlers(
  socket: AuthSocket,
  io: Server,
  chatService: ChatService,
  onlineUsers: OnlineUserRepository,
  notificationService: NotificationService
): void {
  registerChatSocket(socket, io, chatService, onlineUsers, notificationService);
  registerTypingSocket(socket, io, onlineUsers);
}
