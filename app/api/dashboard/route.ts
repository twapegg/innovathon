import { NextRequest, NextResponse } from "next/server";
import {
  getParentDashboardData,
  getCounselorDashboardData,
  getProfessionalDashboardData,
} from "@/lib/supabase";

// Default child ID for demo purposes
const DEFAULT_CHILD_ID = "550e8400-e29b-41d4-a716-446655440000";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const role = searchParams.get("role") || "parent";
  const childId = searchParams.get("childId") || DEFAULT_CHILD_ID;

  try {
    let data;

    switch (role) {
      case "parent":
        data = await getParentDashboardData(childId);
        break;
      case "counselor":
        data = await getCounselorDashboardData();
        break;
      case "professional":
        data = await getProfessionalDashboardData();
        break;
      default:
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 },
    );
  }
}
