import { Server } from 'socket.io';
import { AuthSocket } from '../../../types';
import { ChatService } from '../services/chat.service';
import { OnlineUserRepository } from '../../notification/services/online-user.repository';
import { NotificationService } from '../../notification/services/notification.service';
import { validateMessage } from '../validations/chat.validation';
import { logger } from '../../../utils/logger';

export function registerChatSocket(
  socket: AuthSocket,
  io: Server,
  chatService: ChatService,
  onlineUsers: OnlineUserRepository,
  notificationService: NotificationService
): void {
  const username = socket.user?.username || 'anonymous';

  socket.on('chat:public', (payload: unknown) => {
    const validation = validateMessage(payload);
    if (!validation.valid) {
      socket.emit('error', { message: validation.error });
      return;
    }

    const msg = chatService.sendPublicMessage(username, validation.data.message);
    io.emit('chat:public', msg);
  });

  socket.on('chat:private', (payload: unknown) => {
    const validation = validateMessage(payload);
    if (!validation.valid) {
      socket.emit('error', { message: validation.error });
      return;
    }

    const { to, message: messageText } = validation.data;

    if (!to) {
      socket.emit('error', { message: 'Target user wajib diisi' });
      return;
    }

    const msg = chatService.sendPrivateMessage(username, to, messageText);

    const targetUser = onlineUsers.getByUsername(to);
    if (targetUser?.socketId) {
      io.to(targetUser.socketId).emit('chat:private', msg);

      notificationService.sendToUser(targetUser.socketId, {
        title: `Pesan dari ${username}`,
        body: messageText,
        data: { type: 'private_message', sender: username },
      });
    }

    socket.emit('chat:private:sent', { to, message: messageText, timestamp: msg.timestamp });
  });

  socket.on('chat:history', () => {
    const history = chatService.getPublicHistory();
    socket.emit('chat:history', history);
  });
}
