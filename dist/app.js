"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const http_1 = __importDefault(require("http"));
const express_1 = require("./configs/express");
const socket_1 = require("./configs/socket");
const firebase_1 = require("./configs/firebase");
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const requestContext_1 = require("./middlewares/requestContext");
const chat_service_1 = require("./features/chat/services/chat.service");
const notification_service_1 = require("./features/notification/services/notification.service");
const online_user_repository_1 = require("./features/notification/services/online-user.repository");
const socket_2 = require("./features/chat/socket");
const jwt_1 = require("./utils/jwt");
const logger_1 = require("./utils/logger");
function createApp() {
    const app = (0, express_1.createExpressApp)();
    const server = http_1.default.createServer(app);
    (0, firebase_1.initFirebase)();
    const io = (0, socket_1.initSocket)(server);
    const chatService = new chat_service_1.ChatService();
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token)
            return next(new Error('Token tidak ditemukan'));
        const decoded = (0, jwt_1.verifyToken)(token);
        if (!decoded)
            return next(new Error('Token tidak valid'));
        socket.user = decoded;
        next();
    });
    io.on('connection', (socket) => {
        const username = socket.user?.username || 'anonymous';
        const fcmToken = socket.handshake.auth.fcmToken;
        logger_1.logger.info(`User connected: ${username} (${socket.id})`);
        notification_service_1.notificationService.registerToken(socket.id, username, fcmToken);
        io.emit('users:online', notification_service_1.notificationService.getOnlineUsers());
        (0, socket_2.registerChatHandlers)(socket, io, chatService, online_user_repository_1.onlineUserRepository, notification_service_1.notificationService);
        socket.on('update:fcmToken', ({ fcmToken }) => {
            notification_service_1.notificationService.updateFcmToken(socket.id, fcmToken);
        });
        socket.on('disconnect', () => {
            notification_service_1.notificationService.removeUser(socket.id);
            io.emit('users:online', notification_service_1.notificationService.getOnlineUsers());
            logger_1.logger.info(`User disconnected: ${username}`);
        });
    });
    app.use(requestContext_1.requestContext);
    app.use('/api', routes_1.default);
    app.use(errorHandler_1.notFoundHandler);
    app.use(errorHandler_1.errorHandler);
    return { app, server };
}
//# sourceMappingURL=app.js.map