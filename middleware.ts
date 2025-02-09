import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const publicPaths = ['/auth/login', '/auth/register'];
    const protectedPaths = ['/dashboard'];

    const role = request.cookies.get('user')?.value || null;

    // If the user is on a public path and has a role, redirect to home
    if (publicPaths.includes(path) && role) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    // If the user is on a protected path and does not have a role, redirect to login
    if (protectedPaths.includes(path) && !role) {
        return NextResponse.redirect(new URL('/auth/login', request.nextUrl));
    }

    // Allow the request to proceed if no conditions are met
    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/auth/login', '/auth/register', '/dashboard', '/discovery'],
};