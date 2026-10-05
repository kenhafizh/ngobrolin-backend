import { Request, Response } from 'express';
import { ChatService } from '../services/chat.service';
import { success } from '../../../utils/respons';

export class ChatController {
  private chatService: ChatService;

  constructor() {
    this.chatService = new ChatService();
  }

  getHistory = (_req: Request, res: Response): void => {
    const messages = this.chatService.getPublicHistory();
    res.json(success('History retrieved', messages));
  };
}
