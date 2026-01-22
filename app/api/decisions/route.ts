import { NextRequest, NextResponse } from "next/server";
import { getRecentDecisions, getDecisionStats } from "@/lib/supabase";

const DEFAULT_CHILD_ID = "550e8400-e29b-41d4-a716-446655440000";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const childId = searchParams.get("childId") || DEFAULT_CHILD_ID;
  const limit = parseInt(searchParams.get("limit") || "10");
  const includeStats = searchParams.get("includeStats") === "true";

  try {
    const decisions = await getRecentDecisions(childId, limit);

    let stats = null;
    if (includeStats) {
      stats = await getDecisionStats(childId, 30);
    }

    return NextResponse.json({
      decisions,
      stats,
    });
  } catch (error) {
    console.error("Decisions API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch decisions" },
      { status: 500 },
    );
  }
}
