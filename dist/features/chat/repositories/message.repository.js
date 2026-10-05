"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRepository = void 0;
const MAX_PUBLIC_MESSAGES = 50;
const MAX_PRIVATE_MESSAGES = 100;
class MessageRepository {
    constructor() {
        this.publicMessages = [];
        this.privateMessages = new Map();
    }
    savePublic(message) {
        this.publicMessages.push(message);
        if (this.publicMessages.length > MAX_PUBLIC_MESSAGES) {
            this.publicMessages.shift();
        }
    }
    savePrivate(message) {
        const recipient = message.to;
        if (!this.privateMessages.has(recipient)) {
            this.privateMessages.set(recipient, []);
        }
        this.privateMessages.get(recipient).push(message);
        if (this.privateMessages.get(recipient).length > MAX_PRIVATE_MESSAGES) {
            this.privateMessages.get(recipient).shift();
        }
        if (!this.privateMessages.has(message.from)) {
            this.privateMessages.set(message.from, []);
        }
        this.privateMessages.get(message.from).push(message);
        if (this.privateMessages.get(message.from).length > MAX_PRIVATE_MESSAGES) {
            this.privateMessages.get(message.from).shift();
        }
    }
    getPublicMessages() {
        return this.publicMessages;
    }
    getPrivateMessages(username) {
        return this.privateMessages.get(username) || [];
    }
}
exports.messageRepository = new MessageRepository();
//# sourceMappingURL=message.repository.js.map