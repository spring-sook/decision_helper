// 채팅 가이드 타입 정의

export interface ChatGuide {
  id: number;
  type: 'basic_rule' | 'faq' | 'script' | 'manual';
  title: string;
  content: string;
  category: string;
  order_num: number;
  is_active: 'Y' | 'N';
  metadata_json?: any;
  created_by?: number;
  updated_by?: number;
  created_at?: string | Date;
  updated_at?: string | Date;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  order_num?: number;
}

export interface ScriptItem {
  id: number;
  title: string;
  script: string;
  category: string;
  order_num?: number;
}

export interface CreateChatGuideRequest {
  type: 'basic_rule' | 'faq' | 'script' | 'manual';
  title: string;
  content: string;
  category?: string;
  order_num?: number;
  metadata_json?: any;
}

export interface UpdateChatGuideRequest {
  title?: string;
  content?: string;
  category?: string;
  order_num?: number;
  metadata_json?: any;
}

export interface CreateFAQRequest {
  title: string;
  content: string;
  category: string;
  order_num?: number;
}

export interface UpdateFAQRequest {
  title?: string;
  content?: string;
  category?: string;
  order_num?: number;
}

export interface ChatGuideResponse {
  id: number;
  message: string;
}
