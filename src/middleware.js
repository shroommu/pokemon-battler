import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

import {
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "@/routes";

const matchesRoute = (pathname, routes) => {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
};

export default withAuth(
  function middleware(req) {
    const { nextUrl } = req;
    const isLoggedIn = Boolean(req.nextauth.token);

    const isApiAuthRoute =
      nextUrl.pathname === apiAuthPrefix ||
      nextUrl.pathname.startsWith(`${apiAuthPrefix}/`);
    const isAuthRoute = matchesRoute(nextUrl.pathname, authRoutes);
    const isPublicRoute = matchesRoute(nextUrl.pathname, publicRoutes);

    if (isApiAuthRoute) {
      return NextResponse.next();
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      }

      return NextResponse.next();
    }

    if (!isLoggedIn && !isPublicRoute) {
      const loginUrl = new URL("/login", nextUrl);
      const callbackUrl = `${nextUrl.pathname}${nextUrl.search}`;
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
