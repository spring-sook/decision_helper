import { MsgProvider } from '@repo/common';

export type Gender = 'M' | 'F' | null;
export type SmsConsent = 'Y' | 'N' | null;
export type MarketingConsent = 'Y' | 'N' | null;

export interface CustomerExtended {
  id: number;
  name: string;
  extUserId: string;
  msgChannelId: number;
  provider?: MsgProvider;

  // 확장 정보 (방문 고객만 있음)
  phone?: string | null;
  birthDate?: string | null; // YYYY-MM-DD
  gender?: Gender;
  smsConsent?: SmsConsent; // 문자 수신 동의
  marketingConsent?: MarketingConsent; // 마케팅 수신 동의

  // 방문 정보
  visitedAt?: string | null; // 첫 방문일
  lastVisitAt?: string | null; // 마지막 방문일
  visitCount?: number; // 방문 횟수

  // 메모
  memo?: string | null;

  createdAt: string;
  updatedAt: string;
}

export interface CustomerFilters {
  search: string; // 이름, 전화번호, 생년월일 검색
  gender: Gender | 'all';
  ageRange: 'all' | '10s' | '20s' | '30s' | '40s' | '50s' | '60+';
  smsConsent: SmsConsent | 'all';
  marketingConsent: MarketingConsent | 'all';
  visitStatus: 'all' | 'visited' | 'not_visited';
}

export const DEFAULT_FILTERS: CustomerFilters = {
  search: '',
  gender: 'all',
  ageRange: 'all',
  smsConsent: 'all',
  marketingConsent: 'all',
  visitStatus: 'all',
};

// 나이 계산
export const calculateAge = (birthDate: string | null | undefined): number | null => {
  if (!birthDate) return null;
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// 나이대 확인
export const getAgeRange = (birthDate: string | null | undefined): string | null => {
  const age = calculateAge(birthDate);
  if (age === null) return null;
  if (age < 20) return '10s';
  if (age < 30) return '20s';
  if (age < 40) return '30s';
  if (age < 50) return '40s';
  if (age < 60) return '50s';
  return '60+';
};
