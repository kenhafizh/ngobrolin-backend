"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const message_repository_1 = require("../repositories/message.repository");
class ChatService {
    generateId() {
        return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
    sendPublicMessage(from, messageText) {
        const msg = {
            id: this.generateId(),
            from,
            message: messageText,
            timestamp: new Date().toISOString(),
        };
        message_repository_1.messageRepository.savePublic(msg);
        return msg;
    }
    sendPrivateMessage(from, to, messageText) {
        const msg = {
            id: this.generateId(),
            from,
            to,
            message: messageText,
            timestamp: new Date().toISOString(),
        };
        message_repository_1.messageRepository.savePrivate(msg);
        return msg;
    }
    getPublicHistory() {
        return message_repository_1.messageRepository.getPublicMessages();
    }
    getPrivateHistory(username) {
        return message_repository_1.messageRepository.getPrivateMessages(username);
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map