import { NextRequest, NextResponse } from "next/server";
import { getDailyMetrics, getWeeklyMetricsSummary } from "@/lib/supabase";

const DEFAULT_CHILD_ID = "550e8400-e29b-41d4-a716-446655440000";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const childId = searchParams.get("childId") || DEFAULT_CHILD_ID;
  const days = parseInt(searchParams.get("days") || "7");
  const summary = searchParams.get("summary") === "true";

  try {
    if (summary) {
      const weeklySummary = await getWeeklyMetricsSummary(childId);
      return NextResponse.json(weeklySummary);
    }

    const metrics = await getDailyMetrics(childId, days);
    return NextResponse.json({ metrics });
  } catch (error) {
    console.error("Metrics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch metrics" },
      { status: 500 },
    );
  }
}
