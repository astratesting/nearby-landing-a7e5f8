import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash("demo123", 10);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@demo.app" },
    update: {},
    create: {
      email: "demo@demo.app",
      name: "Jordan Rivera",
      passwordHash: hash,
      neighborhood: "Bushwick",
      bio: "Love finding good homes for things I no longer need. Bushwick resident for 5 years.",
      trustScore: 42,
      isVerified: true,
    },
  });

  const alice = await prisma.user.upsert({
    where: { email: "alice@example.com" },
    update: {},
    create: {
      email: "alice@example.com",
      name: "Alice Chen",
      passwordHash: hash,
      neighborhood: "Williamsburg",
      bio: "Mom of two, always decluttering. Baby gear and toys coming soon!",
      trustScore: 35,
      isVerified: true,
    },
  });

  const marco = await prisma.user.upsert({
    where: { email: "marco@example.com" },
    update: {},
    create: {
      email: "marco@example.com",
      name: "Marco Diaz",
      passwordHash: hash,
      neighborhood: "Park Slope",
      bio: "Vintage enthusiast, collector of mid-century furniture.",
      trustScore: 28,
      isVerified: true,
    },
  });

  const priya = await prisma.user.upsert({
    where: { email: "priya@example.com" },
    update: {},
    create: {
      email: "priya@example.com",
      name: "Priya Nair",
      passwordHash: hash,
      neighborhood: "Bushwick",
      bio: "New to the neighborhood! Excited to connect with neighbors.",
      trustScore: 15,
      isVerified: true,
    },
  });

  const listings = await Promise.all([
    prisma.listing.create({
      data: {
        sellerId: alice.id,
        title: "Walnut bookshelf, mid-century",
        description: "Solid walnut bookshelf in great condition. 6 shelves, holds plenty. Moving sale — must go this weekend. Sturdy and beautiful. Minor scuff on bottom shelf.",
        price: 120,
        category: "FURNITURE",
        condition: "GOOD",
        neighborhood: "Williamsburg",
      },
    }),
    prisma.listing.create({
      data: {
        sellerId: alice.id,
        title: "Sony WH-1000XM5 headphones",
        description: "Barely used noise-cancelling headphones. Comes with original case and cables. Bought last month, realized I prefer earbuds.",
        price: 220,
        category: "ELECTRONICS",
        condition: "LIKE_NEW",
        neighborhood: "Williamsburg",
      },
    }),
    prisma.listing.create({
      data: {
        sellerId: marco.id,
        title: "Vintage Levis denim jacket",
        description: "Levis 501 trucker jacket, 90s era. Washed to a perfect fade. Size L. No tears or stains.",
        price: 45,
        category: "CLOTHING",
        condition: "GOOD",
        neighborhood: "Park Slope",
      },
    }),
    prisma.listing.create({
      data: {
        sellerId: marco.id,
        title: "Standing desk, adjustable height",
        description: "IKEA Bekant sit/stand desk. Electric motor works perfectly. 63x31 inches. Used for 2 years, no issues. Moving and can't take it.",
        price: 180,
        category: "FURNITURE",
        condition: "GOOD",
        neighborhood: "Park Slope",
      },
    }),
    prisma.listing.create({
      data: {
        sellerId: demoUser.id,
        title: "Graco baby stroller — like new",
        description: "Graco Modes Click Connect. Used maybe 10 times. Clean, no stains. Comes with car seat adapter and rain cover.",
        price: 150,
        category: "BABY_GEAR",
        condition: "LIKE_NEW",
        neighborhood: "Bushwick",
      },
    }),
    prisma.listing.create({
      data: {
        sellerId: demoUser.id,
        title: "KitchenAid stand mixer",
        description: "Artisan 5-quart in matte black. Works perfectly. Comes with all attachments. Downgrading to a smaller one.",
        price: 200,
        category: "HOME_GARDEN",
        condition: "GOOD",
        neighborhood: "Bushwick",
      },
    }),
    prisma.listing.create({
      data: {
        sellerId: priya.id,
        title: "Set of 6 handmade ceramic mugs",
        description: "Handmade Japanese-style ceramic mugs. Each slightly different. Set of 6, all in great shape. Beautiful glaze.",
        price: 35,
        category: "HOME_GARDEN",
        condition: "LIKE_NEW",
        neighborhood: "Bushwick",
      },
    }),
    prisma.listing.create({
      data: {
        sellerId: priya.id,
        title: "Science fiction paperback lot",
        description: "About 15 sci-fi paperbacks. Le Guin, Dick, Butler, etc. Take the whole lot. No highlights or dog-ears.",
        price: 20,
        category: "BOOKS",
        condition: "GOOD",
        neighborhood: "Bushwick",
      },
    }),
  ]);

  await Promise.all([
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Great buyer, smooth pickup. Books were exactly as described.",
        reviewerId: demoUser.id,
        reviewedId: priya.id,
        listingId: listings[7].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Headphones work great. Seller was responsive and friendly.",
        reviewerId: priya.id,
        reviewedId: alice.id,
        listingId: listings[1].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Quick and easy transaction. Mixer works perfectly — thanks!",
        reviewerId: marco.id,
        reviewedId: demoUser.id,
        listingId: listings[5].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 5,
        comment: "Beautiful bookshelf. Jordan was a pleasure to work with.",
        reviewerId: alice.id,
        reviewedId: demoUser.id,
        listingId: listings[5].id,
      },
    }),
    prisma.review.create({
      data: {
        rating: 4,
        comment: "Nice jacket, exactly as described. Would buy from Marco again.",
        reviewerId: demoUser.id,
        reviewedId: marco.id,
        listingId: listings[2].id,
      },
    }),
  ]);

  console.log("Seed complete. Created:");
  console.log(`  Users: ${[demoUser, alice, marco, priya].length}`);
  console.log(`  Listings: ${listings.length}`);
  console.log(`  Reviews: 5`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });