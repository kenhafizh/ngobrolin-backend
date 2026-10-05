"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenStore = void 0;
class TokenStore {
    constructor() {
        this.tokens = new Map();
    }
    set(tokenId, data, ttlMs) {
        this.tokens.set(tokenId, {
            ...data,
            expiresAt: Date.now() + ttlMs,
        });
    }
    get(tokenId) {
        const entry = this.tokens.get(tokenId);
        if (!entry)
            return null;
        if (Date.now() > entry.expiresAt) {
            this.tokens.delete(tokenId);
            return null;
        }
        return { username: entry.username };
    }
    delete(tokenId) {
        this.tokens.delete(tokenId);
    }
}
exports.tokenStore = new TokenStore();
//# sourceMappingURL=tokenStore.js.map