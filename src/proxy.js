import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "@/routes";

const buildLoginUrl = (request) => {
  const callbackUrl = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const loginUrl = new URL("/login", request.nextUrl.origin);
  loginUrl.searchParams.set("callbackUrl", callbackUrl);
  return loginUrl;
};

const routeMatches = (path, route) => path === route || path.startsWith(`${route}/`);

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = Boolean(request.nextauth?.token);

  const isApiAuthRoute = pathname === apiAuthPrefix || pathname.startsWith(`${apiAuthPrefix}/`);
  const isPublicRoute = publicRoutes.some((route) => routeMatches(pathname, route));
  const isAuthRoute = authRoutes.some((route) => routeMatches(pathname, route));

  if (isApiAuthRoute) return NextResponse.next();

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, request.nextUrl.origin));
    }

    return NextResponse.next();
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(buildLoginUrl(request));
  }

  return NextResponse.next();
}

export default withAuth(proxy, {
  callbacks: {
    authorized: () => true,
  },
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|.*\\..*).*)"],
};
