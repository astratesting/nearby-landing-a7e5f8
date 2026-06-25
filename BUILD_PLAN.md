# NearBy — Build Plan

## 1. PRODUCT

NearBy is a hyperlocal used-goods marketplace where transactions happen between verified neighbors rather than anonymous strangers. The core value is **trust**: every account carries a visible trust score (a numeric badge derived from completed sales, reviews, and verification status), every item is tied to a named neighborhood, and all conversation happens in-app so phone numbers never leak. The primary user is the time-poor urban resident who wants to declutter or buy second-hand within a 20-minute walk of their home, but who has been burned — or has read about someone being burned — on OfferUp, Facebook Marketplace, or Craigslist. NearBy removes that anxiety by foregrounding identity, neighborhood proximity, and a moderation layer (admin flagging) instead of an endless firehose of strangers.

## 2. WHO IT'S FOR

**Primary ICP:** Renter- and owner-occupiers aged 26–45 in dense urban or inner-suburban ZIP codes (Brooklyn, Oakland, Silver Spring, Mission, etc.) who already try to buy/sell locally and have either experienced a no-show, a counterfeit, a cash-app scam, or felt unsafe meeting a stranger. They are mobile-first but browse on desktop during work hours. They trust editorial, calm interfaces over the loud, photo-cluttered look of Facebook Marketplace. They care about *who* is on the other side of a transaction at least as much as the price.

**How this shapes the product:**
- Every product page surfaces the seller's name, initial, neighborhood, and trust score — never just "user_28471."
- One category nav, one neighborhood filter, no algorithmic "For You" mystery feed.
- Tone is editorial and quiet (serif headings, ivory background, generous spacing), not transactional.
- Auth is email + password only — no fake "Continue with Google" button.
- Messaging stays inside the app; no phone numbers, no off-platform links in messages.
- Admin flagging is one click from any listing, surfaced but not naggy.

## 3. LOOK & FEEL

### Visual system

**Positioning:** "Premium Studio" = editorial magazine × neighborhood storefront. Think *Cereal* magazine or *Aesop* retail, not eBay. The interface feels curated and quiet; photography does the loud work.

**Color palette (Tailwind config):**
- `charcoal` `#1a1a2e` — primary text, footer bg, dark sections
- `ivory` `#f5f0e8` — page background, soft surfaces
- `gold` `#c9a96e` — accents, primary CTA, trust badges, focus ring
- `burgundy` `#6b2d3b` — alerts, error states, destructive actions, "flagged" indicators
- Plus neutrals: `ink` `#0f0f1a` (deepest text), `cream` `#faf7f1` (cards), `mist` `#e8e2d6` (borders, dividers), `stone` `#8a8478` (muted text)

**Typography:**
- Headings: `Georgia, 'Times New Roman', serif` — loaded via `next/font/google` (Google hosts Georgia).
- Body: `Inter, system-ui, sans-serif` — loaded via `next/font/google`.
- Scale: display 48/56 (Georgia, tracking tight), h1 36/44, h2 28/36, h3 22/30, body 16/26, small 14/22, micro 12/18 uppercase tracked.

**Spacing & layout:**
- Max content width `max-w-6xl` (1152px) for browse, `max-w-2xl` for forms & chat.
- Generous vertical rhythm: section padding `py-20 md:py-28`.
- 8px base grid.
- Cards: `bg-cream border border-mist rounded-sm` (small radius = editorial, not playful).

**Iconography:** Lucide icons throughout (loaded as SVG components in `components/icons.tsx`). Stroke width 1.5, never filled. Used sparingly — words carry the weight.

**Imagery:** Photos from `https://images.unsplash.com/` placeholders OR solid color blocks with first letter (no fake stock people). Each item card shows the first photo, or a `bg-mist` placeholder with a category label.

**Motion:** Subtle only. Hover: `transition-colors duration-150`. Cards lift `-translate-y-0.5` on hover. No bounces, no parallax, no skeletons spinning. Page transitions: none. Chat bubble entry: `animate-fade-in-up` (200ms).

**Key reusable components:**
- `<Button variant="primary|ghost|danger" size="sm|md|lg">`
- `<Pill variant="trust|category|status">` — small badges
- `<Input>`, `<Textarea>`, `<Select>` with consistent ivory background + mist border + gold focus
- `<ItemCard>` — used on browse, dashboard, profile
- `<ChatBubble side="left|right">`
- `<TrustBadge score={n}>` — gold pill with score, e.g. "Trust 4.8"
- `<NeighborhoodChip>` — small charcoal pill
- `<EmptyState icon title body action>` — reusable empty states

### Screens — top-to-bottom layout

**`/` Landing page**
- Sticky `Navbar` (transparent on hero, ivory after scroll threshold via simple effect — or always ivory for v1).
- **Hero section** (`bg-ivory`):
  - Small eyebrow: `EST. NEIGHBORS` in micro caps gold.
  - Display headline (Georgia 56): *"Trade with neighbors you can trust."*
  - Sub (Inter 18, max-w-xl, `text-stone`): *"NearBy is a hyperlocal marketplace built around real identities and real blocks. No strangers. No scams. Just the people on your street, the next street over, and the next one after that."*
  - Two CTAs side by side: primary gold "Browse items", ghost "Sell something →".
  - Right side (desktop only): a tasteful 3-card stack of recent items, slightly rotated, photographic — gives the page editorial warmth. (Pulled live from store.)
- **Trust strip** (4 columns, `bg-cream border-y border-mist`):
  - Icon + heading + 1-line description, four pillars: Verified emails, Confirmed neighborhood, Reviews that count, In-app messaging only.
- **How it works** (3 numbered steps with gold circle numerals):
  1. "Join with your block." 2. "List or browse in your neighborhood." 3. "Meet, trade, review."
- **Categories grid** (6 cards, 3×2): Furniture, Electronics, Clothing, Books, Home Goods, Other. Each card links to `/browse?category=slug`.
- **Closing CTA section** (`bg-charcoal text-ivory`):
  - "Your block has more than you think." Single button: gold "Open NearBy" → `/browse`.
- `Footer`.

**`/login` and `/signup` (auth layout)**
- Two-column page: left is a quiet `bg-charcoal` panel with brand mark and a single line of editorial copy; right is the form on `bg-ivory`.
- Form card: name (signup only), email, password, neighborhood (signup only). Submit button full-width gold.
- Below submit: subtle link to the other page ("Already a member? Sign in.").
- Server error rendered as a burgundy-bordered alert above the submit button.

**`/browse`**
- Sticky filter bar (under navbar): search input (full width on mobile, 1/2 on desktop) + neighborhood select + category chip row (horizontal scroll on mobile).
- Sort row: left = result count `"{n} items"`, right = sort dropdown (Newest / Price ↑ / Price ↓).
- Main grid: 3 columns desktop, 2 tablet, 1 mobile. `<ItemCard>` per listing.
- Empty state (centered, large icon): "Nothing matches yet." + "Be the first to post" CTA → `/sell`.

**`/sell`**
- Centered max-w-2xl card on ivory background.
- Header: "List an item." sub: "Photos, price, your block. Three minutes."
- Form fields stacked, full width inside card:
  1. Title (input)
  2. Description (textarea, 4 rows)
  3. Price (input with `$` prefix adornment, type="number")
  4. Category (select: Furniture, Electronics, Clothing, Books, Home Goods, Other)
  5. Neighborhood (input, pre-fills from user profile)
  6. Photo URL (input, helper text "Paste an image URL — upload coming soon")
  7. Submit: full-width gold "Post to NearBy"
- On success: redirect to `/items/[id]` with a small inline toast (set via search param).

**`/items/[id]`**
- Breadcrumb: "Browse / Furniture / Walnut bookshelf" (last segment current, charcoal).
- 2-column desktop: left 60% = photo (square, `aspect-square bg-mist`, with category letter fallback), right 40% = details panel.
- Right panel (top to bottom):
  - Title (Georgia h1).
  - Price (Georgia 36, gold).
  - Row of pills: Category, Neighborhood.
  - Divider (1px gold/30).
  - "Listed 2 days ago by" + seller mini-card: initial-avatar circle, name (links to `/profile/[id]`), trust badge, member-since line.
  - Primary CTA (gold, full width): "Message seller" → `/messages/[id]?listing=...`.
  - Secondary link (small, stone): "Report this listing" → triggers flag API, shows toast.
- Below the two columns, full-width: description (prose, max-w-prose).
- Bottom: "More from this seller" — 3-item grid (filtered to seller, excluding current).

**`/messages`**
- Header: "Messages."
- If no threads: empty state with "Browse items to start a conversation" → `/browse`.
- Otherwise: a vertical list of thread rows (full-width cards, no split-pane chat UI for simplicity — v1 lists, opens thread on click).
- Each row: left = small listing thumb (or placeholder square); middle = seller name (bold) + listing title (small stone) + last message preview (truncated, stone); right = relative time + unread dot (gold).

**`/messages/[id]`**
- Top bar: back link "← Messages" + listing summary inline (thumb + title + price).
- Chat area (`flex-1 overflow-y-auto`, ivory bg): ChatBubbles aligned left (incoming, cream bg) / right (outgoing, charcoal bg, ivory text).
- Each bubble: sender name (micro, stone, only on first of consecutive), message text, time (micro, stone).
- Empty thread state: "Say hi to {seller} about {listing title}."
- Input pinned to bottom: textarea (auto-grow 1–4 rows) + gold "Send" button. Enter sends, Shift+Enter newline.
- Optimistic send: bubble appears immediately, then replaced by server-confirmed one (or stays if no error).

**`/profile/[id]`**
- Header card (cream bg, full width): avatar circle (initial, gold bg / charcoal text, 80px), name (Georgia h1), neighborhood chip, trust badge.
- Stats row (3 cells): "Member since {month YYYY}", "{n} listings", "Trust score {n}/5".
- Tabs (text-only, gold underline for active): Active listings | Reviews.
- Active listings: ItemCard grid (same component as /browse).
- Reviews: each review = reviewer row (avatar + name + time) + star row (5-char unicode ★/☆, gold for filled) + body text.

**`/dashboard`**
- Page header: "Welcome back, {firstName}."
- Two-column on desktop:
  - Left (wider): "Your listings" — list of own listings with status pill (Active / Sold / Flagged) and inline actions: View, Mark Sold, Remove (danger).
  - Right (narrower): "Quick actions" card with two big buttons: "Sell something" (gold) and "Browse" (ghost). Below: "Messages ({n})" link card with last-message preview if any.
- Empty listings state: "You haven't posted anything yet." + gold CTA "Post your first item."

**`/admin`**
- Auth: requires `session.user.email === process.env.ADMIN_EMAIL` (env var, fallback to `'admin@nearby.local'` for dev). Otherwise 403.
- Top stats row (4 cells): Listings total, Flagged, Users, Messages — all real counts from store.
- Tabs: Flagged listings (default) | All listings | Users.
- Flagged listings table: columns = thumbnail, title, seller, neighborhood, flag reason (if provided), actions (Approve / Remove). Burgundy left border on flagged rows.
- All listings table: same columns, no actions unless flagged.
- Users table: name, email, neighborhood, listings count, joined, actions (Ban — soft: sets user.disabled = true, prevents login).

## 4. USER FLOWS

**Flow A — Buyer discovers and contacts seller**
1. Land on `/browse` (no auth needed to browse).
2. Filter by category/neighborhood or type in search.
3. Click an `<ItemCard>` → `/items/[id]`.
4. Click "Message seller" → if not signed in, redirect `/login?return=/items/[id]`; if signed in, create thread (or fetch existing), redirect to `/messages/[threadId]`.
5. Type message, send. Bubble appears, persisted to store.
6. Return to `/messages` later to see thread with unread dot if seller replied.

**Flow B — Seller posts an item**
1. Click "Sell something" in navbar → `/sell`.
2. If not signed in, redirect `/signup?return=/sell` (signup form pre-filled to return after).
3. Fill form, submit → API validates, creates listing tied to user, returns id.
4. Redirect `/items/[id]` with `?posted=1` → small toast: "Listed — your neighbors can see it now."
5. Item appears in `/dashboard` "Your listings" and on `/browse` immediately.

**Flow C — Returning user checks dashboard**
1. Sign in at `/login`.
2. Land on `/dashboard` (or `return` param target).
3. See stats, own listings, message count.
4. Click into a listing to view/edit, or click messages to open threads.

**Flow D — Admin moderates**
1. Admin signs in with the seeded admin email.
2. Visit `/admin` directly (or via small admin link only shown if `auth().user.email === ADMIN_EMAIL`).
3. Sees flagged listings first; clicks Approve (clears flag) or Remove (deletes listing, shows toast).
4. Can browse all listings and ban users from Users tab.

**States (auth):**
- Unauthenticated visiting `/dashboard`, `/sell`, `/messages`, `/profile/[id]` (own), `/admin` → redirect to `/login?return=<path>`.
- Authenticated but not admin visiting `/admin` → 403 page (charcoal bg, ivory text, "Reserved for NearBy staff").

**States (data):**
- Empty listings, empty messages, empty reviews, empty search results, no photo URL, network error on send (chat shows burgundy bubble with "Couldn't send — Retry").

## 5. PAGES / ROUTES

| Route | Purpose | Layout & key UI |
|---|---|---|
| `/` | Landing/marketing | Hero, trust strip, how it works, categories, closing CTA, footer |
| `/login` | Sign in | Two-column auth layout, form card |
| `/signup` | Register | Two-column auth layout, form card with neighborhood field |
| `/dashboard` | User home | Header, listings column, quick actions column |
| `/browse` | Discovery | Filter bar, sort row, item grid |
| `/sell` | Create listing | Centered form card |
| `/items/[id]` | Item detail | Two-column photo + details, description, more from seller |
| `/messages` | Thread list | Header, list of thread rows or empty state |
| `/messages/[id]` | Chat | Listing summary bar, chat area, composer |
| `/profile/[id]` | Public profile | Header card, stats, tabs (listings, reviews) |
| `/admin` | Moderation | Stats row, tabs (flagged/all/users), tables |
| `/403` | Forbidden | Charcoal, "Reserved for NearBy staff" |

API routes:
| Route | Methods | Purpose |
|---|---|---|
| `/api/auth/[...nextauth]` | GET, POST | NextAuth handler |
| `/api/listings` | GET, POST | List (with query filters) / Create |
| `/api/listings/[id]` | GET, PATCH, DELETE | Single listing ops |
| `/api/listings/[id]/flag` | POST | Flag a listing |
| `/api/messages` | GET | List threads for current user |
| `/api/messages/[threadId]` | GET, POST | Get messages / send message |
| `/api/threads` | POST | Create-or-fetch thread between current user and listing seller |
| `/api/admin/listings/[id]/approve` | POST | Clear flag |
| `/api/admin/listings/[id]/remove` | DELETE | Admin delete |
| `/api/admin/users/[id]/ban` | POST | Disable account |

## 6. CORE FEATURES

**Auth (NextAuth v5, Credentials only)**
- `lib/auth.ts` configures `NextAuth({ providers: [Credentials({...})], session: { strategy: 'jwt' }, callbacks: { jwt, session } })`.
- Credentials provider accepts `email` + `password`. Server-side: look up user in store, verify with `bcryptjs.compare`, return user object `{ id, email, name, neighborhood, role }`.
- Sign-up API endpoint `POST /api/auth/signup` (custom route, not NextAuth) creates user, hashes password with `bcryptjs` (10 rounds), writes to store, returns `{ ok: true }`. Client then calls `signIn('credentials', { email, password, redirect: false })`.
- Session JWT carries `id`, `role`, `neighborhood`. `session.user` is typed in `types/next-auth.d.ts`.
- Middleware (`middleware.ts`) protects `/dashboard`, `/sell`, `/messages`, `/messages/*`, `/admin` via `auth()`; redirects to `/login?return=<path>`.

**Listing store**
- `lib/store.ts` exports a singleton `Store` class with: `users`, `listings`, `threads`, `messages`, `reviews`, `categories`.
- Persistence: in-memory with seed data on first import. Mutations update the in-memory object. (v1 — file persistence is fine to add later, in-memory is enough for the spec.)
- Seed: 6 categories (Furniture, Electronics, Clothing, Books, Home Goods, Other), 4 demo users (incl. one admin), ~10 listings distributed across users/categories/neighborhoods, 2 sample threads with a few messages, 3 reviews.
- All listing reads (browse, detail, dashboard, profile, admin) go through the store; components never touch raw data.

**Search & filter (`/browse`)**
- Query params: `q` (string), `category` (slug), `neighborhood` (string), `sort` (`newest`|`price_asc`|`price_desc`).
- Server-side filtering in `app/browse/page.tsx` via `searchParams`. Client uses `<Link>` with new query params (no client-side state for v1, simpler, SSR-friendly).
- Search matches `title` + `description` case-insensitive substring.
- Category chips are `<Link href="/browse?category=...">` with active state = filled gold, inactive = outlined charcoal.

**Create listing (`/sell`)**
- Server action `createListing(formData)` validates with zod, requires auth session, inserts into store with `sellerId = session.user.id`, `status = 'active'`, `createdAt = Date.now()`, `flagged = false`.
- Photo upload is a placeholder: `photoUrl` text input. Helper text "Paste an image URL — upload coming soon."

**Item detail & contact**
- `app/items/[id]/page.tsx` is a Server Component. It fetches listing + seller + reviews count.
- "Message seller" link resolves `threadId` via server logic: if a thread exists between current user and seller for this listing, reuse it; otherwise create one. Link is disabled (with tooltip) if user is the seller.

**In-app chat**
- Thread = `{ id, listingId, buyerId, sellerId, lastMessageAt }`. Buyer and seller are ordered by id to deduplicate.
- `POST /api/messages/[threadId]` appends to `messages` array, updates `lastMessageAt`, returns new message.
- `GET /api/messages/[threadId]` returns all messages ordered by createdAt.
- Polling: client uses a 3-second `setInterval` refetch on the open thread (simple, no websockets needed for v1). Pauses on unmount.

**Trust score**
- `computeTrustScore(userId)` = average of all received review ratings (1–5), rounded to 1 decimal, default 5.0 if no reviews.
- Displayed as `<TrustBadge score={n}>` — gold pill, "Trust 4.8" (always shown, even new users).
- Verified email badge: small charcoal pill with checkmark, shown when `user.emailVerified` is true (always true since we don't send verification emails in v1 — but the field is there).

**Profile**
- Public, viewable by anyone. Lists user's active listings + received reviews. Reviews include rating display.

**Admin**
- Email check via `ADMIN_EMAIL` env, fallback `admin@nearby.local`. Seed user with this email is created on first store init.
- Actions are server actions or POST endpoints; UI uses forms with `useFormStatus` for the pending state.

**Navbar**
- Server-rendered with session check. Shows different right side based on `auth()`: signed-out = "Sign in" + gold "Join"; signed-in = Messages link + name (links to own profile) + sign-out form button.
- Active route highlighted with gold underline (compare `usePathname()`).

**Footer**
- Three columns + bottom row with copyright + "NearBy · Built for the block." tagline.

## 7. DATA MODEL

```ts
// lib/types.ts
export type CategorySlug =
  | 'furniture' | 'electronics' | 'clothing' | 'books' | 'home' | 'other';

export interface Category { slug: CategorySlug; name: string; }

export interface User {
  id: string;
  email: string;
  passwordHash: string;       // bcrypt
  name: string;
  neighborhood: string;
  role: 'user' | 'admin';
  disabled: boolean;
  emailVerified: boolean;     // always true in v1
  createdAt: number;
}

export type ListingStatus = 'active' | 'sold' | 'removed';

export interface Listing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;              // USD, integer cents would be cleaner but spec says price as number
  category: CategorySlug;
  neighborhood: string;
  photoUrl: string | null;    // placeholder: URL string
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
```

**Relationships:**
- `Listing.sellerId → User.id`
- `Thread.listingId → Listing.id`, `Thread.buyerId/sellerId → User.id`
- `Message.threadId → Thread.id`, `Message.senderId → User.id`
- `Review.reviewerId/revieweeId → User.id`, `Review.listingId → Listing.id (optional)`
- `Listing.category → Category.slug` (validated against `categories` list)

## 8. AUTH

- Provider: **NextAuth v5 (Auth.js) Credentials provider only.** No social buttons. No Clerk.
- Flow: `/signup` → POST `/api/auth/signup` (creates user, hashes password, returns ok) → auto `signIn('credentials')` on success.
- Sign-in: `/login` form → `signIn('credentials', { email, password, redirect: false })` → on success, `router.push(returnTo ?? '/dashboard')`.
- Session: JWT strategy, 30-day expiry. Token contains `id`, `role`, `neighborhood`.
- Logout: `<form action={signOut}>` button in Navbar (server action from NextAuth).
- Middleware (`middleware.ts`): uses `auth` from `lib/auth.ts`; protects `/dashboard`, `/sell`, `/messages`, `/messages/*`, `/admin`. Admin additionally checked inside the page (returns 403 if `session.user.role !== 'admin'`).
- Password hashing: `bcryptjs` (pure JS, no native build, works everywhere).
- No email verification in v1 — `emailVerified` field exists but is always true; this is documented honestly in the auth signup form copy ("Skip the email step — we'll never sell your address").

## 9. FILES

The concrete file tree. Existing README and `.gitignore` at the repo root are preserved unchanged.

```
.
├── README.md                          (preserved)
├── .gitignore                         (preserved)
└── frontend/
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.js
    ├── .env.example                   (NEXTAUTH_SECRET, NEXTAUTH_URL, ADMIN_EMAIL)
    ├── middleware.ts
    ├── app/
    │   ├── layout.tsx                 (root layout: fonts, Navbar, Footer, ivory bg)
    │   ├── globals.css                (Tailwind directives, base styles,