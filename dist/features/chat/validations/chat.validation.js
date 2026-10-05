"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMessage = validateMessage;
function validateMessage(body) {
    if (!body || typeof body !== 'object') {
        return { valid: false, error: 'Body harus berupa object' };
    }
    const { message, to } = body;
    if (!message || typeof message !== 'string' || message.trim() === '') {
        return { valid: false, error: 'Message wajib diisi' };
    }
    return {
        valid: true,
        data: {
            message: message.trim(),
            to: to && typeof to === 'string' ? to.trim() : undefined,
        },
    };
}
//# sourceMappingURL=chat.validation.js.map