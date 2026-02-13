// 대분류 그룹 (고정: 1=감정/상태, 2=문의유형)
export type CategoryGroupId = 1 | 2;  // 1: 감정/상태, 2: 문의유형

export interface ClassificationCategoryGroup {
  id: CategoryGroupId;
  name: string;  // "감정/상태" | "문의유형"
  description: string | null;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

// 분류 카테고리
export interface ClassificationCategory {
  id: number;
  groupId: CategoryGroupId;
  groupName?: string;
  name: string;
  description: string | null;
  color: string;
  priority: number;  // 대분류 내 우선순위
  isDefault: 'Y' | 'N';
  isActive: 'Y' | 'N';
  createdAt: string;
  updatedAt: string;
}

// 카테고리 + 키워드 포함
export interface ClassificationCategoryWithKeywords extends ClassificationCategory {
  keywords: string[];
}

// 분류 키워드
export interface ClassificationKeyword {
  id: number;
  categoryId: number;
  keyword: string;
  createdAt: string;
}

// 분류 결과
export type ClassificationSource = 'RULE' | 'AI' | 'MANUAL';

export interface ChatRoomClassification {
  id: number;
  roomId: number;
  categoryId: number;
  groupId: CategoryGroupId;
  groupName: string;
  categoryName: string;
  color: string;
  confidence: number;
  reason: string | null;
  source: ClassificationSource;
  createdAt: string;
  updatedAt: string;
}

// 채팅방 표시용 분류 (대분류별 1개씩, 최대 2개)
export interface RoomDisplayClassification {
  emotion: ChatRoomClassification | null;  // 감정/상태 태그 (groupId=1)
  inquiry: ChatRoomClassification | null;  // 문의유형 태그 (groupId=2)
}

// API 응답
export interface RoomClassificationResponse {
  roomId: number;
  allClassifications: ChatRoomClassification[];  // 감지된 모든 분류
  displayClassifications: RoomDisplayClassification;  // 표시용 (대분류별 1개씩)
  updatedAt: string;
}

// 카테고리 생성/수정 요청
export interface ClassificationCategoryRequest {
  groupId: CategoryGroupId;
  name: string;
  description?: string;
  color: string;
  priority?: number;
  keywords?: string[];
}

// 카테고리 수정 요청
export interface ClassificationCategoryUpdateRequest {
  name?: string;
  description?: string;
  color?: string;
  priority?: number;
  isActive?: 'Y' | 'N';
}

// 키워드 수정 요청
export interface ClassificationKeywordsUpdateRequest {
  keywords: string[];
}

// 수동 보정 요청
export interface ClassificationManualUpdateRequest {
  categoryIds: number[];  // 설정할 카테고리 ID 배열
}

// 분류 현황 요약
export interface ClassificationSummary {
  categoryId: number;
  categoryName: string;
  groupId: CategoryGroupId;
  groupName: string;
  color: string;
  count: number;
}

// Socket.IO 이벤트 페이로드
export interface ClassificationUpdatePayload {
  roomId: number;
  displayClassifications: RoomDisplayClassification;
}

// 그룹별 카테고리 목록
export interface CategoriesByGroup {
  group: ClassificationCategoryGroup;
  categories: ClassificationCategoryWithKeywords[];
}
