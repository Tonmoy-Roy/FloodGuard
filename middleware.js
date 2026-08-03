import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protect all /dashboard/admin/* routes
  if (pathname.startsWith("/dashboard/admin")) {
    const session = request.cookies.get("admin_session");

    // No cookie or wrong value → redirect to admin login
    if (!session || session.value !== process.env.ADMIN_SECRET) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/admin/:path*"],
};