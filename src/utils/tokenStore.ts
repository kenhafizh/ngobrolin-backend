class TokenStore {
  private tokens: Map<string, { username: string; expiresAt: number }> = new Map();

  set(tokenId: string, data: { username: string }, ttlMs: number): void {
    this.tokens.set(tokenId, {
      ...data,
      expiresAt: Date.now() + ttlMs,
    });
  }

  get(tokenId: string): { username: string } | null {
    const entry = this.tokens.get(tokenId);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.tokens.delete(tokenId);
      return null;
    }
    return { username: entry.username };
  }

  delete(tokenId: string): void {
    this.tokens.delete(tokenId);
  }
}

export const tokenStore = new TokenStore();
