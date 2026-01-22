import { NextRequest, NextResponse } from "next/server";
import { getPendingEscalations, acknowledgeEscalation } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const level = searchParams.get("level") as
    | "parent_only"
    | "counselor"
    | "professional"
    | null;

  try {
    const escalations = await getPendingEscalations(level || undefined);
    return NextResponse.json({ escalations });
  } catch (error) {
    console.error("Escalations API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch escalations" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { escalationId, acknowledgedBy } = body;

    if (!escalationId || !acknowledgedBy) {
      return NextResponse.json(
        { error: "Missing escalationId or acknowledgedBy" },
        { status: 400 },
      );
    }

    const success = await acknowledgeEscalation(escalationId, acknowledgedBy);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to acknowledge escalation" },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error("Escalations PATCH API error:", error);
    return NextResponse.json(
      { error: "Failed to update escalation" },
      { status: 500 },
    );
  }
}
