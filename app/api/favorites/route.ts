import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const favorites = await db.favorite.findMany({
    where: { userId: session.user.id },
    include: {
      listing: {
        include: { seller: { select: { id: true, name: true, trustScore: true, neighborhood: true } } },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(favorites);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listingId } = await req.json();
  if (!listingId) {
    return NextResponse.json({ error: "listingId is required." }, { status: 400 });
  }

  const existing = await db.favorite.findFirst({
    where: { userId: session.user.id, listingId },
  });

  if (existing) {
    await db.favorite.delete({ where: { id: existing.id } });
    return NextResponse.json({ favorited: false });
  }

  await db.favorite.create({
    data: { userId: session.user.id, listingId },
  });

  return NextResponse.json({ favorited: true });
}