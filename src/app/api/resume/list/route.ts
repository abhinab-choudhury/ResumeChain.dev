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
    const body = await req.json();
    const { userId } = body;

    if (!useId) {
      console.log("userId field is missing");
      return NextResponse.json(
        { message: "Missing required field" },
        { status: 400 },
      );
    }

    const userResume = await db.query.resume.findMany({
      where: eq(resume.userId, userId),
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
