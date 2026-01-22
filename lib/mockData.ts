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
} from './types';

// ============ PARENT DATA ============
export const mockChild: Child = {
  id: 'child-001',
  name: 'Alex',
  age: 14,
  nickname: 'Alex',
};

export const mockWeeklyTrends: WeeklyTrend[] = [
  { day: 'Mon', sleep: 7.5, activity: 65, mood: 72 },
  { day: 'Tue', sleep: 6.8, activity: 58, mood: 68 },
  { day: 'Wed', sleep: 7.2, activity: 70, mood: 75 },
  { day: 'Thu', sleep: 6.5, activity: 52, mood: 65 },
  { day: 'Fri', sleep: 7.8, activity: 82, mood: 85 },
  { day: 'Sat', sleep: 8.2, activity: 88, mood: 88 },
  { day: 'Sun', sleep: 7.0, activity: 60, mood: 72 },
];

export const mockParentSuggestions: Suggestion[] = [
  {
    id: 'sug-001',
    title: 'Try keeping bedtime consistent',
    description: "Alex does really well when there's a regular routine. Setting a fixed bedtime this week could help.",
    priority: 'medium',
    category: 'routine',
  },
  {
    id: 'sug-002',
    title: 'Do something active together',
    description: 'Things usually slow down on Wednesdays and Thursdays. How about going for a walk or playing something together?',
    priority: 'medium',
    category: 'activity',
  },
  {
    id: 'sug-003',
    title: 'Help Alex wind down before bed',
    description: 'Thursday night was a bit rough on sleep. Chatting about the day or some quiet time before bed might help.',
    priority: 'high',
    category: 'rest',
  },
  {
    id: 'sug-004',
    title: 'Time with friends boosts mood',
    description: 'Youve probably noticed how much better Alex feels after hanging out with friends. Maybe plan something for the weekend?',
    priority: 'low',
    category: 'social',
  },
];

export const mockParentNotifications: ParentNotification[] = [
  {
    id: 'notif-001',
    type: 'positive',
    message: 'Great week! Alex slept much more consistently than last week—thats real progress.',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'notif-002',
    type: 'insight',
    message: 'We noticed things got a bit busier mid-week. Activity dropped slightly on Wednesday and Thursday.',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'notif-003',
    type: 'suggestion',
    message: 'A quick chat with Alex might be helpful. Sometimes checking in can make a difference.',
    timestamp: new Date(),
    read: false,
  },
];

export const mockParentInsights: Insight[] = [
  {
    id: 'insight-p1',
    category: 'Sleep',
    observation: "Alex's sleep has been all over the place this week. Thursday was especially short, but the weekend bounce-back is always nice to see.",
    timeframe: 'This week',
  },
  {
    id: 'insight-p2',
    category: 'Activity & Mood',
    observation: "We can see a real connection here—when Alex gets out and does something, the mood picks up noticeably. Friday and Saturday are usually the high points.",
    timeframe: 'Recent',
  },
  {
    id: 'insight-p3',
    category: 'Routine',
    observation: "Having predictable routines seems to help Alex feel more balanced. The weekends show consistent improvement when there's some structure.",
    timeframe: 'Pattern',
  },
];

export const mockParentGamification: WellbeingPoints = {
  total: 4850,
  thisWeek: 320,
  activities: [
    { name: 'Morning check-in', points: 50, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { name: 'Outdoor activity', points: 75, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { name: 'Evening routine', points: 40, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { name: 'Social engagement', points: 100, date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
    { name: 'Sleep consistency', points: 55, date: new Date() },
  ],
};

export const mockParentStreak: WellbeingStreak = {
  currentStreak: 12,
  longestStreak: 31,
  daysTracked: 89,
  checkInPoints: 450,
};

export const mockParentPet: VirtualPet = {
  name: 'Sunny',
  type: 'plant',
  healthLevel: 78,
  lastInteraction: new Date(Date.now() - 2 * 60 * 60 * 1000),
};

// ============ COUNSELOR DATA ============
export const mockStudents: Student[] = [
  {
    id: 'stu-001',
    name: 'Student A',
    nickname: 'Alex',
    riskLevel: 'stable',
    lastCheck: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    engagement: 78,
    notes: 'Alex is doing really well. Participates in class and seems engaged. Good energy.',
  },
  {
    id: 'stu-002',
    name: 'Student B',
    nickname: 'Jordan',
    riskLevel: 'improving',
    lastCheck: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    engagement: 65,
    notes: 'Jordan has been making real progress lately. Attendance is better, and mood seems lighter.',
  },
  {
    id: 'stu-003',
    name: 'Student C',
    nickname: 'Casey',
    riskLevel: 'needs-attention',
    lastCheck: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    engagement: 42,
    notes: 'Casey has been pretty quiet lately. Keeping a low profile in class. Could use a friendly check-in.',
  },
  {
    id: 'stu-004',
    name: 'Student D',
    nickname: 'Morgan',
    riskLevel: 'stable',
    lastCheck: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    engagement: 82,
    notes: 'Morgan is a natural leader. Great attitude and really helps bring the group together.',
  },
  {
    id: 'stu-005',
    name: 'Student E',
    nickname: 'Riley',
    riskLevel: 'improving',
    lastCheck: new Date(),
    engagement: 71,
    notes: "Riley's been stepping up lately. More confident and engaging with classmates.",
  },
  {
    id: 'stu-006',
    name: 'Student F',
    nickname: 'Taylor',
    riskLevel: 'needs-attention',
    lastCheck: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    engagement: 38,
    notes: "Taylor seems withdrawn. It might help to reach out and see what's going on.",
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
    id: 'insight-c1',
    category: 'Class Vibe',
    observation: "The class is feeling more energized than last month. Engagement is up by about 12%. Whatever we're doing is working.",
    timeframe: 'This month',
  },
  {
    id: 'insight-c2',
    category: 'Check-Ins Needed',
    observation: 'Three students could use some one-on-one time. Nothing urgent, but reaching out proactively could make a difference.',
    timeframe: 'Current',
  },
  {
    id: 'insight-c3',
    category: 'Group Dynamics',
    observation: "We've noticed that students who interact with their peer groups tend to feel better. Maybe we can create more opportunities for positive group time.",
    timeframe: 'Pattern',
  },
];



export const mockCounselorGamification: WellbeingPoints = {
  total: 2340,
  thisWeek: 180,
  activities: [
    { name: 'Student check-in', points: 50, date: new Date() },
    { name: 'Group activity', points: 75, date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { name: 'Positive note sent', points: 30, date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { name: 'Crisis support', points: 100, date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
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
    id: 'note-001',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    content: 'First session. Client mentioned feeling overwhelmed with school and friend dynamics. We talked through what\'s been happening and established some baseline goals to work toward.',
    sessionType: 'initial',
  },
  {
    id: 'note-002',
    date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    content: 'Follow-up went well. Client is open to trying some different approaches—we talked about sleep routines and simple grounding techniques. They seemed interested and ready to give it a shot.',
    sessionType: 'follow-up',
  },
  {
    id: 'note-003',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    content: 'Great check-in today. Client reports sleeping better, feeling a bit lighter. Definitely seeing some positive shifts. We talked about keeping the routine going.',
    sessionType: 'check-in',
  },
];

export const mockSessionHistory: SessionHistory[] = [
  {
    id: 'sess-001',
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    duration: 50,
    focus: 'Getting to know each other',
    outcome: 'Built rapport and talked through what brought them in',
  },
  {
    id: 'sess-002',
    date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    duration: 45,
    focus: 'Coping tools',
    outcome: 'Learned some grounding techniques to use when stressed',
  },
  {
    id: 'sess-003',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duration: 50,
    focus: 'Sleep and daily routine',
    outcome: 'Created a plan for more consistent sleep and started implementing it',
  },
  {
    id: 'sess-004',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    duration: 45,
    focus: 'How things are going',
    outcome: 'Seeing real improvements—especially with sleep and mood',
  },
];

export const mockLongTermTrends: LongTermTrend[] = [
  { month: 'Oct', wellbeingScore: 58, engagementScore: 62, resilienceScore: 55 },
  { month: 'Nov', wellbeingScore: 62, engagementScore: 65, resilienceScore: 60 },
  { month: 'Dec', wellbeingScore: 68, engagementScore: 72, resilienceScore: 68 },
  { month: 'Jan', wellbeingScore: 75, engagementScore: 78, resilienceScore: 74 },
];

export const mockProfessionalInsights: Insight[] = [
  {
    id: 'insight-mhp1',
    category: 'Overall Progress',
    observation: 'Looking at the last four months, the trajectory is really positive. Client has made steady progress, and the improvements are holding up.',
    timeframe: '4 months',
  },
  {
    id: 'insight-mhp2',
    category: 'Key Protective Factor',
    observation: "Having a consistent sleep schedule has been a game-changer. When that's in place, everything else tends to improve.",
    timeframe: 'Recent',
  },
  {
    id: 'insight-mhp3',
    category: 'Connected Improvements',
    observation: "As the client engages more socially and academically, the overall wellbeing keeps climbing. There's a clear positive feedback loop happening.",
    timeframe: 'Pattern',
  },
];
