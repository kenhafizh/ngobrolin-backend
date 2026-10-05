import { Server } from 'socket.io';
import { AuthSocket } from '../../../types';
import { OnlineUserRepository } from '../../notification/services/online-user.repository';

export function registerTypingSocket(
  socket: AuthSocket,
  io: Server,
  onlineUsers: OnlineUserRepository
): void {
  const username = socket.user?.username || 'anonymous';

  socket.on('typing', ({ to }: { to: string }) => {
    const targetUser = onlineUsers.getByUsername(to);
    if (targetUser?.socketId) {
      io.to(targetUser.socketId).emit('typing:notify', { from: username });
    }
  });
}
