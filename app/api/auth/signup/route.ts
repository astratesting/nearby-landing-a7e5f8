import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { store } from '@/lib/store';

export async function POST(req: Request) {
  try {
    const { name, email, password, neighborhood } = await req.json();

    if (!name || !email || !password || !neighborhood) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const existing = store.findByEmail(email);
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    store.addUser({
      email,
      passwordHash,
      name,
      neighborhood,
      role: 'user',
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
