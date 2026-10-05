import http from "http";
import { createExpressApp } from "./configs/express";
import { initSocket } from "./configs/socket";
import { initFirebase } from "./configs/firebase";
import routes from "./routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";
import { requestContext } from "./middlewares/requestContext";

import { ChatService } from "./features/chat/services/chat.service";
import { notificationService } from "./features/notification/services/notification.service";
import { onlineUserRepository } from "./features/notification/services/online-user.repository";

import { registerChatHandlers } from "./features/chat/socket";
import { AuthSocket } from "./types";
import { verifyToken } from "./utils/jwt";
import { logger } from "./utils/logger";

export function createApp() {
  const app = createExpressApp();
  const server = http.createServer(app);

  initFirebase();

  const io = initSocket(server);

  const chatService = new ChatService();

  io.use((socket: AuthSocket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.query.token;
    if (!token) return next(new Error("Token tidak ditemukan"));

    const decoded = verifyToken(token);
    if (!decoded) return next(new Error("Token tidak valid"));

    socket.user = decoded;
    next();
  });

  io.on("connection", (socket: AuthSocket) => {
    const username = socket.user?.username || "anonymous";
    const fcmToken = socket.handshake.auth.fcmToken as string | undefined;

    logger.info(`User connected: ${username} (${socket.id})`);

    notificationService.registerToken(socket.id, username, fcmToken);
    io.emit("users:online", notificationService.getOnlineUsers());

    registerChatHandlers(
      socket,
      io,
      chatService,
      onlineUserRepository,
      notificationService,
    );

    socket.on("update:fcmToken", ({ fcmToken }: { fcmToken: string }) => {
      notificationService.updateFcmToken(socket.id, fcmToken);
    });

    socket.on("disconnect", () => {
      notificationService.removeUser(socket.id);
      io.emit("users:online", notificationService.getOnlineUsers());
      logger.info(`User disconnected: ${username}`);
    });
  });

  app.use(requestContext);
  app.use("/api", routes);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return { app, server };
}
