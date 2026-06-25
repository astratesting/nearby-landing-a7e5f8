import NextAuth from 'next-auth';

const { auth } = NextAuth({
  providers: [],
  secret: process.env.NEXTAUTH_SECRET || 'nearby-dev-secret-change-in-production',
});

const protectedRoutes = ['/dashboard', '/sell', '/messages', '/admin'];

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isProtected = protectedRoutes.some(
    (r) => pathname === r || pathname.startsWith(r + '/')
  );

  if (isProtected && !req.auth) {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('return', pathname);
    return Response.redirect(loginUrl);
  }
});

export const config = {
  matcher: ['/dashboard/:path*', '/sell/:path*', '/messages/:path*', '/admin/:path*'],
};
