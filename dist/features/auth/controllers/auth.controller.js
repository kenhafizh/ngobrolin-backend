"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const auth_validation_1 = require("../validations/auth.validation");
const respons_1 = require("../../../utils/respons");
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            const validation = (0, auth_validation_1.validateRegister)(req.body);
            if (!validation.valid) {
                res.status(400).json((0, respons_1.error)(validation.error));
                return;
            }
            try {
                const result = await this.authService.register(validation.data);
                res.status(201).json((0, respons_1.success)('Registrasi berhasil', result));
            }
            catch (err) {
                res.status(409).json((0, respons_1.error)(err.message));
            }
        };
        this.login = async (req, res) => {
            const validation = (0, auth_validation_1.validateLogin)(req.body);
            if (!validation.valid) {
                res.status(400).json((0, respons_1.error)(validation.error));
                return;
            }
            try {
                const result = await this.authService.login(validation.data);
                res.json((0, respons_1.success)('Login berhasil', result));
            }
            catch (err) {
                res.status(401).json((0, respons_1.error)(err.message));
            }
        };
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map