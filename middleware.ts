import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("btToken")?.value;

  // if (request.nextUrl.pathname.startsWith("/profile") && !token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  // matcher: ["/profile/:path*"],
};
