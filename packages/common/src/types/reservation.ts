// 직원
export interface Staff {
  id: number;
  name: string;
  color: string;
}

// 예약
export interface Reservation {
  id: number;
  customerId: number;
  customerName: string;
  staffId: number;
  startTime: string; // ISO 8601 형식
  endTime: string;
  serviceType: string;
  memo: string;
  notifiedConfirmed: boolean;
  notifiedDayBefore: boolean;
  notifiedDayOf: boolean;
}

// 예약 생성/수정 폼 데이터
export interface ReservationFormData {
  customerId: number | null;
  customerName: string;
  staffId: number | null;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  serviceType: string;
  memo: string;
  notifiedConfirmed: boolean;
  notifiedDayBefore: boolean;
  notifiedDayOf: boolean;
}

// 날짜별 예약 건수
export interface DailyReservationCount {
  date: string; // YYYY-MM-DD
  count: number;
}

// 시간 단위 타입
export type TimeUnit = 15 | 30 | 60;

// 뷰 그룹 타입 (직원별 / 서비스 종류별)
export type ViewGroupType = 'staff' | 'serviceType';

// 뷰 기간 타입 (일별 / 주별)
export type ViewPeriodType = 'daily' | 'weekly';

// 서비스 종류
export interface ServiceType {
  id: number;
  name: string;
  color: string;
}

// 고객 (검색용)
export interface Customer_Sample {
  id: number;
  name: string;
  extUserId: string;
  phone: string;
  birthDate: string; // YYYY-MM-DD
}

// 드래그 선택 상태
export interface DragSelection {
  staffId: number; // 직원별 뷰에서만 유효, 그 외에는 0
  colIndex: number; // 컬럼 인덱스
  startRow: number;
  endRow: number;
}
