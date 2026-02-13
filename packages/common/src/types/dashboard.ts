import type { MsgProvider } from '../types/chat';

export interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down';
  isPositive?: boolean; // 변화가 긍정적인지 (색상 결정)
  icon: React.ReactNode;
  onClick?: () => void;
}

export interface DetailSection {
  id: string;
  title: string;
  description: string;
}

// Provider 정보 (이름 + 색상)
export const PROVIDER_INFO: Record<MsgProvider, { name: string; color: string }> = {
  'N': { name: '네이버 라인', color: 'bg-green-500' },
  'K': { name: '카카오톡', color: 'bg-yellow-500' },
  '@': { name: '기타', color: 'bg-gray-500' },
  'W': { name: '위챗', color: 'bg-green-600' },
  'A': { name: '왓츠앱', color: 'bg-teal-500' },
  'T': { name: '텔레그램', color: 'bg-blue-500' },
  'I': { name: '인스타그램', color: 'bg-pink-500' },
};

export interface ChannelConsultStat {
  provider: MsgProvider;
  consultCount: number;
}

export interface PeriodStats {
  today: number;
  thisWeek: number;
  thisMonth: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export type ChartType = 'daily' | 'weekly' | 'monthly';

export interface FirstResponseStats {
  overall: { avgResponseMinutes: number };
  byPeriod: PeriodStats;
  chartDaily: any[];
  chartWeekly: any[];
  chartMonthly: any[];
}

export interface AvgResponseIntervalStats {
  overall: { avgIntervalMinutes: number };
  byPeriod: PeriodStats;
  chartDaily: any[];
  chartWeekly: any[];
  chartMonthly: any[];
}

export interface AvgConsultDurationStats {
  overall: { avgDurationMinutes: number };
  byPeriod: PeriodStats;
  chartDaily: any[];
  chartWeekly: any[];
  chartMonthly: any[];
}

export interface AvgMessageCountStats {
  overall: { avgMessageCount: number };
  byPeriod: PeriodStats;
  chartDaily: any[];
  chartWeekly: any[];
  chartMonthly: any[];
}

export interface WeekdayConsultStats {
  // 요일별 상담량 (1: 일요일 ~ 7: 토요일, MySQL DAYOFWEEK 기준)
  thisWeek: { dayOfWeek: number; consultCount: number }[];
  thisMonth: { dayOfWeek: number; consultCount: number }[];
  last3Months: { dayOfWeek: number; consultCount: number }[];
}

export interface HourlyConsultStats {
  // 시간대별 상담량 (0~23시)
  thisWeek: { hour: number; consultCount: number }[];
  thisMonth: { hour: number; consultCount: number }[];
  last3Months: { hour: number; consultCount: number }[];
}

import { ReactNode } from 'react';

// 차트 ID 타입
export type ChartId =
  | 'channel-consults'
  | 'first-response-time'
  | 'avg-response-interval'
  | 'avg-consult-duration'
  | 'avg-message-count'
  | 'weekday-consults'
  | 'hourly-consults';

// 기본 차트 순서
export const DEFAULT_CHART_ORDER: ChartId[] = [
  'channel-consults',
  'first-response-time',
  'avg-response-interval',
  'avg-consult-duration',
  'avg-message-count',
  'weekday-consults',
  'hourly-consults',
];

// 요약 바 통계 아이템
export interface SummaryStat {
  id: ChartId;
  title: string;
  shortTitle: string;
  value: string;
  change?: string | null;
  changeType?: 'up' | 'down' | null;
  isPositive?: boolean | null;
  icon: ReactNode;
}

// 요일별/시간대별 기간 타입
export type PeriodType = 'thisWeek' | 'thisMonth' | 'last3Months';

// 차트 데이터 포인트
export interface ChartDataPoint {
  label: string;
  value: number;
}

// 차트 설정
export interface ChartConfig {
  id: ChartId;
  title: string;
  description: string;
}

// 차트 설정 맵
export const CHART_CONFIGS: Record<ChartId, Omit<ChartConfig, 'id'>> = {
  'channel-consults': {
    title: '채널별 상담 수',
    description: '카카오톡, 네이버, 라인 등 각 메신저 채널별 상담 유입 건수를 나타냅니다.',
  },
  'first-response-time': {
    title: '최초 응답 시간',
    description: '고객이 최초 메시지를 보낸 후 상담사가 첫 응답을 보내기까지 걸린 평균 시간입니다.',
  },
  'avg-response-interval': {
    title: '평균 응답 간격',
    description: '상담 중 고객 메시지와 상담사 응답 사이의 평균 시간 간격입니다.',
  },
  'avg-consult-duration': {
    title: '평균 상담 소요 시간',
    description: '상담 시작부터 종료까지 걸린 평균 시간입니다.',
  },
  'avg-message-count': {
    title: '평균 상담 메시지 수',
    description: '종료된 상담에서 상담원이 응답한 평균 횟수입니다.',
  },
  'weekday-consults': {
    title: '요일별 상담량',
    description: '월요일부터 일요일까지 요일별 상담 건수 분포를 나타냅니다.',
  },
  'hourly-consults': {
    title: '시간대별 상담량',
    description: '0시부터 23시까지 시간대별 상담 건수 분포를 나타냅니다.',
  },
};

// 요일명 변환 (MySQL DAYOFWEEK: 1=일, 2=월, ..., 7=토)
export const WEEKDAY_NAMES: Record<number, string> = {
  1: '일', 2: '월', 3: '화', 4: '수', 5: '목', 6: '금', 7: '토'
};
