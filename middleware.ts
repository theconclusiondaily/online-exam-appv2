import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const role = request.cookies.get("role")?.value;

  const pathname = request.nextUrl.pathname;

  // Admin protection
  if (pathname.startsWith("/admin")) {
    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Teacher protection
  if (pathname.startsWith("/teacher")) {
    if (role !== "teacher") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Student dashboard protection
  if (pathname.startsWith("/dashboard")) {
    if (role !== "student") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/teacher/:path*", "/dashboard/:path*"],
};