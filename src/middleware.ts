import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export default async function middleware(req: NextRequest) {
  try {
    const cookieStore = await cookies();

    const protectedRoute = req.nextUrl.pathname === "/";

    const access_token = cookieStore.get("access_token")?.value || "";

    if (protectedRoute && !access_token) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}
