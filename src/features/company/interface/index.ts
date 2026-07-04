import { MessageType } from "../type";

export interface ChatMessage {
  id: string;
  from: 'me' | 'them';
  type: MessageType;
  text?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  emoji?: string;
  time: string;
}

export interface Contact {
  id: string; from: string; avatar: string; color: string;
  preview: string; time: string; read: boolean;
  online?: boolean; lastSeen?: string;
}