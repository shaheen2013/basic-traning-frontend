import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("btToken")?.value;
  console.log("Token:", token);
  const { pathname, searchParams } = request.nextUrl;

  // Define all protected routes
  const protectedRoutes = [
    "/courses",
    "/my-course",
    "/profile",
    "/analytics",
    "/chats",
    "/settings",
    "/syllabus",
  ];

  // Define public routes
  const publicRoutes = ["/login", "/register", "/api/auth"];

  // Check if current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if current path is public auth route
  const isPublicAuthRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Redirect to login if trying to access protected route without token
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set(
      "redirect",
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "")
    );
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if logged-in user tries to access auth pages
  if (isPublicAuthRoute && token) {
    return NextResponse.redirect(new URL("/my-course", request.url));
  }

  // Add token to API requests
  if (pathname.startsWith("/api") && token) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Authorization", `Bearer ${token}`);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protected routes
    "/courses/:path*",
    "/my-course/:path*",
    "/profile/:path*",
    "/analytics/:path*",
    "/chats/:path*",
    "/settings/:path*",
    "/syllabus/:path*",

    // Auth routes
    "/login",
    "/register",

    // API routes
    "/api/:path*",
  ],
};
