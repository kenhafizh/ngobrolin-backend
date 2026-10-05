"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
exports.notFoundHandler = notFoundHandler;
const respons_1 = require("../utils/respons");
const logger_1 = require("../utils/logger");
function errorHandler(err, _req, res, _next) {
    logger_1.logger.error('Unhandled error', { message: err.message, stack: err.stack });
    res.status(500).json((0, respons_1.error)('Internal server error'));
}
function notFoundHandler(_req, res) {
    res.status(404).json((0, respons_1.error)('Endpoint tidak ditemukan'));
}
//# sourceMappingURL=errorHandler.js.map