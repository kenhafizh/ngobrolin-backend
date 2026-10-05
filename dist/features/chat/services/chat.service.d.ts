import { MessageData } from '../types/chat.types';
export declare class ChatService {
    private generateId;
    sendPublicMessage(from: string, messageText: string): MessageData;
    sendPrivateMessage(from: string, to: string, messageText: string): MessageData;
    getPublicHistory(): MessageData[];
    getPrivateHistory(username: string): MessageData[];
}
//# sourceMappingURL=chat.service.d.ts.map