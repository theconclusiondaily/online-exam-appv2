import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const role =
    request.cookies.get("role")?.value;

  const pathname =
    request.nextUrl.pathname;

  // If no role cookie → allow login page only

  if (
    !role &&
    pathname !== "/login"
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // ADMIN ROUTES

  if (
    pathname.startsWith("/admin")
  ) {

    if (role !== "admin") {

      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  // TEACHER ROUTES

  if (
    pathname.startsWith("/teacher")
  ) {

    if (role !== "teacher") {

      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  // STUDENT ROUTES

  if (
    pathname.startsWith("/dashboard")
  ) {

    if (role !== "student") {

      return NextResponse.redirect(
        new URL("/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/:path*",
    "/dashboard/:path*",
  ],
};