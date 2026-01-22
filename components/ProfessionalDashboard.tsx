"use client";

import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  BarChart3,
  FolderOpen,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  MessageSquare,
  Calendar,
  FileBarChart,
  ClipboardList,
  Bot,
  Target,
} from "lucide-react";
import { StatCard, Card, Button, AlertBox } from "./SharedComponents";
import { BarChartComponent, SimpleLineChart } from "./Charts";
import { COLORS } from "./SharedComponents";
import { mockProfessionalCases } from "@/lib/mockData";
import type {
  Child,
  DailyMetric,
  BehavioralFinding,
  AgenticDecision,
  Escalation,
} from "@/lib/types";

// Extended case type for professional view
interface CaseData extends Child {
  escalations: Escalation[];
  allFindings: BehavioralFinding[];
  allDecisions: AgenticDecision[];
  weeklyMetrics: DailyMetric[];
  riskScore: number;
  caseStatus: "active" | "monitoring" | "resolved";
  createdAt: string;
}

interface ProfessionalDashboardData {
  cases: CaseData[];
  totalEscalations: number;
  activeAlerts: number;
}

const generateMockProfessionalData = (): ProfessionalDashboardData => {
  const cases = mockProfessionalCases();

  return {
    cases,
    totalEscalations: cases.reduce((sum, c) => sum + c.escalations.length, 0),
    activeAlerts: cases.filter((c) =>
      c.escalations.some((e) => e.status === "pending"),
    ).length,
  };
};

export const ProfessionalDashboard: React.FC = () => {
  const [data, setData] = useState<ProfessionalDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);
  const [expandedEscalation, setExpandedEscalation] = useState<string | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<
    "overview" | "cases" | "analytics"
  >("overview");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard?view=professional");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          // Use mock data for demo
          setData(generateMockProfessionalData());
        }
      } catch (error) {
        console.log("Using mock data for demo mode");
        setData(generateMockProfessionalData());
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const acknowledgeEscalation = async (escalationId: string) => {
    if (!data) return;

    try {
      await fetch("/api/escalations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          escalationId,
          acknowledgedBy: "Dr. Current User",
        }),
      });
    } catch (error) {
      console.log("Demo mode: simulating acknowledgment");
    }

    // Update local state
    setData({
      ...data,
      cases: data.cases.map((c) => ({
        ...c,
        escalations: c.escalations.map((e) =>
          e.id === escalationId
            ? {
                ...e,
                status: "acknowledged" as const,
                acknowledgedAt: new Date().toISOString(),
                acknowledgedBy: "Dr. Current User",
              }
            : e,
        ),
      })),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading case data...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.cases || data.cases.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No case data available</p>
        </div>
      </div>
    );
  }

  const activeCases = data.cases.filter((c) => c.caseStatus === "active");
  const monitoringCases = data.cases.filter(
    (c) => c.caseStatus === "monitoring",
  );
  const pendingEscalations = data.cases.flatMap((c) =>
    c.escalations.filter((e) => e.status === "pending"),
  );

  // Calculate aggregate trends from all cases
  const aggregateTrends = Array.from({ length: 14 }, (_, i) => {
    const dayMetrics = data.cases.flatMap((c) =>
      c.weeklyMetrics.filter((_, idx) => idx === i),
    );
    const avgSocial =
      dayMetrics.reduce((sum, m) => sum + (m.moodIndicators?.social || 0), 0) /
        dayMetrics.length || 0;
    const avgSleep =
      dayMetrics.reduce((sum, m) => sum + (m.moodIndicators?.sleep || 0), 0) /
        dayMetrics.length || 0;
    const avgEmotional =
      dayMetrics.reduce(
        (sum, m) => sum + (m.moodIndicators?.emotional || 0),
        0,
      ) / dayMetrics.length || 0;

    return {
      day: `Day ${i + 1}`,
      wellbeingScore: Math.round((avgSocial + avgSleep + avgEmotional) / 3),
      engagementScore: Math.round(avgSocial),
      resilienceScore: Math.round((avgSleep + avgEmotional) / 2),
    };
  });

  const latestTrend = aggregateTrends[aggregateTrends.length - 1];

  const getRiskColor = (score: number) => {
    if (score >= 70) return "text-red-600 bg-red-50 border-red-200";
    if (score >= 40) return "text-amber-600 bg-amber-50 border-amber-200";
    return "text-green-600 bg-green-50 border-green-200";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-700 border-red-200";
      case "monitoring":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "resolved":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-amber-500 text-white";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 tracking-tight">
          Professional Dashboard
        </h1>
        <p className="text-gray-500 text-base">
          Clinical case management powered by AI behavioral analysis
        </p>
      </div>

      {/* Urgent Alerts Banner */}
      {pendingEscalations.length > 0 && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl shadow-lg text-white">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 animate-pulse" />
            <div>
              <h3 className="font-bold text-lg">
                {pendingEscalations.length} Urgent Case
                {pendingEscalations.length > 1 ? "s" : ""} Requiring Attention
              </h3>
              <p className="text-red-100 text-sm">
                {pendingEscalations
                  .map((e) => {
                    const caseData = data.cases.find(
                      (c) => c.id === e.child_id,
                    );
                    return caseData?.name;
                  })
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
            <button
              onClick={() => setActiveTab("cases")}
              className="ml-auto bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-50 transition-all"
            >
              Review Cases
            </button>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8">
        {(["overview", "cases", "analytics"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === tab
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {tab === "overview" && (
              <span className="inline-flex items-center gap-2">
                <BarChart3 className="w-4 h-4" /> Overview
              </span>
            )}
            {tab === "cases" && (
              <span className="inline-flex items-center gap-2">
                <FolderOpen className="w-4 h-4" /> Case Management
              </span>
            )}
            {tab === "analytics" && (
              <span className="inline-flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Analytics
              </span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
          {/* Case Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <StatCard
              label="Active Cases"
              value={activeCases.length}
              color="#ef4444"
            />
            <StatCard
              label="Monitoring"
              value={monitoringCases.length}
              color="#f59e0b"
            />
            <StatCard
              label="Resolved"
              value={
                data.cases.filter((c) => c.caseStatus === "resolved").length
              }
              color="#22c55e"
            />
            <StatCard
              label="Pending Escalations"
              value={pendingEscalations.length}
              color="#ef4444"
            />
            <StatCard
              label="Avg Wellbeing"
              value={latestTrend.wellbeingScore}
              color={COLORS.primary}
            />
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SimpleLineChart
              title="Aggregate Client Wellbeing Trends"
              data={aggregateTrends}
              dataKey="wellbeingScore"
              color={COLORS.primary}
            />
            <BarChartComponent
              title="Multi-dimensional Analysis"
              data={aggregateTrends.slice(-7)}
              bars={[
                {
                  key: "wellbeingScore",
                  name: "Wellbeing",
                  color: COLORS.primary,
                },
                {
                  key: "engagementScore",
                  name: "Social",
                  color: COLORS.secondaryAccent,
                },
                {
                  key: "resilienceScore",
                  name: "Resilience",
                  color: COLORS.accentWarm,
                },
              ]}
            />
          </div>

          {/* Quick Case Overview */}
          <Card
            title="Case Summary"
            icon={<ClipboardList className="w-5 h-5 text-blue-500" />}
          >
            <div className="space-y-3">
              {data.cases.map((caseData) => (
                <div
                  key={caseData.id}
                  onClick={() => {
                    setSelectedCase(caseData);
                    setActiveTab("cases");
                  }}
                  className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${getRiskColor(caseData.riskScore)}`}
                    >
                      {caseData.riskScore}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {caseData.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Age {caseData.age} • {caseData.allFindings.length}{" "}
                        findings • {caseData.allDecisions.length} decisions
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(caseData.caseStatus)}`}
                    >
                      {caseData.caseStatus}
                    </span>
                    {caseData.escalations.some(
                      (e) => e.status === "pending",
                    ) && (
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        URGENT
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {activeTab === "cases" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Case List */}
          <div className="lg:col-span-1">
            <Card title="📁 All Cases">
              <div className="space-y-2">
                {data.cases.map((caseData) => (
                  <div
                    key={caseData.id}
                    onClick={() => setSelectedCase(caseData)}
                    className={`p-4 rounded-xl cursor-pointer transition-all ${
                      selectedCase?.id === caseData.id
                        ? "bg-blue-50 border-2 border-blue-300"
                        : "border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">
                        {caseData.name}
                      </h4>
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${getSeverityBadge(
                          caseData.riskScore >= 70
                            ? "high"
                            : caseData.riskScore >= 40
                              ? "medium"
                              : "low",
                        )}`}
                      >
                        Risk: {caseData.riskScore}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      {
                        caseData.escalations.filter(
                          (e) => e.status === "pending",
                        ).length
                      }{" "}
                      pending alerts
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Case Details */}
          <div className="lg:col-span-2">
            {selectedCase ? (
              <div className="space-y-6">
                {/* Case Header */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {selectedCase.name}
                      </h2>
                      <p className="text-gray-500">
                        Age {selectedCase.age} • Case opened{" "}
                        {new Date(selectedCase.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-lg font-bold border ${getStatusBadge(selectedCase.caseStatus)}`}
                    >
                      {selectedCase.caseStatus.charAt(0).toUpperCase() +
                        selectedCase.caseStatus.slice(1)}
                    </span>
                  </div>

                  {/* Risk Meter */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 font-medium">
                        Risk Assessment
                      </span>
                      <span
                        className={`font-bold ${selectedCase.riskScore >= 70 ? "text-red-600" : selectedCase.riskScore >= 40 ? "text-amber-600" : "text-green-600"}`}
                      >
                        {selectedCase.riskScore}/100
                      </span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          selectedCase.riskScore >= 70
                            ? "bg-red-500"
                            : selectedCase.riskScore >= 40
                              ? "bg-amber-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${selectedCase.riskScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Escalations */}
                {selectedCase.escalations.length > 0 && (
                  <Card
                    title="Escalation History"
                    icon={<AlertCircle className="w-5 h-5 text-red-500" />}
                  >
                    <div className="space-y-4">
                      {selectedCase.escalations.map((escalation) => (
                        <div
                          key={escalation.id}
                          className={`rounded-xl border-2 overflow-hidden ${
                            escalation.status === "pending"
                              ? "border-red-300 bg-red-50"
                              : "border-gray-200"
                          }`}
                        >
                          <div
                            onClick={() =>
                              setExpandedEscalation(
                                expandedEscalation === escalation.id
                                  ? null
                                  : escalation.id,
                              )
                            }
                            className="p-4 cursor-pointer"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span
                                    className={`px-2 py-1 rounded text-xs font-bold ${getSeverityBadge(escalation.severity || "medium")}`}
                                  >
                                    {(
                                      escalation.severity || "medium"
                                    ).toUpperCase()}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {escalation.escalatedAt
                                      ? new Date(
                                          escalation.escalatedAt,
                                        ).toLocaleString()
                                      : "Unknown"}
                                  </span>
                                </div>
                                <h4 className="font-bold text-gray-800">
                                  {escalation.headline || escalation.reason}
                                </h4>
                              </div>
                              <span className="text-xl">
                                {expandedEscalation === escalation.id
                                  ? "−"
                                  : "+"}
                              </span>
                            </div>
                          </div>

                          {expandedEscalation === escalation.id && (
                            <div className="px-4 pb-4 border-t border-gray-200 pt-4">
                              <div className="mb-4">
                                <h5 className="font-bold text-gray-700 mb-2">
                                  Detailed Summary
                                </h5>
                                <p className="text-sm text-gray-600">
                                  {escalation.detailedSummary}
                                </p>
                              </div>

                              <div className="mb-4">
                                <h5 className="font-bold text-gray-700 mb-2">
                                  Trigger Findings
                                </h5>
                                <ul className="list-disc list-inside text-sm text-gray-600">
                                  {(escalation.triggerFindings || []).map(
                                    (f, i) => (
                                      <li key={i}>{f}</li>
                                    ),
                                  )}
                                </ul>
                              </div>

                              <div className="mb-4">
                                <h5 className="font-bold text-gray-700 mb-2">
                                  Recommended Next Steps
                                </h5>
                                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                                  {(escalation.recommendedNextSteps || []).map(
                                    (step, i) => (
                                      <li key={i}>{step}</li>
                                    ),
                                  )}
                                </ol>
                              </div>

                              {escalation.status === "pending" ? (
                                <button
                                  onClick={() =>
                                    acknowledgeEscalation(escalation.id)
                                  }
                                  className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition-all inline-flex items-center justify-center gap-2"
                                >
                                  <CheckCircle className="w-4 h-4" />{" "}
                                  Acknowledge & Begin Case Work
                                </button>
                              ) : (
                                <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg inline-flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4" />{" "}
                                  Acknowledged by {escalation.acknowledgedBy} on{" "}
                                  {new Date(
                                    escalation.acknowledgedAt!,
                                  ).toLocaleString()}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Decision History */}
                <Card
                  title="AI Decision History"
                  icon={<Bot className="w-5 h-5 text-violet-500" />}
                >
                  <div className="space-y-3">
                    {selectedCase.allDecisions.map((decision) => (
                      <div
                        key={decision.id}
                        className="p-4 rounded-xl border-2 border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              decision.decision === "escalate"
                                ? "bg-red-100 text-red-700"
                                : decision.decision === "brief_parent"
                                  ? "bg-purple-100 text-purple-700"
                                  : decision.decision === "nudge_youth"
                                    ? "bg-blue-100 text-blue-700"
                                    : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {decision.decision.replace("_", " ").toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(decision.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {decision.reasoning}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            Confidence:
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500"
                              style={{
                                width: `${decision.confidenceScore * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-xs font-bold text-gray-700">
                            {Math.round(decision.confidenceScore * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Behavioral Findings */}
                <Card title="🔍 Behavioral Findings">
                  <div className="space-y-3">
                    {selectedCase.allFindings.map((finding) => (
                      <div
                        key={finding.id}
                        className="p-4 rounded-xl border-2 border-gray-100"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${getSeverityBadge(finding.severity)}`}
                          >
                            {finding.severity}
                          </span>
                          <span className="text-xs text-gray-500 ml-auto">
                            {new Date(finding.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 font-medium">
                          {finding.title}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {finding.evidence.metric_name}:{" "}
                          {finding.evidence.baseline_value} →{" "}
                          {finding.evidence.recent_value}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-gray-500">
                            AI Confidence:
                          </span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-32">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${finding.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-bold">
                            {Math.round(finding.confidence * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                <FolderOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Select a Case
                </h3>
                <p className="text-gray-500">
                  Choose a case from the list to view detailed information
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <>
          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SimpleLineChart
              title="14-Day Wellbeing Trend (All Clients)"
              data={aggregateTrends}
              dataKey="wellbeingScore"
              color={COLORS.primary}
            />
            <BarChartComponent
              title="Weekly Dimensional Analysis"
              data={aggregateTrends.slice(-7)}
              bars={[
                {
                  key: "wellbeingScore",
                  name: "Wellbeing",
                  color: COLORS.primary,
                },
                {
                  key: "engagementScore",
                  name: "Social",
                  color: COLORS.secondaryAccent,
                },
                {
                  key: "resilienceScore",
                  name: "Resilience",
                  color: COLORS.accentWarm,
                },
              ]}
            />
          </div>

          {/* Decision Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card
              title="AI Decision Distribution"
              icon={<Bot className="w-5 h-5 text-violet-500" />}
            >
              <div className="space-y-4">
                {["hold", "nudge_youth", "brief_parent", "escalate"].map(
                  (decision) => {
                    const count = data.cases.reduce(
                      (sum, c) =>
                        sum +
                        c.allDecisions.filter((d) => d.decision === decision)
                          .length,
                      0,
                    );
                    const total = data.cases.reduce(
                      (sum, c) => sum + c.allDecisions.length,
                      0,
                    );
                    const percentage = total > 0 ? (count / total) * 100 : 0;

                    return (
                      <div key={decision}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700 capitalize">
                            {decision.replace("_", " ")}
                          </span>
                          <span className="text-gray-500">
                            {count} ({Math.round(percentage)}%)
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              decision === "escalate"
                                ? "bg-red-500"
                                : decision === "brief_parent"
                                  ? "bg-purple-500"
                                  : decision === "nudge_youth"
                                    ? "bg-blue-500"
                                    : "bg-green-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </Card>

            <Card
              title="Finding Themes"
              icon={<BarChart3 className="w-5 h-5 text-blue-500" />}
            >
              <div className="space-y-4">
                {["social", "sleep", "emotional", "screen_time", "routine"].map(
                  (theme) => {
                    const count = data.cases.reduce(
                      (sum, c) =>
                        sum +
                        c.allFindings.filter((f) => {
                          // Map metric names to themes
                          const metricTheme = f.evidence.metric_name.includes(
                            "sleep",
                          )
                            ? "sleep"
                            : f.evidence.metric_name.includes("screen") ||
                                f.evidence.metric_name.includes("games")
                              ? "screen_time"
                              : f.evidence.metric_name.includes("checkin")
                                ? "social"
                                : f.evidence.metric_name.includes("activity")
                                  ? "activity"
                                  : f.evidence.metric_name.includes("routine")
                                    ? "routine"
                                    : "other";
                          return metricTheme === theme;
                        }).length,
                      0,
                    );
                    const total = data.cases.reduce(
                      (sum, c) => sum + c.allFindings.length,
                      0,
                    );
                    const percentage = total > 0 ? (count / total) * 100 : 0;

                    return (
                      <div key={theme}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium text-gray-700 capitalize">
                            {theme.replace("_", " ")}
                          </span>
                          <span className="text-gray-500">
                            {count} findings
                          </span>
                        </div>
                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              theme === "social"
                                ? "bg-blue-500"
                                : theme === "sleep"
                                  ? "bg-purple-500"
                                  : theme === "emotional"
                                    ? "bg-pink-500"
                                    : theme === "screen_time"
                                      ? "bg-amber-500"
                                      : "bg-green-500"
                            }`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </Card>
          </div>

          {/* Clinical Recommendations */}
          <Card
            title="AI-Generated Clinical Insights"
            icon={<Target className="w-5 h-5 text-blue-500" />}
          >
            <div className="space-y-4">
              <AlertBox
                type="insight"
                title="Cross-Case Pattern Analysis"
                message={`Across ${data.cases.length} cases, social isolation appears as the most common precursor to escalation events. Consider group intervention strategies.`}
                icon={<TrendingUp className="w-5 h-5 text-violet-600" />}
              />
              <AlertBox
                type={activeCases.length > 0 ? "warning" : "success"}
                title="Caseload Status"
                message={
                  activeCases.length > 0
                    ? `${activeCases.length} case(s) require active intervention. Prioritize ${activeCases[0]?.name} based on risk score.`
                    : "All cases are stable or resolved. Continue monitoring protocols."
                }
                icon={
                  activeCases.length > 0 ? (
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  )
                }
              />
              <AlertBox
                type="info"
                title="Recommended Focus Areas"
                message="Sleep hygiene and social reconnection show strongest correlation with positive outcomes in resolved cases."
                icon={<ClipboardList className="w-5 h-5 text-blue-600" />}
              />
            </div>
          </Card>
        </>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <div
          className="rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer"
          style={{
            borderColor: `${COLORS.primary}50`,
            background: `linear-gradient(135deg, ${COLORS.primary}15 0%, ${COLORS.primary}05 100%)`,
          }}
        >
          <h3 className="font-black text-gray-800 mb-2 flex items-center gap-2">
            <FileBarChart className="w-5 h-5 text-blue-500" /> Export Case
            Report
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Generate comprehensive PDF for records
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
          <h3 className="font-black text-gray-800 mb-2 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-500" /> Add Clinical
            Note
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Document session observations
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
          <h3 className="font-black text-gray-800 mb-2 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" /> Schedule Follow-up
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Plan next intervention session
          </p>
          <Button variant="outline" className="w-full text-sm">
            Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};
