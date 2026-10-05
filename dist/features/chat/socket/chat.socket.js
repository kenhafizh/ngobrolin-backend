"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChatSocket = registerChatSocket;
const chat_validation_1 = require("../validations/chat.validation");
function registerChatSocket(socket, io, chatService, onlineUsers, notificationService) {
    const username = socket.user?.username || 'anonymous';
    socket.on('chat:public', (payload) => {
        const validation = (0, chat_validation_1.validateMessage)(payload);
        if (!validation.valid) {
            socket.emit('error', { message: validation.error });
            return;
        }
        const msg = chatService.sendPublicMessage(username, validation.data.message);
        io.emit('chat:public', msg);
    });
    socket.on('chat:private', (payload) => {
        const validation = (0, chat_validation_1.validateMessage)(payload);
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
//# sourceMappingURL=chat.socket.js.map