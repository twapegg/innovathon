'use client';

import React, { useState } from 'react';
import {
  mockCaseNotes,
  mockSessionHistory,
  mockLongTermTrends,
  mockProfessionalInsights,
} from '@/lib/mockData';
import { StatCard, Card, Button, InsightPanel, AlertBox } from './SharedComponents';
import { BarChartComponent, SimpleLineChart } from './Charts';
import { COLORS } from './SharedComponents';

export const ProfessionalDashboard: React.FC = () => {
  const [expandedNote, setExpandedNote] = useState<string | null>(null);

  const latestSession = mockSessionHistory[mockSessionHistory.length - 1];
  const latestTrend = mockLongTermTrends[mockLongTermTrends.length - 1];

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">Client Progress</h1>
        <p className="text-gray-500 text-base">Session notes, trends, and how things are developing</p>
      </div>

      {/* Case Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard
          label="Wellbeing"
          value={latestTrend.wellbeingScore}
          trend={17}
          color={COLORS.primary}
        />
        <StatCard
          label="Engagement"
          value={latestTrend.engagementScore}
          trend={13}
          color={COLORS.secondaryAccent}
        />
        <StatCard
          label="Resilience"
          value={latestTrend.resilienceScore}
          trend={19}
          color={COLORS.accentWarm}
        />
        <StatCard
          label="Sessions done"
          value={mockSessionHistory.length}
          color={COLORS.primary}
        />
      </div>

      {/* Long-term Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <SimpleLineChart
          title="📈 Progress over time"
          data={mockLongTermTrends}
          dataKey="wellbeingScore"
          color={COLORS.primary}
        />
        <BarChartComponent
          title="📊 All three dimensions"
          data={mockLongTermTrends}
          bars={[
            { key: 'wellbeingScore', name: 'Wellbeing', color: COLORS.primary },
            { key: 'engagementScore', name: 'Engagement', color: COLORS.secondaryAccent },
            { key: 'resilienceScore', name: 'Resilience', color: COLORS.accentWarm },
          ]}
        />
      </div>

      {/* Session History and Notes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        {/* Session History */}
        <Card title="📅 Session History">
          <div className="space-y-3">
            {mockSessionHistory.map((session) => (
              <div
                key={session.id}
                className="border-2 border-gray-100/50 rounded-xl p-4 hover:shadow-md hover:border-gray-200 transition-all hover:scale-105"
              >
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-gray-800">
                    {session.date.toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </p>
                  <span className="text-xs bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-3 py-1 rounded-full font-bold border border-blue-200">
                    {session.duration}min
                  </span>
                </div>
                <p className="text-sm text-gray-700 font-semibold">{session.focus}</p>
                <p className="text-xs text-gray-600 mt-2 font-medium">Outcome: {session.outcome}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Case Notes */}
        <Card title="📝 Case Notes">
          <div className="space-y-3">
            {mockCaseNotes.map((note) => (
              <div key={note.id}>
                <div
                  onClick={() =>
                    setExpandedNote(expandedNote === note.id ? null : note.id)
                  }
                  className="cursor-pointer p-4 rounded-xl hover:bg-gray-50/50 border-2 border-gray-100/50 hover:border-gray-200 transition-all hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-xs text-gray-500 font-bold">
                        {note.date.toLocaleDateString()}
                      </p>
                      <p className="text-sm font-black text-gray-800 capitalize">
                        {note.sessionType.replace('-', ' ')}
                      </p>
                    </div>
                    <span className="text-2xl font-black">
                      {expandedNote === note.id ? '−' : '+'}
                    </span>
                  </div>
                </div>
                {expandedNote === note.id && (
                  <div className="mt-2 p-4 bg-gradient-to-r from-gray-50 to-transparent rounded-xl border-2 border-gray-200/50">
                    <p className="text-sm text-gray-700 leading-relaxed">{note.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights */}
      <div className="mb-10">
        <InsightPanel insights={mockProfessionalInsights} />
      </div>

      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        <div
          className="rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
          style={{
            borderColor: `${COLORS.primary}50`,
            background: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.primary}05 100%)`,
          }}
        >
          <h3 className="font-black text-gray-800 mb-2">📊 Export Summary</h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate PDF progress report for records
          </p>
          <Button variant="primary" className="w-full text-sm">
            Download Report
          </Button>
        </div>

        <div
          className="rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
          style={{
            borderColor: `${COLORS.secondaryAccent}50`,
            background: `linear-gradient(135deg, ${COLORS.secondaryAccent}15 0%, ${COLORS.secondaryAccent}05 100%)`,
          }}
        >
          <h3 className="font-black text-gray-800 mb-2">💬 Add Session Note</h3>
          <p className="text-sm text-gray-600 mb-4">
            Document today's session details
          </p>
          <Button variant="secondary" className="w-full text-sm">
            New Note
          </Button>
        </div>

        <div
          className="rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
          style={{
            borderColor: `${COLORS.accentWarm}80`,
            background: `linear-gradient(135deg, ${COLORS.accentWarm}15 0%, ${COLORS.accentWarm}05 100%)`,
          }}
        >
          <h3 className="font-black text-gray-800 mb-2">📅 Schedule Next</h3>
          <p className="text-sm text-gray-600 mb-4">
            Plan next follow-up session
          </p>
          <Button variant="outline" className="w-full text-sm">
            Schedule
          </Button>
        </div>
      </div>

      {/* Recommendations Panel */}
      <Card title="🎯 Clinical Recommendations">
        <AlertBox
          type="insight"
          title="Trend Analysis"
          message="Client demonstrates consistent improvement across all metrics. Sleep and routine consistency appear to be key protective factors."
          icon="📈"
        />
        <AlertBox
          type="success"
          title="Progress Note"
          message="Positive trajectory observed. Current approach is effective. Continue with established intervention strategy."
          icon="✓"
        />
        <AlertBox
          type="info"
          title="Next Steps"
          message="Monitor resilience score closely. Plan follow-up in 2 weeks to assess sustainability of improvements."
          icon="📋"
        />
      </Card>
    </div>
  );
};
