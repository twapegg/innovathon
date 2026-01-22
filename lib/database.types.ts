export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      children: {
        Row: {
          id: string;
          name: string;
          nickname: string | null;
          age: number | null;
          parent_id: string | null;
          theme: "pet_care" | "adventure" | "garden" | "space" | "cozy";
          pet_name: string;
          character_name: string;
          garden_name: string;
          preferred_categories: string[];
          school_opt_in: boolean;
          pro_opt_in: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          nickname?: string | null;
          age?: number | null;
          parent_id?: string | null;
          theme?: "pet_care" | "adventure" | "garden" | "space" | "cozy";
          pet_name?: string;
          character_name?: string;
          garden_name?: string;
          preferred_categories?: string[];
          school_opt_in?: boolean;
          pro_opt_in?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          nickname?: string | null;
          age?: number | null;
          parent_id?: string | null;
          theme?: "pet_care" | "adventure" | "garden" | "space" | "cozy";
          pet_name?: string;
          character_name?: string;
          garden_name?: string;
          preferred_categories?: string[];
          school_opt_in?: boolean;
          pro_opt_in?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      daily_metrics: {
        Row: {
          id: string;
          child_id: string | null;
          date: string;
          screen_time_minutes: number;
          social_media_minutes: number;
          games_minutes: number;
          entertainment_minutes: number;
          education_minutes: number;
          productivity_minutes: number;
          other_minutes: number;
          device_pickups: number;
          notifications_received: number;
          first_pickup_time: string;
          late_night_screen_minutes: number;
          bedtime_target_met: boolean;
          sleep_hours: number;
          routine_consistency_score: number;
          checkin_completion: number;
          physical_activity_minutes: number;
          outdoor_time_minutes: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id?: string | null;
          date: string;
          screen_time_minutes?: number;
          social_media_minutes?: number;
          games_minutes?: number;
          entertainment_minutes?: number;
          education_minutes?: number;
          productivity_minutes?: number;
          other_minutes?: number;
          device_pickups?: number;
          notifications_received?: number;
          first_pickup_time?: string;
          late_night_screen_minutes?: number;
          bedtime_target_met?: boolean;
          sleep_hours?: number;
          routine_consistency_score?: number;
          checkin_completion?: number;
          physical_activity_minutes?: number;
          outdoor_time_minutes?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string | null;
          date?: string;
          screen_time_minutes?: number;
          social_media_minutes?: number;
          games_minutes?: number;
          entertainment_minutes?: number;
          education_minutes?: number;
          productivity_minutes?: number;
          other_minutes?: number;
          device_pickups?: number;
          notifications_received?: number;
          first_pickup_time?: string;
          late_night_screen_minutes?: number;
          bedtime_target_met?: boolean;
          sleep_hours?: number;
          routine_consistency_score?: number;
          checkin_completion?: number;
          physical_activity_minutes?: number;
          outdoor_time_minutes?: number;
          created_at?: string;
        };
      };
      findings: {
        Row: {
          id: string;
          child_id: string | null;
          decision_id: string | null;
          finding_id: string;
          title: string;
          evidence: Json;
          severity: "low" | "medium" | "high" | null;
          confidence: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id?: string | null;
          decision_id?: string | null;
          finding_id: string;
          title: string;
          evidence?: Json;
          severity?: "low" | "medium" | "high" | null;
          confidence?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string | null;
          decision_id?: string | null;
          finding_id?: string;
          title?: string;
          evidence?: Json;
          severity?: "low" | "medium" | "high" | null;
          confidence?: number;
          created_at?: string;
        };
      };
      agentic_decisions: {
        Row: {
          id: string;
          child_id: string | null;
          plan: "HOLD" | "NUDGE_CHILD" | "BRIEF_PARENT" | "ESCALATE";
          rationale: string | null;
          why_not_stronger: string | null;
          signal_summary: string | null;
          planner_confidence: number;
          safety_approved: boolean;
          safety_violations: string[] | null;
          created_at: string;
          processed_at: string | null;
          outcome:
            | "child_engaged"
            | "ignored"
            | "parent_acknowledged"
            | "pending"
            | null;
          outcome_recorded_at: string | null;
        };
        Insert: {
          id?: string;
          child_id?: string | null;
          plan: "HOLD" | "NUDGE_CHILD" | "BRIEF_PARENT" | "ESCALATE";
          rationale?: string | null;
          why_not_stronger?: string | null;
          signal_summary?: string | null;
          planner_confidence?: number;
          safety_approved?: boolean;
          safety_violations?: string[] | null;
          created_at?: string;
          processed_at?: string | null;
          outcome?:
            | "child_engaged"
            | "ignored"
            | "parent_acknowledged"
            | "pending"
            | null;
          outcome_recorded_at?: string | null;
        };
        Update: {
          id?: string;
          child_id?: string | null;
          plan?: "HOLD" | "NUDGE_CHILD" | "BRIEF_PARENT" | "ESCALATE";
          rationale?: string | null;
          why_not_stronger?: string | null;
          signal_summary?: string | null;
          planner_confidence?: number;
          safety_approved?: boolean;
          safety_violations?: string[] | null;
          created_at?: string;
          processed_at?: string | null;
          outcome?:
            | "child_engaged"
            | "ignored"
            | "parent_acknowledged"
            | "pending"
            | null;
          outcome_recorded_at?: string | null;
        };
      };
      nudges: {
        Row: {
          id: string;
          decision_id: string | null;
          child_id: string | null;
          title: string;
          text: string;
          category:
            | "movement"
            | "routine_reset"
            | "hydration"
            | "sunlight"
            | "breathing"
            | "social_checkin"
            | "focus_break"
            | null;
          why_shown: string | null;
          opt_out_hint: string;
          quest_title: string | null;
          quest_steps: string[] | null;
          quest_duration_minutes: number;
          status: "pending" | "shown" | "completed" | "snoozed" | "dismissed";
          shown_at: string | null;
          completed_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          decision_id?: string | null;
          child_id?: string | null;
          title: string;
          text: string;
          category?:
            | "movement"
            | "routine_reset"
            | "hydration"
            | "sunlight"
            | "breathing"
            | "social_checkin"
            | "focus_break"
            | null;
          why_shown?: string | null;
          opt_out_hint?: string;
          quest_title?: string | null;
          quest_steps?: string[] | null;
          quest_duration_minutes?: number;
          status?: "pending" | "shown" | "completed" | "snoozed" | "dismissed";
          shown_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          decision_id?: string | null;
          child_id?: string | null;
          title?: string;
          text?: string;
          category?:
            | "movement"
            | "routine_reset"
            | "hydration"
            | "sunlight"
            | "breathing"
            | "social_checkin"
            | "focus_break"
            | null;
          why_shown?: string | null;
          opt_out_hint?: string;
          quest_title?: string | null;
          quest_steps?: string[] | null;
          quest_duration_minutes?: number;
          status?: "pending" | "shown" | "completed" | "snoozed" | "dismissed";
          shown_at?: string | null;
          completed_at?: string | null;
          created_at?: string;
        };
      };
      parent_briefings: {
        Row: {
          id: string;
          decision_id: string | null;
          child_id: string | null;
          weekly_summary: string | null;
          top_changes: string[] | null;
          suggested_actions: string[] | null;
          suggested_activities: string[] | null;
          conversation_starter: string | null;
          why_now: string | null;
          read: boolean;
          read_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          decision_id?: string | null;
          child_id?: string | null;
          weekly_summary?: string | null;
          top_changes?: string[] | null;
          suggested_actions?: string[] | null;
          suggested_activities?: string[] | null;
          conversation_starter?: string | null;
          why_now?: string | null;
          read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          decision_id?: string | null;
          child_id?: string | null;
          weekly_summary?: string | null;
          top_changes?: string[] | null;
          suggested_actions?: string[] | null;
          suggested_activities?: string[] | null;
          conversation_starter?: string | null;
          why_now?: string | null;
          read?: boolean;
          read_at?: string | null;
          created_at?: string;
        };
      };
      escalations: {
        Row: {
          id: string;
          decision_id: string | null;
          child_id: string;
          level: "parent_only" | "counselor" | "professional" | null;
          reason: string | null;
          recommended_next_step: string | null;
          requires_parent_ack: boolean;
          status: "pending" | "acknowledged" | "actioned" | "resolved";
          acknowledged_by: string | null;
          acknowledged_at: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          decision_id?: string | null;
          child_id: string;
          level?: "parent_only" | "counselor" | "professional" | null;
          reason?: string | null;
          recommended_next_step?: string | null;
          requires_parent_ack?: boolean;
          status?: "pending" | "acknowledged" | "actioned" | "resolved";
          acknowledged_by?: string | null;
          acknowledged_at?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          decision_id?: string | null;
          child_id?: string;
          level?: "parent_only" | "counselor" | "professional" | null;
          reason?: string | null;
          recommended_next_step?: string | null;
          requires_parent_ack?: boolean;
          status?: "pending" | "acknowledged" | "actioned" | "resolved";
          acknowledged_by?: string | null;
          acknowledged_at?: string | null;
          created_at?: string;
        };
      };
      action_history: {
        Row: {
          id: string;
          child_id: string | null;
          decision_id: string | null;
          date: string;
          plan_taken: string;
          findings_at_time: string[] | null;
          outcome: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          child_id?: string | null;
          decision_id?: string | null;
          date: string;
          plan_taken: string;
          findings_at_time?: string[] | null;
          outcome?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          child_id?: string | null;
          decision_id?: string | null;
          date?: string;
          plan_taken?: string;
          findings_at_time?: string[] | null;
          outcome?: string | null;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
