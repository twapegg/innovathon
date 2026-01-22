// Role types
export type UserRole = 'parent' | 'counselor' | 'professional';

// Parent Dashboard Types
export interface Child {
  id: string;
  name: string;
  age: number;
  nickname: string;
}

export interface WeeklyTrend {
  day: string;
  sleep: number;
  activity: number;
  mood: number;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  category: 'routine' | 'activity' | 'social' | 'rest';
}

export interface ParentNotification {
  id: string;
  type: 'insight' | 'suggestion' | 'positive' | 'alert';
  message: string;
  timestamp: Date;
  read: boolean;
}

// Counselor Dashboard Types
export interface Student {
  id: string;
  name: string;
  nickname: string;
  riskLevel: 'stable' | 'improving' | 'needs-attention';
  lastCheck: Date;
  engagement: number;
  notes: string;
}

export interface ClassOverview {
  totalStudents: number;
  stableCount: number;
  improvingCount: number;
  needsAttentionCount: number;
  averageEngagement: number;
}

// Professional Dashboard Types
export interface CaseNotes {
  id: string;
  date: Date;
  content: string;
  sessionType: 'initial' | 'follow-up' | 'crisis' | 'check-in';
}

export interface SessionHistory {
  id: string;
  date: Date;
  duration: number;
  focus: string;
  outcome: string;
}

export interface LongTermTrend {
  month: string;
  wellbeingScore: number;
  engagementScore: number;
  resilienceScore: number;
}

export interface Insight {
  id: string;
  category: string;
  observation: string;
  timeframe: string;
}

// Gamification Types
export interface WellbeingStreak {
  currentStreak: number;
  longestStreak: number;
  daysTracked: number;
  checkInPoints: number;
}

export interface VirtualPet {
  name: string;
  type: 'plant' | 'butterfly' | 'cloud';
  healthLevel: number;
  lastInteraction: Date;
}

export interface WellbeingPoints {
  total: number;
  thisWeek: number;
  activities: {
    name: string;
    points: number;
    date: Date;
  }[];
}
