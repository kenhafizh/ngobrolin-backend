"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jwt_1 = require("../utils/jwt");
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ success: false, message: 'Token tidak ditemukan' });
        return;
    }
    const token = authHeader.split(' ')[1];
    const decoded = (0, jwt_1.verifyToken)(token);
    if (!decoded) {
        res.status(401).json({ success: false, message: 'Token tidak valid' });
        return;
    }
    req.user = decoded;
    next();
}
//# sourceMappingURL=auth.middleware.js.map