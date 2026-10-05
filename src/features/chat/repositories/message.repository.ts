import { MessageData } from '../types/chat.types';

const MAX_PUBLIC_MESSAGES = 50;
const MAX_PRIVATE_MESSAGES = 100;

class MessageRepository {
  private publicMessages: MessageData[] = [];
  private privateMessages: Map<string, MessageData[]> = new Map();

  savePublic(message: MessageData): void {
    this.publicMessages.push(message);
    if (this.publicMessages.length > MAX_PUBLIC_MESSAGES) {
      this.publicMessages.shift();
    }
  }

  savePrivate(message: MessageData): void {
    const recipient = message.to!;

    if (!this.privateMessages.has(recipient)) {
      this.privateMessages.set(recipient, []);
    }
    this.privateMessages.get(recipient)!.push(message);
    if (this.privateMessages.get(recipient)!.length > MAX_PRIVATE_MESSAGES) {
      this.privateMessages.get(recipient)!.shift();
    }

    if (!this.privateMessages.has(message.from)) {
      this.privateMessages.set(message.from, []);
    }
    this.privateMessages.get(message.from)!.push(message);
    if (this.privateMessages.get(message.from)!.length > MAX_PRIVATE_MESSAGES) {
      this.privateMessages.get(message.from)!.shift();
    }
  }

  getPublicMessages(): MessageData[] {
    return this.publicMessages;
  }

  getPrivateMessages(username: string): MessageData[] {
    return this.privateMessages.get(username) || [];
  }
}

export const messageRepository = new MessageRepository();
