import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ['/auth/login', '/auth/register'];
  const isAdminPath = path.startsWith('/admin');

  const usertoken = request.cookies.get('token')?.value || null;

  // Check if token exists and is not expired
  if (usertoken) {
    try {
      const decoded: DecodedToken = jwtDecode(usertoken);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (decoded.exp < currentTime) {
        // Token is expired, clear cookies and redirect to login
        const response = NextResponse.redirect(new URL('/auth/login', request.nextUrl));
        response.cookies.delete('token');
        response.cookies.delete('user');
        return response;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      // Invalid token, clear cookies and redirect to login
      const response = NextResponse.redirect(new URL('/auth/login', request.nextUrl));
      response.cookies.delete('token');
      response.cookies.delete('user');
      return response;
    }
  }

  // Redirect logged-in users away from login/register pages
  if (publicPaths.includes(path) && usertoken) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl));
  }

  // Redirect to login for admin routes if no valid token
  if (isAdminPath && !usertoken) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/auth/login',
    '/auth/register',
    '/admin/:path*',
  ],
};