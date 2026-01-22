// Role types
export type UserRole = "parent" | "counselor" | "professional";

// Theme types (from agentic system)
export type Theme = "pet_care" | "adventure" | "garden" | "space" | "cozy";

// Nudge category types (from agentic system)
export type NudgeCategory =
  | "movement"
  | "routine_reset"
  | "hydration"
  | "sunlight"
  | "breathing"
  | "social_checkin"
  | "focus_break";

// Decision plan types (from agentic system)
export type DecisionPlan = "HOLD" | "NUDGE_CHILD" | "BRIEF_PARENT" | "ESCALATE";

// Severity levels (from agentic system)
export type Severity = "low" | "medium" | "high";

// Escalation levels
export type EscalationLevel = "parent_only" | "counselor" | "professional";

// Behavioral Finding (from Signal Interpreter Agent)
export interface BehavioralFinding {
  id: string;
  finding_id: string;
  title: string;
  evidence: {
    baseline_value: number;
    recent_value: number;
    days_affected: number;
    metric_name: string;
  };
  severity: Severity;
  confidence: number;
  created_at: string;
}

// Parent Dashboard Types
export interface Child {
  id: string;
  name: string;
  age: number;
  nickname: string;
  theme?: Theme;
  pet_name?: string;
  character_name?: string;
  garden_name?: string;
  preferred_categories?: NudgeCategory[];
  school_opt_in?: boolean;
  pro_opt_in?: boolean;
}

// Daily Metrics (from device integrations - inspired by Apple Screen Time / Google Family Link)
export interface DailyMetric {
  id: string;
  date: string;
  // Screen time
  screen_time_minutes: number;
  social_media_minutes: number;
  games_minutes: number;
  entertainment_minutes: number;
  education_minutes: number;
  productivity_minutes: number;
  // Device patterns
  device_pickups: number;
  first_pickup_time: string;
  // Sleep & routine
  late_night_screen_minutes: number;
  bedtime_target_met: boolean;
  sleep_hours: number;
  routine_consistency_score: number;
  checkin_completion: number;
  // Physical wellness
  physical_activity_minutes: number;
  outdoor_time_minutes: number;
  // Mood indicators
  moodIndicators?: {
    social: number;
    sleep: number;
    emotional: number;
  };
}

// Behavioral Finding (from Signal Interpreter Agent)
export interface BehavioralFinding {
  id: string;
  finding_id: string;
  title: string;
  evidence: {
    baseline_value: number;
    recent_value: number;
    days_affected: number;
    metric_name: string;
  };
  severity: Severity;
  confidence: number;
  created_at: string;
}

// Agentic Decision (from Planner Agent)
export interface AgenticDecision {
  id: string;
  childId: string;
  decision: "escalate" | "brief_parent" | "nudge_youth" | "hold";
  reasoning: string;
  confidenceScore: number;
  triggerFindingIds: string[];
  createdAt: string;
}

// Youth Nudge (from Youth Nudge Composer Agent)
export interface YouthNudge {
  id: string;
  title: string;
  text: string;
  category: NudgeCategory;
  why_shown: string;
  opt_out_hint: string;
  quest_title?: string;
  quest_steps?: string[];
  quest_duration_minutes: number;
  status: "pending" | "shown" | "completed" | "snoozed" | "dismissed";
  created_at: string;
}

// Parent Briefing (from Parent Briefing Agent)
export interface ParentBriefing {
  id: string;
  weekly_summary: string;
  top_changes: string[];
  suggested_actions: string[];
  suggested_activities: string[];
  conversation_starter: string;
  why_now: string;
  read: boolean;
  created_at: string;
}

// Escalation (from Escalation Gatekeeper Agent)
export interface Escalation {
  id: string;
  child_id: string;
  level: EscalationLevel;
  reason: string;
  recommended_next_step: string;
  requires_parent_ack: boolean;
  status: "pending" | "acknowledged" | "actioned" | "resolved";
  created_at: string;
  child?: Child;
  // Additional properties for professional dashboard
  severity?: "high" | "medium" | "low";
  escalatedAt?: string;
  headline?: string;
  detailedSummary?: string;
  triggerFindings?: string[];
  recommendedNextSteps?: string[];
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

// Decision Stats (for dashboard overview)
export interface DecisionStats {
  hold: number;
  nudge: number;
  brief: number;
  escalate: number;
}

// Weekly Metrics Summary
export interface WeeklyMetricsSummary {
  avgSleep: number;
  avgScreenTime: number;
  avgActivity: number;
  avgRoutine: number;
  avgCheckin: number;
  bedtimeCompliance: number;
  metrics: DailyMetric[];
}

export interface WeeklyTrend {
  day: string;
  date: string;
  sleep: number;
  activity: number;
  screenTime: number;
  routine: number;
  mood?: number;
}

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  category: "routine" | "activity" | "social" | "rest";
}

export interface ParentNotification {
  id: string;
  type: "insight" | "suggestion" | "positive" | "alert";
  message: string;
  timestamp: Date;
  read: boolean;
}

// Counselor Dashboard Types
export interface Student {
  id: string;
  name: string;
  nickname: string;
  riskLevel: "stable" | "improving" | "needs-attention";
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
  sessionType: "initial" | "follow-up" | "crisis" | "check-in";
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
  type: "plant" | "butterfly" | "cloud";
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
