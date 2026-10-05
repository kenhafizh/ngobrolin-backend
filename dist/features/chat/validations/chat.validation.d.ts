import { SendMessageRequest } from '../types/chat.types';
export declare function validateMessage(body: unknown): {
    valid: true;
    data: SendMessageRequest;
} | {
    valid: false;
    error: string;
};
//# sourceMappingURL=chat.validation.d.ts.map