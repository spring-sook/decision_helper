// 관제탑 대시보드 타입 정의

/** 상단 현황 카드 스냅샷 */
export interface ControlTowerSnapshot {
  waitingCount: number;    // 대기중 (status='Q', is_closed='N')
  consultingCount: number; // 상담중 (status='C', is_closed='N')
  unreadCount: number;     // 미응답 건수
}

/** 대기열 항목 */
export interface QueueItem {
  customerId: number;
  customerName: string;
  provider: string;
  waitingSince: string;      // 대기 시작 시각 (ISO)
  waitingMinutes: number;    // 대기 시간(분)
  lastMessage: string | null; // 마지막 메시지 미리보기
}

/** 상담원 현황 항목 */
export interface CounselorStatusItem {
  userId: number;
  userName: string;
  currentCustomers: { customerId: number; customerName: string }[];
}

/** 활동 피드 이벤트 타입 */
export type ActivityEventType =
  | 'counselor_joined'
  | 'counselor_left'
  | 'new_message'
  | 'send_failed'
  | 'consult_started'
  | 'consult_ended';

/** 활동 피드 이벤트 */
export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  timestamp: string;
  counselorName?: string;
  customerName?: string;
  customerId?: number;
  message?: string;
}

/** 알림 카테고리 */
export type AlertCategory = 'long_waiting' | 'send_failed' | 'no_response';

/** 알림/경고 항목 */
export interface AlertItem {
  id: string;
  category: AlertCategory;
  customerId: number;
  customerName: string;
  message: string;
  value?: number; // 대기시간(분) 등
  createdAt: string;
}

/** 상담원 퍼포먼스 항목 */
export interface CounselorPerformance {
  userId: number;
  userName: string;
  todayCompleted: number;      // 오늘 종료한 상담 건수
  avgResponseMinutes: number;  // 오늘 평균 응답 시간(분)
}

/** 개선 인사이트 심각도 */
export type InsightSeverity = 'info' | 'warning' | 'critical';

/** 개선 인사이트 항목 */
export interface InsightItem {
  id: string;
  severity: InsightSeverity;
  message: string;
  detail?: string;
}

/** 추이 데이터 포인트 */
export interface TrendDataPoint {
  label: string;   // e.g., "9시", "02/04"
  value: number;
}

/** 문의량 추이 (오늘 vs 어제 vs 지난주 평균) */
export interface ConsultTrend {
  today: number;
  yesterday: number;
  lastWeekAvg: number;
  todayHourly: TrendDataPoint[];
  yesterdayHourly: TrendDataPoint[];
  lastWeekAvgHourly: TrendDataPoint[];
}

/** 전환율 데이터 (상담 → 예약) */
export interface ConversionData {
  todayRate: number;
  todayConverted: number;
  todayTotal: number;
  yesterdayRate: number;
  lastWeekRate: number;
  dailyRates: TrendDataPoint[];         // 최근 7일
  lastWeekDailyRates: TrendDataPoint[]; // 지난주 같은 요일 7일
}

/** 조치 필요 요약 (상담신청 + 미응답 합산) */
export interface ActionRequiredSummary {
  waitingCount: number;
  noResponseCount: number;
  totalActionRequired: number;
}

/** 전 직원 정보 */
export interface StaffMember {
  userId: number;
  userName: string;
  isConnected: boolean;
  currentCustomers: { customerId: number; customerName: string }[];
  todayRooms: number;
  todayMessages: number;
  avgResponseMinutes: number;
  todayConverted: number;
}

/** 상담원이 보낸 개별 메시지 */
export interface CounselorHistoryEntry {
  customerName: string;
  messageTime: string;
  content: string;
}

/** 상담원 일일 요약 */
export interface CounselorDailySummary {
  date: string;
  totalConsults: number;
  completedConsults: number;
  avgResponseMinutes: number;
  totalMessages: number;
  conversions: number;
  hourlyActivity: TrendDataPoint[];
  history: CounselorHistoryEntry[];
}

/** API 초기 로드 응답 */
export interface ControlTowerInitData {
  snapshot: ControlTowerSnapshot;
  queue: QueueItem[];
  alerts: AlertItem[];
  customerNames: Record<number, string>;
  counselorPerformance: CounselorPerformance[];
  insights: InsightItem[];
  actionRequired: ActionRequiredSummary;
  consultTrend: ConsultTrend;
  conversionData: ConversionData;
  allStaff: StaffMember[];
}
