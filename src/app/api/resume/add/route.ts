import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { and, eq, desc } from "drizzle-orm";
import { resume } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

/**
 * POST /api/resume/add
 * Create a new resume (or new version if resumeGroupId is passed).
 * Marks all old versions isLatest=false.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const { title, content, resumeGroupId } = body;

    if (!title || !content) {
      console.log("title or content filed/s is/are missing");
      return NextResponse.json(
        { error: "Missing required field" },
        { status: 400 },
      );
    }

    let version = 1;
    let groupId = resumeGroupId;

    if (resumeGroupId) {
      await db
        .update(resume)
        .set({ isLatest: false })
        .where(
          and(
            eq(resume.userId, session.user.id),
            eq(resume.resumeGroupId, resumeGroupId),
          ),
        );

      const latest = await db.query.resume.findFirst({
        where: and(
          eq(resume.userId, session.user.id),
          eq(resume.resumeGroupId, resumeGroupId),
        ),
        orderBy: desc(resume.version),
      });
      if (latest) version = latest.version + 1;
    } else {
      groupId = crypto.randomUUID();
    }

    const [newResume] = await db
      .insert(resume)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        title,
        content,
        resumeGroupId: groupId,
        version,
        isLatest: true,
      })
      .returning();

    return NextResponse.json({ success: true, resume: newResume });
  } catch (err) {
    console.error("Error(POST /api/resume/add): ", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
