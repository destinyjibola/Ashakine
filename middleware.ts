import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import Cookies from 'js-cookie';
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // const role: string | undefined = Cookies.get('role');

    const path = request.nextUrl.pathname
    const userPath = "/user"
    const adminPath = "/admin"
    const instructorPath = "/instructor"
    const publicPath = path === '/auth/login' || path === "/auth/register"
    // const token = request.cookies.get('token')?.value || ''
    const role = request.cookies.get('user')?.value || null

    // if ((path === userPath) && role !== "1") {
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // } 

    // if ((path === adminPath) && role !== "3") {
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }


    // if ((path === instructorPath) && role !== "2") {
    //     return NextResponse.redirect(new URL('/', request.nextUrl))
    // }

    if (publicPath && role) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }

    // if (!publicPath && !token) {
    //     return NextResponse.redirect(new URL('/login', request.nextUrl))
    // }

}

export const config = {
    matcher: ['/', '/auth/login', '/auth/register','/dashboard', '/donation'],
}