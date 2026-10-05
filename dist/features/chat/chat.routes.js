"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = require("./controllers/chat.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const chatController = new chat_controller_1.ChatController();
router.get('/history', auth_middleware_1.authMiddleware, chatController.getHistory);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map