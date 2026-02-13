// 메시지 역할
export type MessageRole = 'user' | 'assistant';

// 참고 문서 소스
export interface Source {
  guide_id: number;
  type: string; // 'faq' | 'manual' | 'script' | 'rule'
  title: string;
  content?: string;
  score: number;
}

// 개별 메시지
export interface AgentMessage {
  id: string;
  role: MessageRole;
  content: string;
  sources?: Source[];
  createdAt: Date;
}

// 대화 (Conversation)
export interface Conversation {
  id: string;
  title: string;
  messages: AgentMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// 예시 질문 카드
export interface SuggestionCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  prompt: string;
}

// 저장소 데이터 (deprecated - localStorage용)
export interface StorageData {
  conversations: Conversation[];
  currentConversationId: string | null;
  version: number;
}

// 서버 세션 타입
export interface AdviceSession {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

// 서버 메시지 타입
export interface AdviceMessage {
  id: number;
  session_id: number;
  role: MessageRole;
  content: string;
  sources_json?: Source[];
  created_at: string;
}

// 서버 세션 상세 (메시지 포함)
export interface AdviceSessionWithMessages extends AdviceSession {
  messages: AdviceMessage[];
}

// advice API 요청 타입
export interface AdviceRequest {
  session_id?: number | null;
  message: string;
}

// advice API 응답 타입
export interface AdviceResponse {
  session_id: number;
  response: string;
  sources: Source[];
}
