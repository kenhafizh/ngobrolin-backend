"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = require("./app");
const logger_1 = require("./utils/logger");
const { server } = (0, app_1.createApp)();
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    logger_1.logger.info(`Server running on http://localhost:${PORT}`);
    logger_1.logger.info(`Socket.io ready`);
});
//# sourceMappingURL=server.js.map