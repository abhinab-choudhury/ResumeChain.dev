import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { web3Credential } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// GET /api/wallet/credential
export async function GET(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response("Unauthorized", { status: 401 });

  const record = await db.query.web3Credential.findFirst({
    where: eq(web3Credential.userId, session.user.id),
  });

  if (!record)
    return NextResponse.json(
      {
        error: "Wallet not connected to user account",
        wallet: null,
      },
      { status: 400 },
    );

  return NextResponse.json(
    {
      success: true,
      wallet: record.walletAddress,
      verified: record.walletVerified,
    },
    { status: 200 },
  );
}
