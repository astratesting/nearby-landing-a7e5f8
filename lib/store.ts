import bcrypt from 'bcryptjs';
import type {
  User,
  Listing,
  Thread,
  Message,
  Review,
  Category,
  CategorySlug,
} from './types';

let _id = 100;
function uid() {
  return `id_${++_id}`;
}

export const CATEGORIES: Category[] = [
  { slug: 'furniture', name: 'Furniture' },
  { slug: 'electronics', name: 'Electronics' },
  { slug: 'clothing', name: 'Clothing' },
  { slug: 'books', name: 'Books' },
  { slug: 'home', name: 'Home Goods' },
  { slug: 'other', name: 'Other' },
];

const hash = (pw: string) => bcrypt.hashSync(pw, 10);

class Store {
  users: User[] = [];
  listings: Listing[] = [];
  threads: Thread[] = [];
  messages: Message[] = [];
  reviews: Review[] = [];
  categories: Category[] = CATEGORIES;

  constructor() {
    this.seed();
  }

  private seed() {
    const now = Date.now();
    const day = 86400000;

    // Demo users
    const demoUser: User = {
      id: 'u1',
      email: 'demo@demo.app',
      passwordHash: hash('demo123'),
      name: 'Jordan Rivera',
      neighborhood: 'Bushwick',
      role: 'admin',
      disabled: false,
      emailVerified: true,
      createdAt: now - 90 * day,
    };

    const alice: User = {
      id: 'u2',
      email: 'alice@example.com',
      passwordHash: hash('password123'),
      name: 'Alice Chen',
      neighborhood: 'Williamsburg',
      role: 'user',
      disabled: false,
      emailVerified: true,
      createdAt: now - 60 * day,
    };

    const marco: User = {
      id: 'u3',
      email: 'marco@example.com',
      passwordHash: hash('password123'),
      name: 'Marco Diaz',
      neighborhood: 'Park Slope',
      role: 'user',
      disabled: false,
      emailVerified: true,
      createdAt: now - 45 * day,
    };

    const priya: User = {
      id: 'u4',
      email: 'priya@example.com',
      passwordHash: hash('password123'),
      name: 'Priya Nair',
      neighborhood: 'Bushwick',
      role: 'user',
      disabled: false,
      emailVerified: true,
      createdAt: now - 30 * day,
    };

    this.users = [demoUser, alice, marco, priya];

    // Listings
    this.listings = [
      {
        id: 'l1', sellerId: 'u2', title: 'Walnut bookshelf, mid-century',
        description: 'Solid walnut bookshelf in great condition. 6 shelves, holds plenty. Moving sale — must go this weekend. Sturdy and beautiful. Minor scuff on bottom shelf.',
        price: 120, category: 'furniture', neighborhood: 'Williamsburg',
        photoUrl: null, status: 'active', flagged: false, createdAt: now - 5 * day,
      },
      {
        id: 'l2', sellerId: 'u2', title: 'Sony WH-1000XM5 headphones',
        description: 'Barely used noise-cancelling headphones. Comes with original case and cables. Bought last month, realized I prefer earbuds.',
        price: 220, category: 'electronics', neighborhood: 'Williamsburg',
        photoUrl: null, status: 'active', flagged: false, createdAt: now - 3 * day,
      },
      {
        id: 'l3', sellerId: 'u3', title: 'Vintage denim jacket',
        description: 'Levis 501 trucker jacket, 90s era. Washed to a perfect fade. Size L. No tears or stains.',
        price: 45, category: 'clothing', neighborhood: 'Park Slope',
        photoUrl: null, status: 'active', flagged: false, createdAt: now - 7 * day,
      },
      {
        id: 'l4', sellerId: 'u3', title: 'Standing desk, adjustable height',
        description: 'IKEA Bekant sit/stand desk. Electric motor works perfectly. 63x31 inches. Used for 2 years, no issues. Moving and can\'t take it.',
        price: 180, category: 'furniture', neighborhood: 'Park Slope',
        photoUrl: null, status: 'active', flagged: false, createdAt: now - 2 * day,
      },
      {
        id: 'l5', sellerId: 'u4', title: 'Set of 6 ceramic mugs',
        description: 'Handmade Japanese-style ceramic mugs. Each slightly different. Set of 6, all in great shape. Beautiful glaze.',
        price: 35, category: 'home', neighborhood: 'Bushwick',
        photoUrl: null, status: 'active', flagged: false, createdAt: now - 1 * day,
      },
      {
        id: 'l6', sellerId: 'u4', title: 'Pile of paperbacks — sci-fi',
        description: 'About 15 sci-fi paperbacks. Le Guin, Dick, Butler, etc. Take the whole lot. No highlights or dog-ears.',
        price: 20, category: 'books', neighborhood: 'Bushwick',
        photoUrl: null, status: 'active', flagged: false, createdAt: now - 4 * day,
      },
      {
        id: 'l7', sellerId: 'u1', title: 'KitchenAid stand mixer',
        description: 'Artisan 5-quart in matte black. Works perfectly. Comes with all attachments. Downgrading to a smaller one.',
        price: 200, category: 'home', neighborhood: 'Bushwick',
        photoUrl: null, status: 'active', flagged: false, createdAt: now - 6 * day,
      },
      {
        id: 'l8', sellerId: 'u3', title: 'Yoga mat + block set',
        description: 'Manduka PRO mat (71 inch, purple) with two cork blocks. Used for 6 months. Clean, no rips.',
        price: 40, category: 'other', neighborhood: 'Park Slope',
        photoUrl: null, status: 'sold', flagged: false, createdAt: now - 14 * day,
      },
      {
        id: 'l9', sellerId: 'u2', title: 'Apple iPad Air 4th gen',
        description: 'Space gray, 64GB, WiFi only. Screen protector since day one, no scratches. Includes Apple Pencil 2nd gen.',
        price: 300, category: 'electronics', neighborhood: 'Williamsburg',
        photoUrl: null, status: 'active', flagged: true, flagReason: 'Suspiciously low price', createdAt: now - 1 * day,
      },
      {
        id: 'l10', sellerId: 'u4', title: 'IKEA KALLAX shelf unit',
        description: 'White 4x2 shelf unit. Some minor scratches on top surface. Still very sturdy. Great for records or books.',
        price: 50, category: 'furniture', neighborhood: 'Bushwick',
        photoUrl: null, status: 'active', flagged: false, createdAt: now - 8 * day,
      },
    ];

    // Threads
    this.threads = [
      {
        id: 't1', listingId: 'l1', buyerId: 'u1', sellerId: 'u2',
        lastMessageAt: now - 4 * day, createdAt: now - 5 * day,
      },
      {
        id: 't2', listingId: 'l3', buyerId: 'u1', sellerId: 'u3',
        lastMessageAt: now - 2 * day, createdAt: now - 6 * day,
      },
    ];

    // Messages
    this.messages = [
      { id: 'm1', threadId: 't1', senderId: 'u1', body: 'Hi! Is the bookshelf still available?', createdAt: now - 5 * day },
      { id: 'm2', threadId: 't1', senderId: 'u2', body: 'Yes it is! Are you in the area?', createdAt: now - 5 * day + 3600000 },
      { id: 'm3', threadId: 't1', senderId: 'u1', body: 'I\'m in Bushwick — not too far. Can I come see it Saturday?', createdAt: now - 4 * day },
      { id: 'm4', threadId: 't1', senderId: 'u2', body: 'Saturday works. I\'m near the Jefferson stop. I\'ll send you the address.', createdAt: now - 4 * day + 1800000 },
      { id: 'm5', threadId: 't2', senderId: 'u1', body: 'Love the jacket! What size exactly?', createdAt: now - 6 * day },
      { id: 'm6', threadId: 't2', senderId: 'u3', body: 'It\'s a true L — check the tag, I can send a photo.', createdAt: now - 2 * day },
    ];

    // Reviews
    this.reviews = [
      { id: 'r1', reviewerId: 'u1', revieweeId: 'u3', listingId: 'l8', rating: 5, body: 'Great seller, smooth pickup. Mat was exactly as described.', createdAt: now - 10 * day },
      { id: 'r2', reviewerId: 'u4', revieweeId: 'u2', listingId: 'l2', rating: 4, body: 'Headphones work great. Seller was a bit late but overall good.', createdAt: now - 2 * day },
      { id: 'r3', reviewerId: 'u3', revieweeId: 'u1', listingId: 'l7', rating: 5, body: 'Quick and easy transaction. Mixer works perfectly.', createdAt: now - 5 * day },
    ];
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  findById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  addUser(data: Omit<User, 'id' | 'createdAt' | 'disabled' | 'emailVerified'>): User {
    const user: User = {
      ...data,
      id: uid(),
      createdAt: Date.now(),
      disabled: false,
      emailVerified: true,
    };
    this.users.push(user);
    return user;
  }

  addListing(data: Omit<Listing, 'id' | 'createdAt' | 'status' | 'flagged'>): Listing {
    const listing: Listing = {
      ...data,
      id: uid(),
      createdAt: Date.now(),
      status: 'active',
      flagged: false,
    };
    this.listings.push(listing);
    return listing;
  }

  getListing(id: string): Listing | undefined {
    return this.listings.find((l) => l.id === id);
  }

  updateListing(id: string, data: Partial<Listing>): Listing | undefined {
    const l = this.listings.find((x) => x.id === id);
    if (l) Object.assign(l, data);
    return l;
  }

  removeListing(id: string): boolean {
    const idx = this.listings.findIndex((l) => l.id === id);
    if (idx >= 0) {
      this.listings.splice(idx, 1);
      return true;
    }
    return false;
  }

  findThread(buyerId: string, sellerId: string, listingId: string): Thread | undefined {
    return this.threads.find(
      (t) =>
        t.listingId === listingId &&
        ((t.buyerId === buyerId && t.sellerId === sellerId) ||
          (t.buyerId === sellerId && t.sellerId === buyerId))
    );
  }

  createThread(buyerId: string, sellerId: string, listingId: string): Thread {
    const thread: Thread = {
      id: uid(),
      listingId,
      buyerId,
      sellerId,
      lastMessageAt: Date.now(),
      createdAt: Date.now(),
    };
    this.threads.push(thread);
    return thread;
  }

  getThreadsForUser(userId: string): Thread[] {
    return this.threads.filter((t) => t.buyerId === userId || t.sellerId === userId);
  }

  getThread(id: string): Thread | undefined {
    return this.threads.find((t) => t.id === id);
  }

  getMessages(threadId: string): Message[] {
    return this.messages.filter((m) => m.threadId === threadId).sort((a, b) => a.createdAt - b.createdAt);
  }

  addMessage(threadId: string, senderId: string, body: string): Message {
    const msg: Message = { id: uid(), threadId, senderId, body, createdAt: Date.now() };
    this.messages.push(msg);
    const t = this.threads.find((x) => x.id === threadId);
    if (t) t.lastMessageAt = msg.createdAt;
    return msg;
  }

  getReviewsForUser(userId: string): Review[] {
    return this.reviews.filter((r) => r.revieweeId === userId);
  }

  addReview(data: Omit<Review, 'id' | 'createdAt'>): Review {
    const r: Review = { ...data, id: uid(), createdAt: Date.now() };
    this.reviews.push(r);
    return r;
  }

  computeTrustScore(userId: string): number {
    const reviews = this.getReviewsForUser(userId);
    if (reviews.length === 0) return 5.0;
    const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    return Math.round(avg * 10) / 10;
  }

  getUserListings(userId: string): Listing[] {
    return this.listings.filter((l) => l.sellerId === userId);
  }

  getUnreadCount(userId: string): number {
    const threads = this.getThreadsForUser(userId);
    let count = 0;
    for (const t of threads) {
      const msgs = this.getMessages(t.id);
      if (msgs.length > 0) {
        const last = msgs[msgs.length - 1];
        if (last.senderId !== userId) count++;
      }
    }
    return count;
  }
}

// Singleton
const globalForStore = globalThis as unknown as { __store: Store };
if (!globalForStore.__store) {
  globalForStore.__store = new Store();
}
export const store = globalForStore.__store;
