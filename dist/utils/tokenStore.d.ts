declare class TokenStore {
    private tokens;
    set(tokenId: string, data: {
        username: string;
    }, ttlMs: number): void;
    get(tokenId: string): {
        username: string;
    } | null;
    delete(tokenId: string): void;
}
export declare const tokenStore: TokenStore;
export {};
//# sourceMappingURL=tokenStore.d.ts.map