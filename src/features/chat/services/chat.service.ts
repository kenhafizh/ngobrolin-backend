import { MessageData } from '../types/chat.types';
import { messageRepository } from '../repositories/message.repository';

export class ChatService {
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  sendPublicMessage(from: string, messageText: string): MessageData {
    const msg: MessageData = {
      id: this.generateId(),
      from,
      message: messageText,
      timestamp: new Date().toISOString(),
    };
    messageRepository.savePublic(msg);
    return msg;
  }

  sendPrivateMessage(from: string, to: string, messageText: string): MessageData {
    const msg: MessageData = {
      id: this.generateId(),
      from,
      to,
      message: messageText,
      timestamp: new Date().toISOString(),
    };
    messageRepository.savePrivate(msg);
    return msg;
  }

  getPublicHistory(): MessageData[] {
    return messageRepository.getPublicMessages();
  }

  getPrivateHistory(username: string): MessageData[] {
    return messageRepository.getPrivateMessages(username);
  }
}
