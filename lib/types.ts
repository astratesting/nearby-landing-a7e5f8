export type CategorySlug = 'furniture' | 'electronics' | 'clothing' | 'books' | 'home' | 'other';

export interface Category {
  slug: CategorySlug;
  name: string;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  neighborhood: string;
  role: 'user' | 'admin';
  disabled: boolean;
  emailVerified: boolean;
  createdAt: number;
}

export type ListingStatus = 'active' | 'sold' | 'removed';

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  category: CategorySlug;
  neighborhood: string;
  photoUrl: string | null;
  status: ListingStatus;
  flagged: boolean;
  flagReason?: string;
  createdAt: number;
}

export interface Thread {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  lastMessageAt: number;
  createdAt: number;
}

export interface Message {
  id: string;
  threadId: string;
  senderId: string;
  body: string;
  createdAt: number;
}

export interface Review {
  id: string;
  reviewerId: string;
  revieweeId: string;
  listingId?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  body: string;
  createdAt: number;
}
