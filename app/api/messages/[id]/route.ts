import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: otherUserId } = await params;
  const url = new URL(req.url);
  const listingId = url.searchParams.get("listingId");

  const where: any = {
    OR: [
      { senderId: session.user.id, receiverId: otherUserId },
      { senderId: otherUserId, receiverId: session.user.id },
    ],
  };

  if (listingId) {
    where.listingId = listingId;
  }

  const messages = await db.message.findMany({
    where,
    include: {
      sender: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "asc" },
  });

  const otherUser = await db.user.findUnique({
    where: { id: otherUserId },
    select: { id: true, name: true },
  });

  return NextResponse.json({ messages, otherUser });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id: senderId } = await params;

  await db.message.updateMany({
    where: {
      senderId,
      receiverId: session.user.id,
      read: false,
    },
    data: { read: true },
  });

  return NextResponse.json({ ok: true });
}