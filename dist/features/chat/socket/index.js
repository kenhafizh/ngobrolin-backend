"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerChatHandlers = registerChatHandlers;
const chat_socket_1 = require("./chat.socket");
const typing_socket_1 = require("./typing.socket");
function registerChatHandlers(socket, io, chatService, onlineUsers, notificationService) {
    (0, chat_socket_1.registerChatSocket)(socket, io, chatService, onlineUsers, notificationService);
    (0, typing_socket_1.registerTypingSocket)(socket, io, onlineUsers);
}
//# sourceMappingURL=index.js.map