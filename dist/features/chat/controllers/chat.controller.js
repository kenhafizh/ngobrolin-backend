"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chat_service_1 = require("../services/chat.service");
const respons_1 = require("../../../utils/respons");
class ChatController {
    constructor() {
        this.getHistory = (_req, res) => {
            const messages = this.chatService.getPublicHistory();
            res.json((0, respons_1.success)('History retrieved', messages));
        };
        this.chatService = new chat_service_1.ChatService();
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map