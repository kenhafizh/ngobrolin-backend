"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
function log(level, message, meta) {
    const timestamp = new Date().toISOString();
    const logEntry = {
        timestamp,
        level,
        message,
        ...(meta ? { meta } : {}),
    };
    console.log(JSON.stringify(logEntry));
}
exports.logger = {
    info: (msg, meta) => log('info', msg, meta),
    warn: (msg, meta) => log('warn', msg, meta),
    error: (msg, meta) => log('error', msg, meta),
    debug: (msg, meta) => log('debug', msg, meta),
};
//# sourceMappingURL=logger.js.map