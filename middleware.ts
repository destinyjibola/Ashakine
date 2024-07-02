import NextAuth, { Session } from "next-auth";
import authConfig from "./auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "./routes";
import { NextRequest } from "next/server";
import next from "next";

const { auth } = NextAuth(authConfig);

export default auth(
  (req: NextRequest & { auth: Session | null }): Response | void => {
    const isLoggedin = !!req.auth;
    const { nextUrl } = req;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
      return;
    }
    if (isAuthRoute) {
      if (isLoggedin) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }
      return;
    }

    if (!isLoggedin && !isPublicRoute) {
      let callbackUrl = nextUrl.pathname;

      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      } 

      const encodedCallbackUrl = encodeURIComponent(callbackUrl);

      return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl));
    }

    return;
  }
);

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
