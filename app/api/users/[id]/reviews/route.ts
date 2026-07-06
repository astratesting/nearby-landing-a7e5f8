import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const reviews = await db.review.findMany({
    where: { reviewedId: id },
    include: { reviewer: { select: { id: true, name: true, trustScore: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(reviews);
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { listingId, rating, comment } = await req.json();

  if (!rating || !comment?.trim()) {
    return NextResponse.json({ error: "rating and comment are required." }, { status: 400 });
  }

  if (id === session.user.id) {
    return NextResponse.json({ error: "Cannot review yourself." }, { status: 400 });
  }

  const existing = await db.review.findFirst({
    where: { reviewerId: session.user.id, reviewedId: id },
  });
  if (existing) {
    return NextResponse.json({ error: "You already reviewed this user." }, { status: 409 });
  }

  const r = await db.review.create({
    data: {
      rating: Number(rating),
      comment: comment.trim(),
      reviewerId: session.user.id,
      reviewedId: id,
      listingId: listingId || null,
    },
    include: { reviewer: { select: { id: true, name: true, trustScore: true } } },
  });

  const avg = await db.review.aggregate({
    where: { reviewedId: id },
    _avg: { rating: true },
    _count: { rating: true },
  });

  if (avg._avg.rating != null) {
    await db.user.update({
      where: { id },
      data: { trustScore: Math.round(avg._avg.rating * 10) },
    });
  }

  return NextResponse.json(r, { status: 201 });
}