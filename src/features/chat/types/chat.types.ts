export interface MessageData {
  id: string;
  from: string;
  to?: string;
  message: string;
  timestamp: string;
}

export interface SendMessageRequest {
  to?: string;
  message: string;
}

export interface OnlineUserData {
  id: string;
  username: string;
}
