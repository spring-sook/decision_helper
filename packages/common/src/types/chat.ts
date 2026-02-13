import { RoomDisplayClassification } from "./classification";


// 메시지 채널 (msg_channels)
export type MsgProvider = 'K' | 'N' | 'W' | 'A' | 'T' | 'I' | '@'; // K: Kakao, N: Naver, W: Wechat, A: WhatsApp, T: Telegram, I: Instagram, @: Test Provider

export interface MsgChannel {
  id: number;
  provider: MsgProvider;
  channelId: string;       // channel_id
  configJson: unknown | null; // config_json
  isActive: 'Y' | 'N';
  createdAt: string;       // DATETIME -> ISO string 등
  updatedAt: string;       // DATETIME
}

// 고객 (customers)
export interface Customer {
  id: number;
  name: string;
  extUserId: string;   // ext_user_id
  msgChannelId: number; // msg_channel_id
  updatedAt: string;
  createdAt: string;
}

// 채팅 메시지 (customer_chat_messages)
export type ChatDirection = 'C' | 'A' | 'B';   // C: 고객, A: 상담사, B: Bot
export type ChatMessageType = 'T' | 'I' | 'V' | 'F' | 'S'; // T: Text, I: Image, V: Video, F: File, S: Sticker
export type ChatSendStatus = 'P' | 'S' | 'D' | 'F'; // P: Pending, ...

export interface ChatMessage {
  id: number;
  extUserId: string;
  roomId: number | null;
  customerId: number;      // customer_id
  direction: ChatDirection;
  messageType: ChatMessageType;
  language: string | null;  // ko: 한국어, en: 영어, ja: 일본어, zh: 중국어
  text: string;
  translatedText: string | null;
  fileUrl: string | null;  // file_url
  fileName: string | null; // file_name
  fileSize: number | null; // file_size
  senderId: number | null;
  senderName?: string | null;
  sendStatus: ChatSendStatus;
  sendErrorMessage: string | null;
  deleteYn: 'Y' | 'N';
  createdAt: string;
  updatedAt: string;
}

export interface ChatRooms {
  id: number;
  status: 'Q' | 'C' | 'R' | 'V';
  summary: string | null;
  isClosed: 'Y' | 'N';
  closedBy: number;
  createdAt: Date;
  updatedAt: Date;
  provider?: string;
  translateYn?: 'Y' | 'N';
  botActiveYn?: 'Y' | 'N';
}

export interface ChatMessageDto {
  messages: ChatMessage[];
  rooms: ChatRooms[];
}


export interface CustomerChatSummary {
  lastRoomId: number | null;
  customerId: number;
  customerName: string;
  lastMessageId: number;
  lastMessageType: ChatMessageType;
  lastMessage: string | null;
  lastTimestamp: Date | null;
  provider: MsgProvider;
  unreadCount: number;
  status: 'Q' | 'C' | 'R' | 'V';
  isClosed: 'Y' | 'N';
  summary: string;
  displayClassifications?: RoomDisplayClassification;
}

export interface ActiveCounselor {
  userId: number;
  userName: string;
}

export interface ChatRecommendation {
  id: number;
  roomId: number;
  customerId: number;
  triggerMsgId: number;
  recommendationText: string;
  displayOrder: number;
  usedYn: 'Y' | 'N';
  createdAt: string;
}