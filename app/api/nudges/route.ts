import { NextRequest, NextResponse } from "next/server";
import {
  getRecentNudges,
  getPendingNudges,
  updateNudgeStatus,
} from "@/lib/supabase";

const DEFAULT_CHILD_ID = "550e8400-e29b-41d4-a716-446655440000";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const childId = searchParams.get("childId") || DEFAULT_CHILD_ID;
  const pending = searchParams.get("pending") === "true";
  const limit = parseInt(searchParams.get("limit") || "5");

  try {
    const nudges = pending
      ? await getPendingNudges(childId)
      : await getRecentNudges(childId, limit);

    return NextResponse.json({ nudges });
  } catch (error) {
    console.error("Nudges API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch nudges" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { nudgeId, status } = body;

    if (!nudgeId || !status) {
      return NextResponse.json(
        { error: "Missing nudgeId or status" },
        { status: 400 },
      );
    }

    const validStatuses = ["shown", "completed", "snoozed", "dismissed"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const success = await updateNudgeStatus(nudgeId, status);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to update nudge" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Nudges PATCH API error:", error);
    return NextResponse.json(
      { error: "Failed to update nudge" },
      { status: 500 },
    );
  }
}
