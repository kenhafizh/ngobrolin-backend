"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../features/auth/auth.routes"));
const chat_routes_1 = __importDefault(require("../features/chat/chat.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/chat', chat_routes_1.default);
router.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'Service is healthy',
        data: {
            status: 'ok',
            timestamp: new Date().toISOString(),
        },
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map