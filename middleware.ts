// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname, origin } = request.nextUrl;

  // Protected routes (require auth)
  const protectedRoutes = [
    "/courses",
    "/my-course",
    "/profile",
    "/analytics",
    "/settings",
    "/chats",
    "/dashboard",
    "/syllabus",
  ];

  // Auth routes (should not be accessible when logged in)
  const authRoutes = ["/login", "/forget-password", "/reset-password"];

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if route is auth route
  const isAuthRoute = authRoutes.includes(pathname);

  // If trying to access auth page while authenticated
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/my-course", origin));
  }

  // If trying to access protected route without authentication
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", origin);
    // Store the attempted URL for redirect after login
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/forget-password",
    "/reset-password",
    "/courses/:path*",
    "/my-course/:path*",
    "/profile/:path*",
    "/analytics/:path*",
    "/settings/:path*",
    "/chats/:path*",
    "/dashboard/:path*",
    "/syllabus/:path*",
  ],
};
