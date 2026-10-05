"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTypingSocket = registerTypingSocket;
function registerTypingSocket(socket, io, onlineUsers) {
    const username = socket.user?.username || 'anonymous';
    socket.on('typing', ({ to }) => {
        const targetUser = onlineUsers.getByUsername(to);
        if (targetUser?.socketId) {
            io.to(targetUser.socketId).emit('typing:notify', { from: username });
        }
    });
}
//# sourceMappingURL=typing.socket.js.map