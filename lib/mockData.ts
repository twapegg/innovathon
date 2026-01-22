import {
  Child,
  WeeklyTrend,
  Suggestion,
  ParentNotification,
  Student,
  ClassOverview,
  CaseNotes,
  SessionHistory,
  LongTermTrend,
  Insight,
  WellbeingStreak,
  VirtualPet,
  WellbeingPoints,
} from "./types";

// ============ PARENT DATA ============
export const mockChild: Child = {
  id: "child-001",
  name: "Alex",
  age: 14,
  nickname: "Alex",
};

export const mockWeeklyTrends: WeeklyTrend[] = [
  {
    day: "Mon",
    date: "2026-01-20",
    sleep: 7.5,
    activity: 65,
    screenTime: 120,
    routine: 0.85,
    mood: 72,
  },
  {
    day: "Tue",
    date: "2026-01-21",
    sleep: 6.8,
    activity: 58,
    screenTime: 135,
    routine: 0.75,
    mood: 68,
  },
  {
    day: "Wed",
    date: "2026-01-22",
    sleep: 7.2,
    activity: 70,
    screenTime: 110,
    routine: 0.9,
    mood: 75,
  },
  {
    day: "Thu",
    date: "2026-01-23",
    sleep: 6.5,
    activity: 52,
    screenTime: 145,
    routine: 0.7,
    mood: 65,
  },
  {
    day: "Fri",
    date: "2026-01-24",
    sleep: 7.8,
    activity: 82,
    screenTime: 160,
    routine: 0.95,
    mood: 85,
  },
  {
    day: "Sat",
    date: "2026-01-25",
    sleep: 8.2,
    activity: 88,
    screenTime: 180,
    routine: 0.8,
    mood: 88,
  },
  {
    day: "Sun",
    date: "2026-01-26",
    sleep: 7.0,
    activity: 60,
    screenTime: 100,
    routine: 0.85,
    mood: 72,
  },
];

export const mockParentSuggestions: Suggestion[] = [
  {
    id: "sug-001",
    title: "Try keeping bedtime consistent",
    description:
      "Alex does really well when there's a regular routine. Setting a fixed bedtime this week could help.",
    priority: "medium",
    category: "routine",
  },
  {
    id: "sug-002",
    title: "Do something active together",
    description:
      "Things usually slow down on Wednesdays and Thursdays. How about going for a walk or playing something together?",
    priority: "medium",
    category: "activity",
  },
  {
    id: "sug-003",
    title: "Help Alex wind down before bed",
    description:
      "Thursday night was a bit rough on sleep. Chatting about the day or some quiet time before bed might help.",
    priority: "high",
    category: "rest",
  },
  {
    id: "sug-004",
    title: "Time with friends boosts mood",
    description:
      "Youve probably noticed how much better Alex feels after hanging out with friends. Maybe plan something for the weekend?",
    priority: "low",
    category: "social",
  },
];

export const mockParentNotifications: ParentNotification[] = [
  {
    id: "notif-001",
    type: "positive",
    message:
      "Great week! Alex slept much more consistently than last week—thats real progress.",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "notif-002",
    type: "insight",
    message:
      "We noticed things got a bit busier mid-week. Activity dropped slightly on Wednesday and Thursday.",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: "notif-003",
    type: "suggestion",
    message:
      "A quick chat with Alex might be helpful. Sometimes checking in can make a difference.",
    timestamp: new Date(),
    read: false,
  },
];

export const mockParentInsights: Insight[] = [
  {
    id: "insight-p1",
    category: "Sleep",
    observation:
      "Alex's sleep has been all over the place this week. Thursday was especially short, but the weekend bounce-back is always nice to see.",
    timeframe: "This week",
  },
  {
    id: "insight-p2",
    category: "Activity & Mood",
    observation:
      "We can see a real connection here—when Alex gets out and does something, the mood picks up noticeably. Friday and Saturday are usually the high points.",
    timeframe: "Recent",
  },
  {
    id: "insight-p3",
    category: "Routine",
    observation:
      "Having predictable routines seems to help Alex feel more balanced. The weekends show consistent improvement when there's some structure.",
    timeframe: "Pattern",
  },
];

export const mockParentGamification: WellbeingPoints = {
  total: 4850,
  thisWeek: 320,
  activities: [
    {
      name: "Morning check-in",
      points: 50,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Outdoor activity",
      points: 75,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Evening routine",
      points: 40,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Social engagement",
      points: 100,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    { name: "Sleep consistency", points: 55, date: new Date() },
  ],
};

export const mockParentStreak: WellbeingStreak = {
  currentStreak: 12,
  longestStreak: 31,
  daysTracked: 89,
  checkInPoints: 450,
};

export const mockParentPet: VirtualPet = {
  name: "Sunny",
  type: "plant",
  healthLevel: 78,
  lastInteraction: new Date(Date.now() - 2 * 60 * 60 * 1000),
};

// ============ COUNSELOR DATA ============
export const mockStudents: Student[] = [
  {
    id: "stu-001",
    name: "Student A",
    nickname: "Alex",
    riskLevel: "stable",
    lastCheck: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    engagement: 78,
    notes:
      "Alex is doing really well. Participates in class and seems engaged. Good energy.",
  },
  {
    id: "stu-002",
    name: "Student B",
    nickname: "Jordan",
    riskLevel: "improving",
    lastCheck: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    engagement: 65,
    notes:
      "Jordan has been making real progress lately. Attendance is better, and mood seems lighter.",
  },
  {
    id: "stu-003",
    name: "Student C",
    nickname: "Casey",
    riskLevel: "needs-attention",
    lastCheck: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    engagement: 42,
    notes:
      "Casey has been pretty quiet lately. Keeping a low profile in class. Could use a friendly check-in.",
  },
  {
    id: "stu-004",
    name: "Student D",
    nickname: "Morgan",
    riskLevel: "stable",
    lastCheck: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    engagement: 82,
    notes:
      "Morgan is a natural leader. Great attitude and really helps bring the group together.",
  },
  {
    id: "stu-005",
    name: "Student E",
    nickname: "Riley",
    riskLevel: "improving",
    lastCheck: new Date(),
    engagement: 71,
    notes:
      "Riley's been stepping up lately. More confident and engaging with classmates.",
  },
  {
    id: "stu-006",
    name: "Student F",
    nickname: "Taylor",
    riskLevel: "needs-attention",
    lastCheck: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    engagement: 38,
    notes:
      "Taylor seems withdrawn. It might help to reach out and see what's going on.",
  },
];

export const mockClassOverview: ClassOverview = {
  totalStudents: 28,
  stableCount: 18,
  improvingCount: 7,
  needsAttentionCount: 3,
  averageEngagement: 68,
};

export const mockCounselorInsights: Insight[] = [
  {
    id: "insight-c1",
    category: "Class Vibe",
    observation:
      "The class is feeling more energized than last month. Engagement is up by about 12%. Whatever we're doing is working.",
    timeframe: "This month",
  },
  {
    id: "insight-c2",
    category: "Check-Ins Needed",
    observation:
      "Three students could use some one-on-one time. Nothing urgent, but reaching out proactively could make a difference.",
    timeframe: "Current",
  },
  {
    id: "insight-c3",
    category: "Group Dynamics",
    observation:
      "We've noticed that students who interact with their peer groups tend to feel better. Maybe we can create more opportunities for positive group time.",
    timeframe: "Pattern",
  },
];

export const mockCounselorGamification: WellbeingPoints = {
  total: 2340,
  thisWeek: 180,
  activities: [
    { name: "Student check-in", points: 50, date: new Date() },
    {
      name: "Group activity",
      points: 75,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Positive note sent",
      points: 30,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      name: "Crisis support",
      points: 100,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
  ],
};

export const mockCounselorStreak: WellbeingStreak = {
  currentStreak: 18,
  longestStreak: 45,
  daysTracked: 120,
  checkInPoints: 650,
};

// ============ PROFESSIONAL DATA ============
export const mockCaseNotes: CaseNotes[] = [
  {
    id: "note-001",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    content:
      "First session. Client mentioned feeling overwhelmed with school and friend dynamics. We talked through what's been happening and established some baseline goals to work toward.",
    sessionType: "initial",
  },
  {
    id: "note-002",
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    content:
      "Follow-up went well. Client is open to trying some different approaches—we talked about sleep routines and simple grounding techniques. They seemed interested and ready to give it a shot.",
    sessionType: "follow-up",
  },
  {
    id: "note-003",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    content:
      "Great check-in today. Client reports sleeping better, feeling a bit lighter. Definitely seeing some positive shifts. We talked about keeping the routine going.",
    sessionType: "check-in",
  },
];

export const mockSessionHistory: SessionHistory[] = [
  {
    id: "sess-001",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    duration: 50,
    focus: "Getting to know each other",
    outcome: "Built rapport and talked through what brought them in",
  },
  {
    id: "sess-002",
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    duration: 45,
    focus: "Coping tools",
    outcome: "Learned some grounding techniques to use when stressed",
  },
  {
    id: "sess-003",
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duration: 50,
    focus: "Sleep and daily routine",
    outcome:
      "Created a plan for more consistent sleep and started implementing it",
  },
  {
    id: "sess-004",
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    duration: 45,
    focus: "How things are going",
    outcome: "Seeing real improvements—especially with sleep and mood",
  },
];

export const mockLongTermTrends: LongTermTrend[] = [
  {
    month: "Oct",
    wellbeingScore: 58,
    engagementScore: 62,
    resilienceScore: 55,
  },
  {
    month: "Nov",
    wellbeingScore: 62,
    engagementScore: 65,
    resilienceScore: 60,
  },
  {
    month: "Dec",
    wellbeingScore: 68,
    engagementScore: 72,
    resilienceScore: 68,
  },
  {
    month: "Jan",
    wellbeingScore: 75,
    engagementScore: 78,
    resilienceScore: 74,
  },
];

export const mockProfessionalInsights: Insight[] = [
  {
    id: "insight-mhp1",
    category: "Overall Progress",
    observation:
      "Looking at the last four months, the trajectory is really positive. Client has made steady progress, and the improvements are holding up.",
    timeframe: "4 months",
  },
  {
    id: "insight-mhp2",
    category: "Key Protective Factor",
    observation:
      "Having a consistent sleep schedule has been a game-changer. When that's in place, everything else tends to improve.",
    timeframe: "Recent",
  },
  {
    id: "insight-mhp3",
    category: "Connected Improvements",
    observation:
      "As the client engages more socially and academically, the overall wellbeing keeps climbing. There's a clear positive feedback loop happening.",
    timeframe: "Pattern",
  },
];

// ============ COUNSELOR DATA ============
export const mockCounselorStudents = [
  {
    id: "stu-001",
    name: "Alex Rivera",
    nickname: "Alex",
    age: 14,
    riskLevel: "stable" as const,
    lastCheck: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    engagement: 78,
    notes:
      "Alex is doing really well. Participates in class and seems engaged. Good energy.",
    recentFindings: [],
    weeklyMetrics: {
      avgSleep: 7.5,
      avgScreenTime: 150,
      avgActivity: 45,
      avgRoutine: 0.85,
      avgCheckin: 0.9,
      bedtimeCompliance: 0.9,
      metrics: [],
    },
  },
  {
    id: "stu-002",
    name: "Jordan Kim",
    nickname: "Jordan",
    age: 13,
    riskLevel: "improving" as const,
    lastCheck: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    engagement: 65,
    notes:
      "Jordan has been making real progress lately. Attendance is better, and mood seems lighter.",
    recentFindings: [
      {
        id: "1",
        finding_id: "routine_flexibility",
        title: "Routine Improving",
        severity: "low" as const,
        confidence: 0.7,
        evidence: {
          baseline_value: 0.6,
          recent_value: 0.75,
          days_affected: 5,
          metric_name: "routine_consistency_score",
        },
        created_at: "2026-01-23",
      },
    ],
    weeklyMetrics: {
      avgSleep: 7.2,
      avgScreenTime: 165,
      avgActivity: 38,
      avgRoutine: 0.75,
      avgCheckin: 0.7,
      bedtimeCompliance: 0.7,
      metrics: [],
    },
  },
  {
    id: "stu-003",
    name: "Casey Martinez",
    nickname: "Casey",
    age: 14,
    riskLevel: "needs-attention" as const,
    lastCheck: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    engagement: 42,
    notes:
      "Casey has been pretty quiet lately. Keeping a low profile in class. Could use a friendly check-in.",
    recentFindings: [
      {
        id: "2",
        finding_id: "sleep_rhythm_shift",
        title: "Rest Rhythm Shifted",
        severity: "medium" as const,
        confidence: 0.82,
        evidence: {
          baseline_value: 7.8,
          recent_value: 5.5,
          days_affected: 4,
          metric_name: "sleep_hours",
        },
        created_at: "2026-01-23",
      },
      {
        id: "3",
        finding_id: "social_stamina_shift",
        title: "Social Energy Dipped",
        severity: "medium" as const,
        confidence: 0.75,
        evidence: {
          baseline_value: 0.85,
          recent_value: 0.45,
          days_affected: 5,
          metric_name: "checkin_completion",
        },
        created_at: "2026-01-23",
      },
    ],
    weeklyMetrics: {
      avgSleep: 5.5,
      avgScreenTime: 220,
      avgActivity: 18,
      avgRoutine: 0.45,
      avgCheckin: 0.35,
      bedtimeCompliance: 0.3,
      metrics: [],
    },
  },
  {
    id: "stu-004",
    name: "Morgan Taylor",
    nickname: "Morgan",
    age: 15,
    riskLevel: "stable" as const,
    lastCheck: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    engagement: 82,
    notes:
      "Morgan is a natural leader. Great attitude and really helps bring the group together.",
    recentFindings: [],
    weeklyMetrics: {
      avgSleep: 8.0,
      avgScreenTime: 140,
      avgActivity: 55,
      avgRoutine: 0.9,
      avgCheckin: 0.92,
      bedtimeCompliance: 0.95,
      metrics: [],
    },
  },
  {
    id: "stu-005",
    name: "Riley Chen",
    nickname: "Riley",
    age: 14,
    riskLevel: "improving" as const,
    lastCheck: new Date(),
    engagement: 71,
    notes:
      "Riley's been stepping up lately. More confident and engaging with classmates.",
    recentFindings: [
      {
        id: "4",
        finding_id: "activity_rhythm_shift",
        title: "Activity Increasing",
        severity: "low" as const,
        confidence: 0.68,
        evidence: {
          baseline_value: 25,
          recent_value: 42,
          days_affected: 4,
          metric_name: "physical_activity_minutes",
        },
        created_at: "2026-01-23",
      },
    ],
    weeklyMetrics: {
      avgSleep: 7.3,
      avgScreenTime: 158,
      avgActivity: 42,
      avgRoutine: 0.78,
      avgCheckin: 0.75,
      bedtimeCompliance: 0.75,
      metrics: [],
    },
  },
  {
    id: "stu-006",
    name: "Sam Patel",
    nickname: "Sam",
    age: 13,
    riskLevel: "stable" as const,
    lastCheck: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    engagement: 85,
    notes:
      "Sam is consistently engaged and upbeat. Great participation in group activities.",
    recentFindings: [],
    weeklyMetrics: {
      avgSleep: 7.8,
      avgScreenTime: 145,
      avgActivity: 50,
      avgRoutine: 0.88,
      avgCheckin: 0.9,
      bedtimeCompliance: 0.92,
      metrics: [],
    },
  },
];

export const mockCounselorEscalations = [
  {
    id: "esc-001",
    child_id: "stu-003",
    level: "counselor" as const,
    reason:
      "Persistent sleep disruption (5.5 hrs avg) combined with declining check-in engagement over 5+ days",
    recommended_next_step:
      "Schedule a friendly check-in conversation to see how things are going",
    requires_parent_ack: false,
    status: "pending" as const,
    created_at: "2026-01-23",
    child: {
      id: "stu-003",
      name: "Casey Martinez",
      nickname: "Casey",
      age: 14,
    },
  },
];

// ============ PROFESSIONAL DATA ============
export const mockProfessionalCases = () => {
  const now = new Date();

  return [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: "Alex Martinez",
      nickname: "Alex",
      age: 14,
      parentId: "parent-1",
      createdAt: new Date(
        now.getTime() - 90 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      riskScore: 78,
      caseStatus: "active" as const,
      escalations: [
        {
          id: "esc-1",
          child_id: "550e8400-e29b-41d4-a716-446655440000",
          level: "professional" as const,
          severity: "high" as const,
          headline: "Severe social withdrawal pattern detected",
          detailedSummary:
            "Multi-day pattern of isolation combined with significant drop in communication with peers. Messaging activity decreased by 85% over 5 days. Late-night screen usage increased substantially. Parent reports child has been skipping meals.",
          triggerFindings: [
            "Finding: Social isolation increasing",
            "Finding: Sleep disruption severe",
          ],
          recommendedNextSteps: [
            "Schedule immediate one-on-one session",
            "Implement daily check-in protocol",
            "Coordinate with school counselor",
            "Consider family therapy session",
          ],
          escalatedAt: new Date(
            now.getTime() - 2 * 60 * 60 * 1000,
          ).toISOString(),
          acknowledgedAt: undefined,
          acknowledgedBy: undefined,
          status: "pending" as const,
          reason:
            "Multiple high-severity findings across social and sleep dimensions",
          recommended_next_step: "Schedule immediate one-on-one session",
          requires_parent_ack: true,
          created_at: new Date(
            now.getTime() - 2 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      allFindings: [
        {
          id: "find-1",
          finding_id: "social_isolation",
          title: "Social Isolation Increasing",
          evidence: {
            baseline_value: 0.85,
            recent_value: 0.15,
            days_affected: 5,
            metric_name: "checkin_completion",
          },
          severity: "high" as const,
          confidence: 0.92,
          created_at: new Date(
            now.getTime() - 1 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "find-2",
          finding_id: "sleep_disruption",
          title: "Sleep Disruption Severe",
          evidence: {
            baseline_value: 7.8,
            recent_value: 5.5,
            days_affected: 5,
            metric_name: "sleep_hours",
          },
          severity: "high" as const,
          confidence: 0.95,
          created_at: new Date(
            now.getTime() - 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "find-3",
          finding_id: "anxiety_research",
          title: "Anxiety Research Patterns",
          evidence: {
            baseline_value: 0.2,
            recent_value: 0.8,
            days_affected: 3,
            metric_name: "browser_search_anxiety",
          },
          severity: "medium" as const,
          confidence: 0.78,
          created_at: new Date(
            now.getTime() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      allDecisions: [
        {
          id: "dec-1",
          childId: "550e8400-e29b-41d4-a716-446655440000",
          decision: "escalate" as const,
          reasoning:
            "Multiple high-severity findings across social and sleep dimensions warrant professional intervention",
          confidenceScore: 0.91,
          triggerFindingIds: ["find-1", "find-2"],
          createdAt: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "dec-2",
          childId: "550e8400-e29b-41d4-a716-446655440000",
          decision: "brief_parent" as const,
          reasoning:
            "Parent needs awareness of emerging patterns before they worsen",
          confidenceScore: 0.85,
          triggerFindingIds: ["find-3"],
          createdAt: new Date(
            now.getTime() - 1 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "dec-3",
          childId: "550e8400-e29b-41d4-a716-446655440000",
          decision: "nudge_youth" as const,
          reasoning:
            "Light touch intervention to encourage healthier device habits",
          confidenceScore: 0.68,
          triggerFindingIds: ["find-2"],
          createdAt: new Date(
            now.getTime() - 4 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      weeklyMetrics: Array.from({ length: 14 }, (_, i) => ({
        id: `metric-alex-${i}`,
        date: new Date(now.getTime() - (13 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        screen_time_minutes: 280 + (i > 7 ? i * 15 : i * 5),
        social_media_minutes: 120,
        games_minutes: 60,
        entertainment_minutes: 50,
        education_minutes: 30,
        productivity_minutes: 20,
        device_pickups: 150,
        first_pickup_time: "07:30:00",
        late_night_screen_minutes: 45,
        bedtime_target_met: i < 5,
        sleep_hours: 6.5 - (i > 7 ? 0.5 : 0),
        routine_consistency_score: 0.6,
        checkin_completion: 0.5,
        physical_activity_minutes: 30,
        outdoor_time_minutes: 15,
        moodIndicators: {
          social: 50 - i * 3,
          sleep: 60 - i * 4,
          emotional: 55 - i * 2,
        },
      })),
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: "Jamie Chen",
      nickname: "Jamie",
      age: 12,
      parentId: "parent-2",
      createdAt: new Date(
        now.getTime() - 60 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      riskScore: 45,
      caseStatus: "monitoring" as const,
      escalations: [
        {
          id: "esc-2",
          child_id: "550e8400-e29b-41d4-a716-446655440001",
          level: "counselor" as const,
          severity: "medium" as const,
          headline: "Elevated gaming time affecting homework completion",
          detailedSummary:
            "Gaming sessions averaging 4+ hours on school nights. Correlation with incomplete homework assignments reported by parent.",
          triggerFindings: ["Finding: Gaming time elevated"],
          recommendedNextSteps: [
            "Discuss healthy gaming boundaries",
            "Review time management strategies",
            "Suggest screen time agreement with family",
          ],
          escalatedAt: new Date(
            now.getTime() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          acknowledgedAt: new Date(
            now.getTime() - 2 * 24 * 60 * 60 * 1000,
          ).toISOString(),
          acknowledgedBy: "Dr. Sarah Wilson",
          status: "acknowledged" as const,
          reason: "Gaming time elevated affecting homework completion",
          recommended_next_step: "Discuss healthy gaming boundaries",
          requires_parent_ack: false,
          created_at: new Date(
            now.getTime() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      allFindings: [
        {
          id: "find-4",
          finding_id: "gaming_time_elevated",
          title: "Gaming Time Elevated",
          evidence: {
            baseline_value: 2.5,
            recent_value: 4.0,
            days_affected: 5,
            metric_name: "games_minutes",
          },
          severity: "medium" as const,
          confidence: 0.88,
          created_at: new Date(
            now.getTime() - 4 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "find-5",
          finding_id: "bedtime_delayed",
          title: "Bedtime Delayed",
          evidence: {
            baseline_value: 21.5,
            recent_value: 23.0,
            days_affected: 4,
            metric_name: "first_pickup_time",
          },
          severity: "medium" as const,
          confidence: 0.82,
          created_at: new Date(
            now.getTime() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      allDecisions: [
        {
          id: "dec-4",
          childId: "550e8400-e29b-41d4-a716-446655440001",
          decision: "nudge_youth" as const,
          reasoning: "Gentle reminder about balance could help self-regulate",
          confidenceScore: 0.72,
          triggerFindingIds: ["find-4"],
          createdAt: new Date(
            now.getTime() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "dec-5",
          childId: "550e8400-e29b-41d4-a716-446655440001",
          decision: "brief_parent" as const,
          reasoning: "Parent should be aware of the gaming time increase",
          confidenceScore: 0.78,
          triggerFindingIds: ["find-4", "find-5"],
          createdAt: new Date(
            now.getTime() - 3 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      weeklyMetrics: Array.from({ length: 14 }, (_, i) => ({
        id: `metric-jamie-${i}`,
        date: new Date(now.getTime() - (13 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        screen_time_minutes: 200 + Math.sin(i) * 30,
        social_media_minutes: 80,
        games_minutes: 240,
        entertainment_minutes: 60,
        education_minutes: 40,
        productivity_minutes: 30,
        device_pickups: 120,
        first_pickup_time: "08:00:00",
        late_night_screen_minutes: 90,
        bedtime_target_met: false,
        sleep_hours: 7.0,
        routine_consistency_score: 0.7,
        checkin_completion: 0.7,
        physical_activity_minutes: 35,
        outdoor_time_minutes: 20,
        moodIndicators: { social: 70, sleep: 75, emotional: 72 },
      })),
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: "Sam Johnson",
      nickname: "Sam",
      age: 16,
      parentId: "parent-3",
      createdAt: new Date(
        now.getTime() - 120 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      riskScore: 25,
      caseStatus: "resolved" as const,
      escalations: [],
      allFindings: [
        {
          id: "find-6",
          finding_id: "routine_improvement",
          title: "Routine Improvement",
          evidence: {
            baseline_value: 0.65,
            recent_value: 0.85,
            days_affected: 14,
            metric_name: "routine_consistency_score",
          },
          severity: "low" as const,
          confidence: 0.85,
          created_at: new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      allDecisions: [
        {
          id: "dec-6",
          childId: "550e8400-e29b-41d4-a716-446655440002",
          decision: "hold" as const,
          reasoning: "No intervention needed - positive patterns observed",
          confidenceScore: 0.9,
          triggerFindingIds: ["find-6"],
          createdAt: new Date(
            now.getTime() - 7 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      weeklyMetrics: Array.from({ length: 14 }, (_, i) => ({
        id: `metric-sam-${i}`,
        date: new Date(now.getTime() - (13 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        screen_time_minutes: 150 + Math.random() * 30,
        social_media_minutes: 60,
        games_minutes: 40,
        entertainment_minutes: 50,
        education_minutes: 50,
        productivity_minutes: 40,
        device_pickups: 80,
        first_pickup_time: "07:00:00",
        late_night_screen_minutes: 20,
        bedtime_target_met: true,
        sleep_hours: 8.5,
        routine_consistency_score: 0.85,
        checkin_completion: 0.9,
        physical_activity_minutes: 60,
        outdoor_time_minutes: 45,
        moodIndicators: { social: 80, sleep: 85, emotional: 82 },
      })),
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      name: "Taylor Rodriguez",
      nickname: "Taylor",
      age: 15,
      parentId: "parent-4",
      createdAt: new Date(
        now.getTime() - 45 * 24 * 60 * 60 * 1000,
      ).toISOString(),
      riskScore: 62,
      caseStatus: "monitoring" as const,
      escalations: [],
      allFindings: [
        {
          id: "find-7",
          finding_id: "stress_management_search",
          title: "Stress Management Research",
          evidence: {
            baseline_value: 0.3,
            recent_value: 0.7,
            days_affected: 4,
            metric_name: "stress_related_searches",
          },
          severity: "medium" as const,
          confidence: 0.76,
          created_at: new Date(
            now.getTime() - 6 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "find-8",
          finding_id: "social_engagement_drop",
          title: "Social Engagement Drop",
          evidence: {
            baseline_value: 0.8,
            recent_value: 0.4,
            days_affected: 7,
            metric_name: "social_app_usage",
          },
          severity: "medium" as const,
          confidence: 0.84,
          created_at: new Date(
            now.getTime() - 8 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      allDecisions: [
        {
          id: "dec-7",
          childId: "550e8400-e29b-41d4-a716-446655440003",
          decision: "brief_parent" as const,
          reasoning:
            "Pattern suggests emerging stress - parent awareness recommended",
          confidenceScore: 0.8,
          triggerFindingIds: ["find-7", "find-8"],
          createdAt: new Date(
            now.getTime() - 6 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
        {
          id: "dec-8",
          childId: "550e8400-e29b-41d4-a716-446655440003",
          decision: "nudge_youth" as const,
          reasoning: "Offer supportive resources and coping strategies",
          confidenceScore: 0.75,
          triggerFindingIds: ["find-7"],
          createdAt: new Date(
            now.getTime() - 5 * 24 * 60 * 60 * 1000,
          ).toISOString(),
        },
      ],
      weeklyMetrics: Array.from({ length: 14 }, (_, i) => ({
        id: `metric-taylor-${i}`,
        date: new Date(now.getTime() - (13 - i) * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        screen_time_minutes: 190 + (i < 7 ? 10 : -5) * i,
        social_media_minutes: 90,
        games_minutes: 50,
        entertainment_minutes: 60,
        education_minutes: 45,
        productivity_minutes: 35,
        device_pickups: 110,
        first_pickup_time: "07:45:00",
        late_night_screen_minutes: 60,
        bedtime_target_met: i >= 7,
        sleep_hours: 7.2,
        routine_consistency_score: 0.75,
        checkin_completion: 0.65,
        physical_activity_minutes: 40,
        outdoor_time_minutes: 25,
        moodIndicators: {
          social: 65 - (i < 7 ? i * 2 : 0),
          sleep: 70,
          emotional: 68 - (i < 7 ? i : 0),
        },
      })),
    },
  ];
};
