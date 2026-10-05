"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.success = success;
exports.error = error;
function success(message, data) {
    return { success: true, message, data };
}
function error(message, errors) {
    return { success: false, message, errors };
}
//# sourceMappingURL=respons.js.map