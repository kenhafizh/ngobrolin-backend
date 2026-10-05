import { Server as HttpServer } from 'http';
import { Server, ServerOptions } from 'socket.io';

const socketOptions: Partial<ServerOptions> = {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  },
  pingTimeout: 60000,
  pingInterval: 25000,
};

let io: Server | null = null;

export function initSocket(httpServer: HttpServer): Server {
  if (io) return io;
  io = new Server(httpServer, socketOptions);
  return io;
}

export function getSocketIO(): Server {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}
