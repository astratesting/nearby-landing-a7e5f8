import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) return NextResponse.json({ error: "userId is required." }, { status: 400 });

  const reviews = await db.review.findMany({
    where: { reviewedId: userId },
    include: { reviewer: { select: { id: true, name: true, trustScore: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { reviewedId, listingId, rating, comment } = await req.json();

  if (!reviewedId || !rating || !comment?.trim()) {
    return NextResponse.json({ error: "reviewedId, rating, and comment are required." }, { status: 400 });
  }

  if (reviewedId === session.user.id) {
    return NextResponse.json({ error: "Cannot review yourself." }, { status: 400 });
  }

  const existing = await db.review.findFirst({
    where: { reviewerId: session.user.id, reviewedId },
  });
  if (existing) {
    return NextResponse.json({ error: "You already reviewed this user." }, { status: 409 });
  }

  const r = await db.review.create({
    data: {
      rating: Number(rating),
      comment: comment.trim(),
      reviewerId: session.user.id,
      reviewedId,
      listingId: listingId || null,
    },
    include: { reviewer: { select: { id: true, name: true, trustScore: true } } },
  });

  const avg = await db.review.aggregate({
    where: { reviewedId },
    _avg: { rating: true },
    _count: { rating: true },
  });

  if (avg._avg.rating != null) {
    await db.user.update({
      where: { id: reviewedId },
      data: { trustScore: Math.round(avg._avg.rating * 10) },
    });
  }

  return NextResponse.json(r, { status: 201 });
}