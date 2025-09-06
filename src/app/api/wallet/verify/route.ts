import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { web3Credential } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { verifyMessage } from "ethers";
import { NextResponse } from "next/server";

// POST /api/wallet/verify
export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) return new Response("Unauthorized", { status: 401 });

  const { address, signature, message } = await req.json();
  if (!address || !signature || !message) {
    return new Response("Missing fields", { status: 400 });
  }

  try {
    const record = await db.query.web3Credential.findFirst({
      where: eq(web3Credential.userId, session.user.id),
    });
    if (!record)
      return NextResponse.json({ error: "Wallet not found" }, { status: 400 });
    if (!record.nonce)
      return new Response("Nonce not generated", { status: 400 });

    const recovered = verifyMessage(message, signature);

    if (recovered.toLowerCase() !== address.toLowerCase()) {
      return new Response("Signature mismatch", { status: 400 });
    }

    await db
      .insert(web3Credential)
      .values({
        id: crypto.randomUUID(),
        userId: session.user.id,
        nonce: record.nonce,
        walletAddress: address.toLowerCase(),
        walletVerified: true,
      })
      .onConflictDoUpdate({
        target: web3Credential.userId,
        set: { walletAddress: address.toLowerCase(), walletVerified: true },
      });

    return Response.json({ success: true, wallet: address });
  } catch (err) {
    console.error(err);
    return new Response("Verification failed", { status: 500 });
  }
}
