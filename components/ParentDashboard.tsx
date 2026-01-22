"use client";

import React, { useEffect, useState } from "react";
import {
  Target,
  Lightbulb,
  MessageSquare,
  Gamepad2,
  Activity,
  Wind,
  Sun,
  Droplets,
  HandMetal,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  StatCard,
  Card,
  InsightPanel,
  GamificationWidget,
} from "./SharedComponents";
import { TrendChart } from "./Charts";
import { COLORS } from "./SharedComponents";
import type {
  Child,
  WeeklyMetricsSummary,
  BehavioralFinding,
  YouthNudge,
  ParentBriefing,
  DecisionStats,
  DailyMetric,
} from "@/lib/types";

// Mock data fallback for when database isn't connected
const mockData = {
  child: {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Alex Thompson",
    nickname: "Alex",
    age: 14,
    theme: "adventure" as const,
    character_name: "StarKnight",
    pet_name: "Luna",
  },
  weeklyMetrics: {
    avgSleep: 6.83,
    avgScreenTime: 175.7,
    avgActivity: 37.1,
    avgRoutine: 0.75,
    avgCheckin: 0.76,
    bedtimeCompliance: 0.43,
    metrics: [
      {
        date: "2026-01-17",
        sleep_hours: 7.8,
        physical_activity_minutes: 45,
        screen_time_minutes: 165,
        routine_consistency_score: 0.85,
        social_media_minutes: 35,
        games_minutes: 40,
        entertainment_minutes: 35,
        education_minutes: 40,
      },
      {
        date: "2026-01-18",
        sleep_hours: 6.5,
        physical_activity_minutes: 30,
        screen_time_minutes: 180,
        routine_consistency_score: 0.72,
        social_media_minutes: 45,
        games_minutes: 35,
        entertainment_minutes: 40,
        education_minutes: 45,
      },
      {
        date: "2026-01-19",
        sleep_hours: 6.2,
        physical_activity_minutes: 25,
        screen_time_minutes: 195,
        routine_consistency_score: 0.68,
        social_media_minutes: 50,
        games_minutes: 45,
        entertainment_minutes: 35,
        education_minutes: 50,
      },
      {
        date: "2026-01-20",
        sleep_hours: 5.8,
        physical_activity_minutes: 20,
        screen_time_minutes: 210,
        routine_consistency_score: 0.6,
        social_media_minutes: 55,
        games_minutes: 50,
        entertainment_minutes: 40,
        education_minutes: 45,
      },
      {
        date: "2026-01-21",
        sleep_hours: 6.8,
        physical_activity_minutes: 35,
        screen_time_minutes: 185,
        routine_consistency_score: 0.7,
        social_media_minutes: 48,
        games_minutes: 42,
        entertainment_minutes: 38,
        education_minutes: 42,
      },
      {
        date: "2026-01-22",
        sleep_hours: 7.5,
        physical_activity_minutes: 50,
        screen_time_minutes: 155,
        routine_consistency_score: 0.82,
        social_media_minutes: 35,
        games_minutes: 38,
        entertainment_minutes: 32,
        education_minutes: 40,
      },
      {
        date: "2026-01-23",
        sleep_hours: 8.2,
        physical_activity_minutes: 55,
        screen_time_minutes: 140,
        routine_consistency_score: 0.88,
        social_media_minutes: 30,
        games_minutes: 35,
        entertainment_minutes: 28,
        education_minutes: 38,
      },
    ] as DailyMetric[],
  } as WeeklyMetricsSummary,
  recentFindings: [
    {
      id: "1",
      finding_id: "sleep_rhythm_shift",
      title: "Rest Rhythm Shifted",
      severity: "medium" as const,
      confidence: 0.82,
      evidence: {
        baseline_value: 7.8,
        recent_value: 6.1,
        days_affected: 3,
        metric_name: "sleep_hours",
      },
      created_at: "2026-01-23",
    },
    {
      id: "2",
      finding_id: "evening_energy_pattern",
      title: "Evening Wind-Down Changed",
      severity: "medium" as const,
      confidence: 0.75,
      evidence: {
        baseline_value: 12,
        recent_value: 35,
        days_affected: 4,
        metric_name: "late_night_screen_minutes",
      },
      created_at: "2026-01-23",
    },
  ] as BehavioralFinding[],
  recentNudges: [
    {
      id: "1",
      title: "Training Grounds Await, StarKnight!",
      text: "A true hero never neglects their physical training! Your strength stats need a boost.",
      category: "movement" as const,
      status: "pending" as const,
      why_shown: "Energy reserves focused on screen battles",
      opt_out_hint: "You can snooze this anytime",
      quest_title: "Hero Training Session",
      quest_steps: [
        "Stand and shake out limbs",
        "5 shoulder rolls",
        "Scout from window",
      ],
      quest_duration_minutes: 5,
      created_at: "2026-01-23",
    },
  ] as YouthNudge[],
  recentBriefings: [
    {
      id: "1",
      weekly_summary:
        "Alex had a variable week with some evening routine shifts mid-week, but has been bouncing back nicely over the last couple of days.",
      top_changes: [
        "Rest rhythm shifted mid-week (5.8-6.2 hours vs usual 7.5+)",
        "Evening wind-down time increased but improving",
      ],
      suggested_actions: [
        "Consider a gentle check-in about how the week felt",
        "Maybe suggest winding down screens a bit earlier together",
      ],
      suggested_activities: [
        "Take a 15-minute walk together after dinner",
        "Have a tech-free game night with board games",
        "Cook their favorite meal together this weekend",
      ],
      conversation_starter:
        "Hey, how's your week been? Anything interesting happen?",
      why_now:
        "Mid-week showed some pattern shifts that are now recovering. Good time for a light touch base.",
      read: false,
      created_at: "2026-01-23",
    },
  ] as ParentBriefing[],
  decisionStats: { hold: 12, nudge: 5, brief: 2, escalate: 0 } as DecisionStats,
};

interface DashboardData {
  child: Child | null;
  weeklyMetrics: WeeklyMetricsSummary | null;
  recentNudges: YouthNudge[];
  recentBriefings: ParentBriefing[];
  recentFindings: BehavioralFinding[];
  decisionStats: DecisionStats;
}

export const ParentDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard?role=parent");
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch {
        console.log("Using mock data - Supabase not configured");
        setUseMockData(true);
        setData(mockData as unknown as DashboardData);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-6 md:p-10 flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading dashboard...</div>
      </div>
    );
  }

  const child = data?.child || mockData.child;
  const weeklyMetrics = data?.weeklyMetrics || mockData.weeklyMetrics;
  const recentFindings = data?.recentFindings || mockData.recentFindings;
  const recentNudges = data?.recentNudges || mockData.recentNudges;
  const recentBriefings = data?.recentBriefings || mockData.recentBriefings;
  const decisionStats = data?.decisionStats || mockData.decisionStats;

  // Calculate trends from metrics
  const metrics = weeklyMetrics?.metrics || [];
  const weeklyTrends = metrics
    .map((m) => {
      const date = new Date(m.date);
      const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      return {
        day: dayNames[date.getDay()],
        date: m.date,
        sleep: m.sleep_hours,
        activity: m.physical_activity_minutes,
        screenTime: m.screen_time_minutes,
        routine: Math.round((m.routine_consistency_score || 0) * 100),
      };
    })
    .reverse();

  // Calculate screen time breakdown
  const totalScreenTime = metrics.reduce(
    (sum, m) => sum + (m.screen_time_minutes || 0),
    0,
  );
  const screenTimeBreakdown = [
    {
      name: "Social",
      value: metrics.reduce((sum, m) => sum + (m.social_media_minutes || 0), 0),
      color: "#f472b6",
    },
    {
      name: "Games",
      value: metrics.reduce((sum, m) => sum + (m.games_minutes || 0), 0),
      color: "#818cf8",
    },
    {
      name: "Entertainment",
      value: metrics.reduce(
        (sum, m) => sum + (m.entertainment_minutes || 0),
        0,
      ),
      color: "#fb923c",
    },
    {
      name: "Education",
      value: metrics.reduce((sum, m) => sum + (m.education_minutes || 0), 0),
      color: "#34d399",
    },
  ];

  // Calculate week-over-week trends
  const avgSleepTrend = weeklyMetrics
    ? Math.round(((weeklyMetrics.avgSleep - 7.5) / 7.5) * 100)
    : 0;
  const avgActivityTrend = weeklyMetrics
    ? Math.round(((weeklyMetrics.avgActivity - 40) / 40) * 100)
    : 0;
  const routineTrend = weeklyMetrics
    ? Math.round(((weeklyMetrics.avgRoutine - 0.85) / 0.85) * 100)
    : 0;

  // Generate insights from findings
  const insights = recentFindings.map((f) => ({
    category: f.title,
    observation: `${f.evidence?.metric_name || "Metric"} changed from ${f.evidence?.baseline_value} to ${f.evidence?.recent_value} over ${f.evidence?.days_affected} days. Confidence: ${Math.round(f.confidence * 100)}%`,
    timeframe: "This week",
  }));

  insights.push({
    category: "Recovery Pattern",
    observation:
      "The last couple of days show improvement in sleep and routine. This is a positive sign of natural self-correction.",
    timeframe: "Recent",
  });

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Welcome back!
            </h1>
            <p className="text-gray-500 text-base">
              Here&apos;s how {child.nickname || child.name} has been doing this
              week
            </p>
          </div>
          {useMockData && (
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
              Demo Mode
            </span>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Sleep per night"
          value={`${weeklyMetrics?.avgSleep?.toFixed(1) || "7.0"} hrs`}
          trend={avgSleepTrend}
        />
        <StatCard
          label="Activity level"
          value={`${Math.round(weeklyMetrics?.avgActivity || 35)} min`}
          trend={avgActivityTrend}
          color={COLORS.secondaryAccent}
        />
        <StatCard
          label="Routine score"
          value={`${Math.round((weeklyMetrics?.avgRoutine || 0.75) * 100)}%`}
          trend={routineTrend}
          color={COLORS.accentWarm}
        />
        <StatCard
          label="Bedtime compliance"
          value={`${Math.round((weeklyMetrics?.bedtimeCompliance || 0.5) * 100)}%`}
          trend={
            weeklyMetrics?.bedtimeCompliance &&
            weeklyMetrics.bedtimeCompliance >= 0.85
              ? 5
              : -10
          }
          color={COLORS.primary}
        />
      </div>

      {/* AI Support Activity */}
      {recentFindings.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-black text-gray-800 mb-5">
            🤖 AI Support Activity
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="📊 What We Noticed">
              <div className="space-y-4">
                {recentFindings.slice(0, 3).map((finding, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                          finding.severity === "high"
                            ? "bg-orange-100 text-orange-700"
                            : finding.severity === "medium"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {finding.severity}
                      </span>
                      <h4 className="font-semibold text-gray-800 text-sm">
                        {finding.title}
                      </h4>
                    </div>
                    <p className="text-xs text-gray-600">
                      {finding.evidence?.metric_name}:{" "}
                      {finding.evidence?.baseline_value} →{" "}
                      {finding.evidence?.recent_value}
                      {finding.evidence?.days_affected &&
                        ` (${finding.evidence.days_affected} days)`}
                    </p>
                    <div className="mt-2 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                        style={{ width: `${finding.confidence * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {Math.round(finding.confidence * 100)}% confidence
                    </p>
                  </div>
                ))}
              </div>
            </Card>
            <Card
              title="Decision Stats (30 days)"
              icon={<Target className="w-5 h-5 text-blue-500" />}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50">
                  <p className="text-3xl font-bold text-emerald-700">
                    {decisionStats.hold}
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">
                    Hold (No Action)
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50">
                  <p className="text-3xl font-bold text-blue-700">
                    {decisionStats.nudge}
                  </p>
                  <p className="text-xs text-blue-600 mt-1">Child Nudges</p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50">
                  <p className="text-3xl font-bold text-purple-700">
                    {decisionStats.brief}
                  </p>
                  <p className="text-xs text-purple-600 mt-1">
                    Parent Briefings
                  </p>
                </div>
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50">
                  <p className="text-3xl font-bold text-orange-700">
                    {decisionStats.escalate}
                  </p>
                  <p className="text-xs text-orange-600 mt-1">Escalations</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                AI prioritizes minimal intervention while staying supportive
              </p>
            </Card>
          </div>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        <div className="lg:col-span-2">
          <TrendChart
            title="📊 Weekly Patterns"
            data={weeklyTrends}
            lines={[
              { key: "sleep", name: "Sleep (hrs)", color: COLORS.primary },
              {
                key: "activity",
                name: "Activity (min)",
                color: COLORS.secondaryAccent,
              },
              { key: "routine", name: "Routine %", color: COLORS.accentWarm },
            ]}
          />
        </div>

        <Card title="📱 Screen Time Breakdown">
          <div className="space-y-4">
            {screenTimeBreakdown.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700">{item.name}</span>
                  <span className="text-gray-500">
                    {Math.round(item.value / 7)} min/day
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(item.value / totalScreenTime) * 100}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
            <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-100">
              Average: {Math.round(totalScreenTime / 7)} min/day
            </p>
          </div>
        </Card>
      </div>

      {/* Latest Briefing */}
      {recentBriefings.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-black text-gray-800 mb-5">
            📬 Latest Briefing
          </h2>
          <Card
            className={
              recentBriefings[0].read ? "opacity-75" : "ring-2 ring-blue-200"
            }
          >
            <div className="space-y-6">
              <div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {recentBriefings[0].weekly_summary}
                </p>
                {!recentBriefings[0].read && (
                  <span className="inline-block mt-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-3">
                    📌 What Changed
                  </h4>
                  <ul className="space-y-2">
                    {recentBriefings[0].top_changes?.map((change, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 flex items-start gap-2"
                      >
                        <span className="text-gray-400 mt-1">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" /> Suggested
                    Actions
                  </h4>
                  <ul className="space-y-2">
                    {recentBriefings[0].suggested_actions?.map(
                      (action, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-gray-600 flex items-start gap-2"
                        >
                          <span className="text-emerald-500 mt-1">→</span>
                          {action}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                <h4 className="font-semibold text-amber-800 text-sm mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" /> Conversation Starter
                </h4>
                <p className="text-sm text-amber-700 italic">
                  &quot;{recentBriefings[0].conversation_starter}&quot;
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 text-sm mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-blue-500" /> Fun Activities to
                  Try Together
                </h4>
                <div className="flex flex-wrap gap-2">
                  {recentBriefings[0].suggested_activities?.map(
                    (activity, idx) => (
                      <span
                        key={idx}
                        className="text-sm bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 px-3 py-2 rounded-xl border border-blue-100"
                      >
                        {activity}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Active Nudges */}
      {recentNudges.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-black text-gray-800 mb-5 flex items-center gap-3">
            <Gamepad2 className="w-6 h-6 text-purple-500" /> {child.nickname}
            &apos;s Current Quest
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentNudges.slice(0, 2).map((nudge, idx) => {
              const getCategoryIcon = () => {
                switch (nudge.category) {
                  case "movement":
                    return <Activity className="w-8 h-8 text-green-500" />;
                  case "breathing":
                    return <Wind className="w-8 h-8 text-blue-400" />;
                  case "sunlight":
                    return <Sun className="w-8 h-8 text-yellow-500" />;
                  case "hydration":
                    return <Droplets className="w-8 h-8 text-blue-500" />;
                  case "social_checkin":
                    return <HandMetal className="w-8 h-8 text-purple-500" />;
                  case "routine_reset":
                    return <Clock className="w-8 h-8 text-amber-500" />;
                  default:
                    return <Target className="w-8 h-8 text-blue-500" />;
                }
              };

              return (
                <Card key={idx}>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{getCategoryIcon()}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">
                        {nudge.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">{nudge.text}</p>

                      {nudge.quest_title && (
                        <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                          <p className="font-semibold text-sm text-purple-800 mb-2">
                            {nudge.quest_title}
                          </p>
                          <ul className="space-y-1">
                            {nudge.quest_steps?.map((step, sIdx) => (
                              <li
                                key={sIdx}
                                className="text-xs text-gray-600 flex items-center gap-2"
                              >
                                <span className="w-4 h-4 rounded-full bg-purple-200 text-purple-700 flex items-center justify-center text-[10px]">
                                  {sIdx + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ul>
                          <p className="text-xs text-gray-400 mt-2">
                            ⏱️ {nudge.quest_duration_minutes} minutes
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-3">
                        <span
                          className={`text-xs font-semibold px-2 py-1 rounded-full ${
                            nudge.status === "completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : nudge.status === "pending"
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {nudge.status}
                        </span>
                        <span className="text-xs text-gray-400">
                          {nudge.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Gamification */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-800 mb-5 flex items-center gap-3">
          <Gamepad2 className="w-6 h-6 text-purple-500" /> Wellbeing Engagement
        </h2>
        <GamificationWidget
          streak={12}
          points={320}
          petName={child.pet_name || "Luna"}
          petType="companion"
        />
      </div>

      {/* Insights */}
      <InsightPanel insights={insights} />

      {/* Bottom Action Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className="rounded-2xl p-7 cursor-pointer hover:shadow-xl transition-all hover:scale-105 shadow-lg border border-white/60"
          style={{
            background: `linear-gradient(135deg, ${COLORS.lightBg}40 0%, ${COLORS.lightBg}20 100%)`,
            borderColor: `${COLORS.primary}30`,
          }}
        >
          <h3 className="font-black text-gray-800 text-lg">
            📞 Chat with {child.nickname}
          </h3>
          <p className="text-sm text-gray-600 mt-3">
            A quick conversation can help—tips for getting started inside
          </p>
        </div>
        <div
          className="rounded-2xl p-7 cursor-pointer hover:shadow-xl transition-all hover:scale-105 shadow-lg border border-white/60"
          style={{
            background: `linear-gradient(135deg, ${COLORS.accentWarm}40 0%, ${COLORS.accentWarm}20 100%)`,
            borderColor: `${COLORS.accentWarm}50`,
          }}
        >
          <h3 className="font-black text-gray-800 text-lg">📚 Resources</h3>
          <p className="text-sm text-gray-600 mt-3">
            Parent guides and tips for supporting your teen&apos;s wellbeing
          </p>
        </div>
      </div>
    </div>
  );
};
