import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type DailyMetric = Database["public"]["Tables"]["daily_metrics"]["Row"];
export type Finding = Database["public"]["Tables"]["findings"]["Row"];
export type AgenticDecision =
  Database["public"]["Tables"]["agentic_decisions"]["Row"];
export type Nudge = Database["public"]["Tables"]["nudges"]["Row"];
export type NudgeUpdate = Database["public"]["Tables"]["nudges"]["Update"];
export type ParentBriefing =
  Database["public"]["Tables"]["parent_briefings"]["Row"];
export type ParentBriefingUpdate =
  Database["public"]["Tables"]["parent_briefings"]["Update"];
export type Escalation = Database["public"]["Tables"]["escalations"]["Row"];
export type EscalationUpdate =
  Database["public"]["Tables"]["escalations"]["Update"];
export type Child = Database["public"]["Tables"]["children"]["Row"];

// ============================================================================
// HELPER FUNCTIONS - Daily Metrics
// ============================================================================

export async function getDailyMetrics(
  childId: string,
  days: number = 7,
): Promise<DailyMetric[]> {
  const { data, error } = await supabase
    .from("daily_metrics")
    .select("*")
    .eq("child_id", childId)
    .order("date", { ascending: false })
    .limit(days);

  if (error) {
    console.error("Error fetching daily metrics:", error);
    return [];
  }
  return (data as DailyMetric[]) || [];
}

export async function getWeeklyMetricsSummary(childId: string) {
  const metrics = await getDailyMetrics(childId, 7);

  if (!metrics.length) return null;

  const avgSleep =
    metrics.reduce((sum, m) => sum + (m.sleep_hours || 0), 0) / metrics.length;
  const avgScreenTime =
    metrics.reduce((sum, m) => sum + (m.screen_time_minutes || 0), 0) /
    metrics.length;
  const avgActivity =
    metrics.reduce((sum, m) => sum + (m.physical_activity_minutes || 0), 0) /
    metrics.length;
  const avgRoutine =
    metrics.reduce((sum, m) => sum + (m.routine_consistency_score || 0), 0) /
    metrics.length;
  const avgCheckin =
    metrics.reduce((sum, m) => sum + (m.checkin_completion || 0), 0) /
    metrics.length;
  const bedtimeCompliance =
    metrics.filter((m) => m.bedtime_target_met).length / metrics.length;

  return {
    avgSleep,
    avgScreenTime,
    avgActivity,
    avgRoutine,
    avgCheckin,
    bedtimeCompliance,
    metrics,
  };
}

// ============================================================================
// HELPER FUNCTIONS - Findings
// ============================================================================

export async function getRecentFindings(
  childId: string,
  limit: number = 10,
): Promise<Finding[]> {
  const { data, error } = await supabase
    .from("findings")
    .select("*")
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching findings:", error);
    return [];
  }
  return (data as Finding[]) || [];
}

// ============================================================================
// HELPER FUNCTIONS - Agentic Decisions
// ============================================================================

export async function getRecentDecisions(
  childId: string,
  limit: number = 10,
): Promise<AgenticDecision[]> {
  const { data, error } = await supabase
    .from("agentic_decisions")
    .select(
      `
      *,
      findings(*),
      nudges(*),
      parent_briefings(*),
      escalations(*)
    `,
    )
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching decisions:", error);
    return [];
  }
  return (data as AgenticDecision[]) || [];
}

export async function getDecisionStats(childId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from("agentic_decisions")
    .select("plan, created_at")
    .eq("child_id", childId)
    .gte("created_at", startDate.toISOString());

  if (error) {
    console.error("Error fetching decision stats:", error);
    return { hold: 0, nudge: 0, brief: 0, escalate: 0 };
  }

  const stats = { hold: 0, nudge: 0, brief: 0, escalate: 0 };
  const rows =
    (data as Array<{ plan?: string; created_at?: string }> | []) || [];
  rows.forEach((d) => {
    if (d.plan === "HOLD") stats.hold++;
    else if (d.plan === "NUDGE_CHILD") stats.nudge++;
    else if (d.plan === "BRIEF_PARENT") stats.brief++;
    else if (d.plan === "ESCALATE") stats.escalate++;
  });

  return stats;
}

// ============================================================================
// HELPER FUNCTIONS - Nudges
// ============================================================================

export async function getPendingNudges(childId: string) {
  const { data, error } = await supabase
    .from("nudges")
    .select("*")
    .eq("child_id", childId)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching pending nudges:", error);
    return [];
  }
  return data || [];
}

export async function getRecentNudges(childId: string, limit: number = 5) {
  const { data, error } = await supabase
    .from("nudges")
    .select("*")
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent nudges:", error);
    return [];
  }
  return data || [];
}

export async function updateNudgeStatus(
  nudgeId: string,
  status: "shown" | "completed" | "snoozed" | "dismissed",
) {
  const updateData: NudgeUpdate = { status };

  if (status === "shown") {
    updateData.shown_at = new Date().toISOString();
  } else if (status === "completed") {
    updateData.completed_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from("nudges")
    // @ts-expect-error - Supabase types inference issue with update
    .update(updateData)
    .eq("id", nudgeId);

  if (error) {
    console.error("Error updating nudge status:", error);
    return false;
  }
  return true;
}

// ============================================================================
// HELPER FUNCTIONS - Parent Briefings
// ============================================================================

export async function getUnreadBriefings(childId: string) {
  const { data, error } = await supabase
    .from("parent_briefings")
    .select("*")
    .eq("child_id", childId)
    .eq("read", false)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching unread briefings:", error);
    return [];
  }
  return data || [];
}

export async function getRecentBriefings(childId: string, limit: number = 5) {
  const { data, error } = await supabase
    .from("parent_briefings")
    .select("*")
    .eq("child_id", childId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching recent briefings:", error);
    return [];
  }
  return data || [];
}

export async function markBriefingAsRead(briefingId: string) {
  const updateData: ParentBriefingUpdate = {
    read: true,
    read_at: new Date().toISOString(),
  };
  const { error } = await supabase
    .from("parent_briefings")
    // @ts-expect-error - Supabase types inference issue with update
    .update(updateData)
    .eq("id", briefingId);

  if (error) {
    console.error("Error marking briefing as read:", error);
    return false;
  }
  return true;
}

// ============================================================================
// HELPER FUNCTIONS - Escalations
// ============================================================================

export async function getPendingEscalations(
  level?: "parent_only" | "counselor" | "professional",
) {
  let query = supabase
    .from("escalations")
    .select(
      `
      *,
      children(name, nickname, age)
    `,
    )
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (level) {
    query = query.eq("level", level);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching pending escalations:", error);
    return [];
  }
  return (data as Escalation[]) || [];
}

export async function acknowledgeEscalation(
  escalationId: string,
  acknowledgedBy: string,
) {
  const updateData: EscalationUpdate = {
    status: "acknowledged",
    acknowledged_by: acknowledgedBy,
    acknowledged_at: new Date().toISOString(),
  };
  const { error } = await supabase
    .from("escalations")
    // @ts-expect-error - Supabase types inference issue with update
    .update(updateData)
    .eq("id", escalationId);

  if (error) {
    console.error("Error acknowledging escalation:", error);
    return false;
  }
  return true;
}

// ============================================================================
// HELPER FUNCTIONS - Children
// ============================================================================

export async function getChild(childId: string) {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .eq("id", childId)
    .single();

  if (error) {
    console.error("Error fetching child:", error);
    return null;
  }
  return (data as Child) || null;
}

export async function getAllChildren(): Promise<Child[]> {
  const { data, error } = await supabase
    .from("children")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching children:", error);
    return [];
  }
  return (data as Child[]) || [];
}

// ============================================================================
// HELPER FUNCTIONS - Dashboard Summary
// ============================================================================

export async function getParentDashboardData(childId: string) {
  const [
    child,
    weeklyMetrics,
    recentDecisions,
    recentNudges,
    recentBriefings,
    recentFindings,
    decisionStats,
  ] = await Promise.all([
    getChild(childId),
    getWeeklyMetricsSummary(childId),
    getRecentDecisions(childId, 5),
    getRecentNudges(childId, 5),
    getRecentBriefings(childId, 3),
    getRecentFindings(childId, 5),
    getDecisionStats(childId, 30),
  ]);

  return {
    child,
    weeklyMetrics,
    recentDecisions,
    recentNudges,
    recentBriefings,
    recentFindings,
    decisionStats,
  };
}

export async function getCounselorDashboardData() {
  const [allChildren, pendingEscalations] = await Promise.all([
    getAllChildren(),
    getPendingEscalations(),
  ]);

  // Get recent findings for all children
  const childrenWithFindings = await Promise.all(
    allChildren.map(async (child) => {
      const findings = await getRecentFindings(child.id, 3);
      const metrics = await getWeeklyMetricsSummary(child.id);
      return { ...child, recentFindings: findings, weeklyMetrics: metrics };
    }),
  );

  return {
    children: childrenWithFindings,
    pendingEscalations,
  };
}

export async function getProfessionalDashboardData() {
  const [pendingEscalations] = await Promise.all([
    getPendingEscalations("professional"),
  ]);

  // Get detailed data for escalated children
  const escalationsWithDetails = await Promise.all(
    pendingEscalations.map(async (escalation) => {
      const decisions = await getRecentDecisions(escalation.child_id, 10);
      const metrics = await getDailyMetrics(escalation.child_id, 30);
      return { ...escalation, recentDecisions: decisions, metrics };
    }),
  );

  return {
    escalations: escalationsWithDetails,
    totalPending: pendingEscalations.length,
  };
}
