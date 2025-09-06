import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { resume, user } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { useId } from "react";

/**
 * GET /api/resume/list
 * Returns all latest resumes for the logged-in user.
 */
export default async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return new Response("Unauthorized", { status: 401 });

    const userResume = await db.query.resume.findMany({
      where: eq(resume.userId, session.user.id),
      orderBy: desc(resume.createdAt),
    });

    return NextResponse.json({ success: true, resume: userResume });
  } catch (err) {
    console.log("Error(GET /api/resume/list): ", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
