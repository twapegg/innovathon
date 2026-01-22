"use client";

import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  FileText,
  MessageSquare,
  CheckCircle,
  Calendar,
  Eye,
  Save,
  Target,
  Users,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import {
  StatCard,
  Card,
  RiskLevelBadge,
  Button,
  InsightPanel,
  GamificationWidget,
  AlertBox,
} from "./SharedComponents";
import { COLORS } from "./SharedComponents";
import {
  mockCounselorStudents,
  mockCounselorEscalations,
} from "@/lib/mockData";
import type {
  Child,
  Escalation,
  BehavioralFinding,
  WeeklyMetricsSummary,
} from "@/lib/types";

interface StudentWithData extends Child {
  recentFindings: BehavioralFinding[];
  weeklyMetrics: WeeklyMetricsSummary | null;
  riskLevel: "stable" | "improving" | "needs-attention";
  engagement: number;
  lastCheck: Date;
  notes: string;
}

interface CounselorData {
  children: StudentWithData[];
  pendingEscalations: Escalation[];
}

export const CounselorDashboard: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [data, setData] = useState<CounselorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard?role=counselor");
        if (!response.ok) throw new Error("Failed to fetch");
        const result = await response.json();
        setData(result);
      } catch {
        console.log("Using mock data - Supabase not configured");
        setUseMockData(true);
        setData({
          children: mockCounselorStudents,
          pendingEscalations: mockCounselorEscalations,
        });
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

  const students = data?.children || mockCounselorStudents;
  const pendingEscalations =
    data?.pendingEscalations || mockCounselorEscalations;
  const selectedStudentData = students.find((s) => s.id === selectedStudent);

  // Calculate class overview
  const classOverview = {
    totalStudents: students.length,
    stableCount: students.filter((s) => s.riskLevel === "stable").length,
    improvingCount: students.filter((s) => s.riskLevel === "improving").length,
    needsAttentionCount: students.filter(
      (s) => s.riskLevel === "needs-attention",
    ).length,
    averageEngagement: Math.round(
      students.reduce((sum, s) => sum + s.engagement, 0) / students.length,
    ),
  };

  // Generate insights from data
  const insights = [
    {
      category: "Class Vibe",
      observation: `The class is at ${classOverview.averageEngagement}% average engagement. ${classOverview.stableCount} students are stable, ${classOverview.improvingCount} improving.`,
      timeframe: "This week",
    },
    {
      category: "Attention Needed",
      observation: `${classOverview.needsAttentionCount} student${classOverview.needsAttentionCount !== 1 ? "s" : ""} could use some one-on-one time. ${pendingEscalations.length} escalation${pendingEscalations.length !== 1 ? "s" : ""} pending.`,
      timeframe: "Current",
    },
    {
      category: "AI Observations",
      observation:
        "The system detected behavioral pattern shifts in some students. Review the findings below for each student.",
      timeframe: "Real-time",
    },
  ];

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
              Class Check-in
            </h1>
            <p className="text-gray-500 text-base">
              Get a quick sense of how your students are doing
            </p>
          </div>
          {useMockData && (
            <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
              Demo Mode
            </span>
          )}
        </div>
      </div>

      {/* Pending Escalations Alert */}
      {pendingEscalations.length > 0 && (
        <div className="mb-10">
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-8 h-8 text-amber-500 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-bold text-amber-800 mb-2">
                  {pendingEscalations.length} Escalation
                  {pendingEscalations.length !== 1 ? "s" : ""} Need Your
                  Attention
                </h3>
                <div className="space-y-3">
                  {pendingEscalations.map((esc) => (
                    <div
                      key={esc.id}
                      className="bg-white/80 rounded-xl p-4 border border-amber-100"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-800">
                          {esc.child?.nickname || "Student"}
                        </span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          {esc.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{esc.reason}</p>
                      <p className="text-xs text-emerald-700 font-medium">
                        → {esc.recommended_next_step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Class Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Total Students" value={classOverview.totalStudents} />
        <StatCard
          label="Stable"
          value={classOverview.stableCount}
          color="#10b981"
        />
        <StatCard
          label="Improving"
          value={classOverview.improvingCount}
          color={COLORS.primary}
        />
        <StatCard
          label="Needs Support"
          value={classOverview.needsAttentionCount}
          color="#f59e0b"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
        {/* Student List */}
        <div className="lg:col-span-2">
          <Card title="👥 Student List">
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {students.map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedStudent === student.id
                      ? "border-gray-400 bg-gradient-to-r from-blue-50/50 to-transparent shadow-md"
                      : "border-gray-100 hover:border-gray-200 hover:scale-102"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-gray-800">{student.name}</p>
                      <p className="text-xs text-gray-500">
                        @{student.nickname}
                      </p>
                    </div>
                    <RiskLevelBadge level={student.riskLevel} />
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-600 font-semibold">
                    <span>Engagement: {student.engagement}%</span>
                    <span>
                      Last check:{" "}
                      {Math.floor(
                        (Date.now() - new Date(student.lastCheck).getTime()) /
                          (24 * 60 * 60 * 1000),
                      )}
                      d ago
                    </span>
                  </div>
                  {student.recentFindings &&
                    student.recentFindings.length > 0 && (
                      <div className="mt-2 flex gap-1 flex-wrap">
                        {student.recentFindings.slice(0, 2).map((f, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              f.severity === "high"
                                ? "bg-orange-100 text-orange-700"
                                : f.severity === "medium"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {f.title}
                          </span>
                        ))}
                      </div>
                    )}
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
              <p className="text-sm text-gray-600 mb-2 font-bold">
                Average Engagement
              </p>
              <p className="text-4xl font-black text-gray-800">
                {classOverview.averageEngagement}%
              </p>
            </div>
            <Button variant="primary" className="w-full">
              📞 Reach out to a student
            </Button>
            <Button variant="secondary" className="w-full">
              📋 See everyone&apos;s status
            </Button>
          </div>
        </Card>
      </div>

      {/* Selected Student Detail */}
      {selectedStudentData && (
        <div className="mb-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-800">
                {selectedStudentData.name}
              </h2>
              <p className="text-gray-600 text-sm font-semibold">
                @{selectedStudentData.nickname}
              </p>
            </div>
            <RiskLevelBadge level={selectedStudentData.riskLevel} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* AI Findings */}
            {selectedStudentData.recentFindings &&
              selectedStudentData.recentFindings.length > 0 && (
                <Card title="🤖 AI Behavioral Findings">
                  <div className="space-y-3">
                    {selectedStudentData.recentFindings.map((finding, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${
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
              )}

            {/* Weekly Metrics */}
            {selectedStudentData.weeklyMetrics && (
              <Card title="📊 Weekly Metrics">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 text-center">
                    <p className="text-2xl font-bold text-blue-700">
                      {selectedStudentData.weeklyMetrics.avgSleep?.toFixed(1)}
                    </p>
                    <p className="text-xs text-blue-600">Avg Sleep (hrs)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-50 to-emerald-100/50 text-center">
                    <p className="text-2xl font-bold text-emerald-700">
                      {Math.round(
                        selectedStudentData.weeklyMetrics.avgActivity || 0,
                      )}
                    </p>
                    <p className="text-xs text-emerald-600">Activity (min)</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 text-center">
                    <p className="text-2xl font-bold text-purple-700">
                      {Math.round(
                        (selectedStudentData.weeklyMetrics.avgRoutine || 0) *
                          100,
                      )}
                      %
                    </p>
                    <p className="text-xs text-purple-600">Routine Score</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/50 text-center">
                    <p className="text-2xl font-bold text-amber-700">
                      {Math.round(
                        (selectedStudentData.weeklyMetrics.bedtimeCompliance ||
                          0) * 100,
                      )}
                      %
                    </p>
                    <p className="text-xs text-amber-600">Bedtime Met</p>
                  </div>
                </div>
              </Card>
            )}

            <Card
              title="Notes"
              icon={<FileText className="w-5 h-5 text-blue-500" />}
            >
              <p className="text-gray-700 mb-4 leading-relaxed">
                {selectedStudentData.notes}
              </p>
              <textarea
                placeholder="Add a note about your conversation..."
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-gray-400 text-sm font-medium resize-none"
                rows={4}
              />
              <Button variant="primary" className="mt-4 w-full">
                <span className="inline-flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save note
                </span>
              </Button>
            </Card>

            <div className="space-y-4">
              <Card
                title="Next steps"
                icon={<MessageSquare className="w-5 h-5 text-violet-500" />}
              >
                <div className="space-y-4">
                  {selectedStudentData.riskLevel === "needs-attention" && (
                    <AlertBox
                      type="insight"
                      title="Good instinct"
                      message="Your gut feeling to check in is right. A conversation could help."
                      icon={<Lightbulb className="w-5 h-5 text-violet-600" />}
                    />
                  )}
                  {selectedStudentData.riskLevel === "improving" && (
                    <AlertBox
                      type="success"
                      title="Nice progress"
                      message="Keep doing what you're doing. This student is moving in the right direction."
                      icon={
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      }
                    />
                  )}
                  <Button variant="primary" className="w-full">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Set up a time to chat
                    </span>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <span className="inline-flex items-center gap-2">
                      <Eye className="w-4 h-4" /> See past notes
                    </span>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      )}

      {/* Counselor Gamification */}
      <div className="mb-10">
        <h2 className="text-2xl font-black text-gray-800 mb-5 flex items-center gap-3">
          <Target className="w-6 h-6 text-blue-500" /> Your impact
        </h2>
        <GamificationWidget streak={18} points={180} />
      </div>

      {/* Insights */}
      <InsightPanel insights={insights} />
    </div>
  );
};
