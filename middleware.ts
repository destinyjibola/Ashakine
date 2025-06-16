import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ['/auth/login', '/auth/register'];

  const role = request.cookies.get('user')?.value || null;

  // Redirect logged-in users away from login/register pages
  if (publicPaths.includes(path) && role) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Protect all /admin routes
  if (path.startsWith('/admin') && !role) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/login',
    '/auth/register',
    '/admin/:path*', // protect all admin routes
  ],
};
