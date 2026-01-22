'use client';

import React, { useState } from 'react';
import {
  mockStudents,
  mockClassOverview,
  mockCounselorInsights,
  mockCounselorGamification,
  mockCounselorStreak,
} from '@/lib/mockData';
import {
  StatCard,
  Card,
  RiskLevelBadge,
  Button,
  InsightPanel,
  GamificationWidget,
  AlertBox,
} from './SharedComponents';
import { COLORS } from './SharedComponents';

export const CounselorDashboard: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const selectedStudentData = mockStudents.find((s) => s.id === selectedStudent);

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Class Check-in</h1>
        <p className="text-gray-500 text-base">Get a quick sense of how your students are doing</p>
      </div>

      {/* Class Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Students" value={mockClassOverview.totalStudents} />
        <StatCard
          label="Stable"
          value={mockClassOverview.stableCount}
          color="#10b981"
        />
        <StatCard
          label="Improving"
          value={mockClassOverview.improvingCount}
          color={COLORS.primary}
        />
        <StatCard
          label="Needs Support"
          value={mockClassOverview.needsAttentionCount}
          color="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Student List */}
        <div className="lg:col-span-2">
          <Card title="👥 Student List">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {mockStudents.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedStudent === student.id
                      ? 'border-gray-400 bg-gradient-to-r from-blue-50/50 to-transparent shadow-md'
                      : 'border-gray-100 hover:border-gray-200 hover:scale-102'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-800">{student.name}</p>
                      <p className="text-xs text-gray-500">@{student.nickname}</p>
                    </div>
                    <RiskLevelBadge level={student.riskLevel} />
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-600 font-semibold">
                    <span>Engagement: {student.engagement}%</span>
                    <span>Last check: {Math.floor((Date.now() - student.lastCheck.getTime()) / (24 * 60 * 60 * 1000))}d ago</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions / Engagement Overview */}
        <Card title="📊 Class pulse">
          <div className="space-y-4">
            <div
              className="text-center py-6 rounded-xl shadow-md border border-white/60"
              style={{
                background: `linear-gradient(135deg, ${COLORS.lightBg}50 0%, ${COLORS.lightBg}20 100%)`,
              }}
            >
              <p className="text-sm text-gray-600 mb-2 font-bold">Average Engagement</p>
              <p className="text-4xl font-black text-gray-800">{mockClassOverview.averageEngagement}%</p>
            </div>
            <Button variant="primary" className="w-full">
              📞 Reach out to a student
            </Button>
            <Button variant="secondary" className="w-full">
              📋 See everyone's status
            </Button>
          </div>
        </Card>
      </div>

      {/* Selected Student Detail */}
      {selectedStudentData && (
        <div className="mb-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-800">{selectedStudentData.name}</h2>
              <p className="text-gray-600 text-sm font-semibold">@{selectedStudentData.nickname}</p>
            </div>
            <RiskLevelBadge level={selectedStudentData.riskLevel} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="📝 Notes">
              <p className="text-gray-700 mb-4 leading-relaxed">{selectedStudentData.notes}</p>
              <textarea
                placeholder="Add a note about your conversation..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm font-medium resize-none"
                rows={4}
              />
              <Button variant="primary" className="mt-4 w-full">
                💾 Save note
              </Button>
            </Card>

            <div className="space-y-4">
              <Card title="💭 Next steps">
                <div className="space-y-4">
                  {selectedStudentData.riskLevel === 'needs-attention' && (
                    <AlertBox
                      type="insight"
                      title="Good instinct"
                      message="Your gut feeling to check in is right. A conversation could help."
                      icon="💭"
                    />
                  )}
                  {selectedStudentData.riskLevel === 'improving' && (
                    <AlertBox
                      type="success"
                      title="Nice progress"
                      message="Keep doing what you're doing. This student is moving in the right direction."
                      icon="✓"
                    />
                  )}
                  <Button variant="primary" className="w-full">
                    📅 Set up a time to chat
                  </Button>
                  <Button variant="outline" className="w-full">
                    👁️ See past notes
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Counselor Gamification */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-800 mb-5">🎯 Your impact</h2>
        <GamificationWidget
          streak={mockCounselorStreak.currentStreak}
          points={mockCounselorGamification.thisWeek}
        />
      </div>

      {/* Insights */}
      <InsightPanel insights={mockCounselorInsights} />
    </div>
  );
};
