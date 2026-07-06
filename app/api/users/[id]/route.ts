import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const user = await db.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      neighborhood: true,
      avatarUrl: true,
      bio: true,
      trustScore: true,
      isVerified: true,
      createdAt: true,
    },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(user);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (id !== session.user.id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const updated = await db.user.update({
    where: { id },
    data: {
      name: body.name,
      neighborhood: body.neighborhood,
      bio: body.bio,
      avatarUrl: body.avatarUrl,
    },
    select: { id: true, name: true, neighborhood: true, bio: true, avatarUrl: true, trustScore: true, isVerified: true, createdAt: true },
  });

  return NextResponse.json(updated);
}