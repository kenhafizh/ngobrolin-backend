import { SendMessageRequest } from '../types/chat.types';

export function validateMessage(body: unknown): { valid: true; data: SendMessageRequest } | { valid: false; error: string } {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: 'Body harus berupa object' };
  }

  const { message, to } = body as Record<string, unknown>;

  if (!message || typeof message !== 'string' || message.trim() === '') {
    return { valid: false, error: 'Message wajib diisi' };
  }

  return {
    valid: true,
    data: {
      message: message.trim(),
      to: to && typeof to === 'string' ? to.trim() : undefined,
    },
  };
}
