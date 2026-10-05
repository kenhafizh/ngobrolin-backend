"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../../utils/jwt");
const user_repository_1 = require("../repositories/user.repository");
const logger_1 = require("../../../utils/logger");
const SALT_ROUNDS = 10;
class AuthService {
    async register(data) {
        const existingUsername = await user_repository_1.userRepository.findByUsername(data.username);
        if (existingUsername) {
            throw new Error('Username sudah digunakan');
        }
        const existingEmail = await user_repository_1.userRepository.findByEmail(data.email);
        if (existingEmail) {
            throw new Error('Email sudah digunakan');
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, SALT_ROUNDS);
        const now = new Date().toISOString();
        const user = await user_repository_1.userRepository.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            displayName: data.displayName || data.username,
            createdAt: now,
            updatedAt: now,
        });
        logger_1.logger.info('User registered', { uid: user.uid, username: user.username });
        return {
            uid: user.uid,
            username: user.username,
            email: user.email,
            displayName: user.displayName,
            createdAt: user.createdAt,
        };
    }
    async login(data) {
        const user = await user_repository_1.userRepository.findByUsername(data.username);
        if (!user) {
            throw new Error('Username atau password salah');
        }
        const isPasswordValid = await bcrypt_1.default.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Username atau password salah');
        }
        const token = (0, jwt_1.signToken)({ username: user.username });
        return { token, username: user.username };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map