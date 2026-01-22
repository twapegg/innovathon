'use client';

import React from 'react';
import {
  mockChild,
  mockWeeklyTrends,
  mockParentSuggestions,
  mockParentNotifications,
  mockParentInsights,
  mockParentGamification,
  mockParentStreak,
  mockParentPet,
} from '@/lib/mockData';
import {
  StatCard,
  Card,
  SuggestionItem,
  NotificationItem,
  InsightPanel,
  GamificationWidget,
} from './SharedComponents';
import { TrendChart } from './Charts';
import { COLORS } from './SharedComponents';

export const ParentDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Welcome back!</h1>
        <p className="text-gray-500 text-base">Here's how {mockChild.name} has been doing this week</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard label="Sleep per night" value="7.3 hrs" trend={8} />
        <StatCard
          label="Activity level"
          value="68%"
          trend={12}
          color={COLORS.secondaryAccent}
        />
        <StatCard
          label="Mood check-ins"
          value="74/100"
          trend={5}
          color={COLORS.accentWarm}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Weekly Trends - Takes 2 columns on desktop */}
        <div className="lg:col-span-2">
          <TrendChart
            title="📊 How the week looked"
            data={mockWeeklyTrends}
            lines={[
              { key: 'sleep', name: 'Sleep (hrs)', color: COLORS.primary },
              { key: 'activity', name: 'Activity', color: COLORS.secondaryAccent },
              { key: 'mood', name: 'Mood (scale)', color: COLORS.accentWarm },
            ]}
          />
        </div>

        {/* Notifications */}
        <Card title="📬 Updates" className="max-h-96 overflow-y-auto">
          <div className="space-y-2">
            {mockParentNotifications.map((notif) => (
              <NotificationItem
                key={notif.id}
                type={notif.type}
                message={notif.message}
                timestamp={notif.timestamp}
                read={notif.read}
              />
            ))}
          </div>
        </Card>
      </div>

      {/* Suggestions */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-800 mb-5">💡 Supportive Suggestions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {mockParentSuggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion.id}
              title={suggestion.title}
              description={suggestion.description}
              priority={suggestion.priority}
              icon={
                suggestion.category === 'routine'
                  ? '🕐'
                  : suggestion.category === 'activity'
                    ? '🚶'
                    : suggestion.category === 'social'
                      ? '👥'
                      : '😴'
              }
            />
          ))}
        </div>
      </div>

      {/* Gamification Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-800 mb-5">🎮 Wellbeing Engagement</h2>
        <GamificationWidget
          streak={mockParentStreak.currentStreak}
          points={mockParentGamification.thisWeek}
          petName={mockParentPet.name}
          petType={mockParentPet.type}
        />
        <Card className="mt-6">
          <h3 className="font-black text-gray-800 mb-4">Recent wins</h3>
          <div className="space-y-3">
            {mockParentGamification.activities.slice(0, 5).map((activity, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center py-3 px-3 rounded-lg hover:bg-gray-50/50 transition-colors"
              >
                <span className="text-sm font-semibold text-gray-700">{activity.name}</span>
                <span className="font-black text-gray-800 bg-gradient-to-r from-yellow-100 to-yellow-50 px-3 py-1 rounded-lg">+{activity.points}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights */}
      <InsightPanel insights={mockParentInsights} />

      {/* Bottom Action Cards */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          className="rounded-2xl p-7 cursor-pointer hover:shadow-xl transition-all hover:scale-105 shadow-lg border border-white/60"
          style={{
            background: `linear-gradient(135deg, ${COLORS.lightBg}40 0%, ${COLORS.lightBg}20 100%)`,
            borderColor: `${COLORS.primary}30`,
          }}
        >
          <h3 className="font-black text-gray-800 text-lg">📞 Chat with Alex</h3>
          <p className="text-sm text-gray-600 mt-3">A quick conversation can help—tips for getting started inside</p>
        </div>
        <div
          className="rounded-2xl p-7 cursor-pointer hover:shadow-xl transition-all hover:scale-105 shadow-lg border border-white/60"
          style={{
            background: `linear-gradient(135deg, ${COLORS.accentWarm}40 0%, ${COLORS.accentWarm}20 100%)`,
            borderColor: `${COLORS.accentWarm}50`,
          }}
        >
          <h3 className="font-black text-gray-800 text-lg">📚 Resources</h3>
          <p className="text-sm text-gray-600 mt-3">Parent guides and tips for supporting your teen's wellbeing</p>
        </div>
      </div>
    </div>
  );
};
