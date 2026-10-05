"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = validateLogin;
exports.validateRegister = validateRegister;
function validateLogin(body) {
    if (!body || typeof body !== 'object') {
        return { valid: false, error: 'Body harus berupa object' };
    }
    const { username, password } = body;
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return { valid: false, error: 'Username wajib diisi' };
    }
    if (!password || typeof password !== 'string' || password.trim() === '') {
        return { valid: false, error: 'Password wajib diisi' };
    }
    return { valid: true, data: { username: username.trim(), password: password } };
}
function validateRegister(body) {
    if (!body || typeof body !== 'object') {
        return { valid: false, error: 'Body harus berupa object' };
    }
    const { username, email, password, displayName } = body;
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return { valid: false, error: 'Username wajib diisi' };
    }
    if (username.trim().length < 3) {
        return { valid: false, error: 'Username minimal 3 karakter' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username.trim())) {
        return { valid: false, error: 'Username hanya boleh huruf, angka, dan underscore' };
    }
    if (!email || typeof email !== 'string' || email.trim() === '') {
        return { valid: false, error: 'Email wajib diisi' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
        return { valid: false, error: 'Format email tidak valid' };
    }
    if (!password || typeof password !== 'string') {
        return { valid: false, error: 'Password wajib diisi' };
    }
    if (password.length < 6) {
        return { valid: false, error: 'Password minimal 6 karakter' };
    }
    return {
        valid: true,
        data: {
            username: username.trim(),
            email: email.trim().toLowerCase(),
            password: password,
            displayName: displayName && typeof displayName === 'string' ? displayName.trim() : undefined,
        },
    };
}
//# sourceMappingURL=auth.validation.js.map