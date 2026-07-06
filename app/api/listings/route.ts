import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

const VALID_CATEGORIES = ["ELECTRONICS", "FURNITURE", "CLOTHING", "BABY_GEAR", "SPORTS", "BOOKS", "HOME_GARDEN", "TOYS", "VEHICLES", "OTHER"];
const VALID_CONDITIONS = ["NEW", "LIKE_NEW", "GOOD", "FAIR"];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const neighborhood = searchParams.get("neighborhood");
  const search = searchParams.get("search");
  const sort = searchParams.get("sort");

  const where: any = { status: "ACTIVE" };
  if (category && VALID_CATEGORIES.includes(category)) {
    where.category = category;
  }
  if (neighborhood) {
    where.neighborhood = { contains: neighborhood };
  }
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  let orderBy: any = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  if (sort === "price_desc") orderBy = { price: "desc" };

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
      category: category,
      condition: VALID_CONDITIONS.includes(condition) ? condition : "GOOD",
      neighborhood: neighborhood || "",
      imageUrl: imageUrl || null,
      imageUrls: JSON.stringify(imageUrls || []),
      sellerId: session.user.id,
    },
  });

  return NextResponse.json(listing, { status: 201 });
}