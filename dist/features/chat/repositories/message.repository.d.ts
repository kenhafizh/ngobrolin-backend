import { MessageData } from '../types/chat.types';
declare class MessageRepository {
    private publicMessages;
    private privateMessages;
    savePublic(message: MessageData): void;
    savePrivate(message: MessageData): void;
    getPublicMessages(): MessageData[];
    getPrivateMessages(username: string): MessageData[];
}
export declare const messageRepository: MessageRepository;
export {};
//# sourceMappingURL=message.repository.d.ts.map