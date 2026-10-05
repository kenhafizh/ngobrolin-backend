"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocket = initSocket;
exports.getSocketIO = getSocketIO;
const socket_io_1 = require("socket.io");
const socketOptions = {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
    pingTimeout: 60000,
    pingInterval: 25000,
};
let io = null;
function initSocket(httpServer) {
    if (io)
        return io;
    io = new socket_io_1.Server(httpServer, socketOptions);
    return io;
}
function getSocketIO() {
    if (!io)
        throw new Error('Socket.io not initialized');
    return io;
}
//# sourceMappingURL=socket.js.map