import { db } from "@/lib/db";
import { resume } from "@/lib/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/resume/latest
 * Returns the latest resume (useful if user only has one active resume).
 */
export default async function GET(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, resumeGroupId } = body;

    if (!userId || !resumeGroupId) {
      console.log("userId or resumeGroupId field/s is/are missing");
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 },
      );
    }

    const latestResume = await db.query.resume.findFirst({
      where: and(
        eq(resume.userId, userId),
        eq(resume.resumeGroupId, resumeGroupId),
      ),
      orderBy: desc(resume.version),
    });

    return NextResponse.json({ success: true, resume: latestResume });
  } catch (err) {
    console.log("Error(GET /api/resume/latest): " + err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
