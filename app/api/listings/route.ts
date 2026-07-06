import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Category, Condition } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") as Category | null;
  const neighborhood = searchParams.get("neighborhood");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const where: any = { status: "ACTIVE" };
  if (category && Object.keys(Category).includes(category)) {
    where.category = category;
  }
  if (neighborhood) {
    where.neighborhood = { contains: neighborhood, mode: "insensitive" };
  }
  if (search) {
    where.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  const orderBy: any = sort === "price_asc"
    ? { price: "asc" }
    : sort === "price_desc"
    ? { price: "desc" }
    : { createdAt: "desc" };

  const listings = await db.listing.findMany({
    where,
    orderBy,
    include: {
      seller: { select: { id: true, name: true, trustScore: true, neighborhood: true } },
    },
  });

  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, description, price, category, condition, neighborhood, imageUrl, imageUrls } = await req.json();

  if (!title || !description || !price || !category) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const listing = await db.listing.create({
    data: {
      title,
      description,
      price: Number(price),
      category: category as Category,
      condition: (condition as Condition) || "GOOD",
      neighborhood: neighborhood || "",
      imageUrl: imageUrl || null,
      imageUrls: imageUrls || [],
      sellerId: session.user.id,
    },
  });

  return NextResponse.json(listing, { status: 201 });
}