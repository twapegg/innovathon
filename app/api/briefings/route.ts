import { NextRequest, NextResponse } from "next/server";
import {
  getRecentBriefings,
  getUnreadBriefings,
  markBriefingAsRead,
} from "@/lib/supabase";

const DEFAULT_CHILD_ID = "550e8400-e29b-41d4-a716-446655440000";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const childId = searchParams.get("childId") || DEFAULT_CHILD_ID;
  const unreadOnly = searchParams.get("unread") === "true";
  const limit = parseInt(searchParams.get("limit") || "5");

  try {
    const briefings = unreadOnly
      ? await getUnreadBriefings(childId)
      : await getRecentBriefings(childId, limit);

    return NextResponse.json({ briefings });
  } catch (error) {
    console.error("Briefings API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch briefings" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { briefingId } = body;

    if (!briefingId) {
      return NextResponse.json(
        { error: "Missing briefingId" },
        { status: 400 },
      );
    }

    const success = await markBriefingAsRead(briefingId);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to mark briefing as read" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Briefings PATCH API error:", error);
    return NextResponse.json(
      { error: "Failed to update briefing" },
      { status: 500 },
    );
  }
}
