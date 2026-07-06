import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;

  const messages = await db.message.findMany({
    where: {
      OR: [{ senderId: userId }, { receiverId: userId }],
    },
    include: {
      sender: { select: { id: true, name: true } },
      receiver: { select: { id: true, name: true } },
      listing: { select: { id: true, title: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Group into conversations by the other user
  const conversationsMap = new Map<string, {
    otherUser: { id: string; name: string };
    listingId: string | null;
    listingTitle: string | null;
    lastMessage: string;
    lastMessageAt: Date;
    unreadCount: number;
  }>();

  for (const msg of messages) {
    const otherUser = msg.senderId === userId ? msg.receiver : msg.sender;
    const key = `${otherUser.id}_${msg.listingId || "no-listing"}`;

    if (!conversationsMap.has(key)) {
      conversationsMap.set(key, {
        otherUser,
        listingId: msg.listingId,
        listingTitle: msg.listing?.title ?? null,
        lastMessage: msg.content,
        lastMessageAt: msg.createdAt,
        unreadCount: 0,
      });
    }

    if (!msg.read && msg.receiverId === userId) {
      const conv = conversationsMap.get(key)!;
      conv.unreadCount++;
    }
  }

  const conversations = Array.from(conversationsMap.values()).sort(
    (a, b) => b.lastMessageAt.getTime() - a.lastMessageAt.getTime()
  );

  return NextResponse.json(conversations);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { content, receiverId, listingId } = await req.json();

  if (!content?.trim() || !receiverId) {
    return NextResponse.json({ error: "content and receiverId are required." }, { status: 400 });
  }

  const message = await db.message.create({
    data: {
      content: content.trim(),
      senderId: session.user.id,
      receiverId,
      listingId: listingId || null,
    },
    include: {
      sender: { select: { id: true, name: true } },
      receiver: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(message, { status: 201 });
}