"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestContext = requestContext;
function requestContext(req, _res, next) {
    req.headers['x-request-id'] = req.headers['x-request-id'] || crypto.randomUUID();
    next();
}
//# sourceMappingURL=requestContext.js.map