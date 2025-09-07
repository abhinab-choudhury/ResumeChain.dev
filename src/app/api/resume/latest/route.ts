import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resume } from "@/lib/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/resume/latest
 * Returns the latest resume (useful if user only has one active resume).
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { resumeGroupId } = body;

    if (!resumeGroupId) {
      console.log("resumeGroupId field is missing");
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 },
      );
    }

    const latestResume = await db.query.resume.findFirst({
      where: and(
        eq(resume.userId, session.user.id),
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
