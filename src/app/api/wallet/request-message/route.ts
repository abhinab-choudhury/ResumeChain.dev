import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { web3Credential } from "@/lib/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// POST /api/wallet/request-message
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { address } = await req.json();

  if (!address) return new Response("Missing wallet address", { status: 400 });

  const nonce = randomUUID();
  await db
    .insert(web3Credential)
    .values({
      id: crypto.randomUUID(),
      userId: session.user.id,
      walletAddress: null,
      nonce,
      walletVerified: false,
    })
    .onConflictDoUpdate({
      target: web3Credential.userId,
      set: { nonce },
    });

  return NextResponse.json(
    {
      success: true,
      message: `Sign this message to verify: ${nonce}`,
    },
    { status: 200 },
  );
}
