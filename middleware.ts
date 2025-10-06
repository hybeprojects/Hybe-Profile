import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify } from "jose"

const SESSION_COOKIE = "hybe_session"
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET ?? "hybe-dev-secret")

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only protect /admin and /api/admin routes
  if (!pathname.startsWith("/admin") && !pathname.startsWith("/api/admin")) {
    return NextResponse.next()
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value
  if (!token) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }

  try {
    await jwtVerify(token, SECRET)
    return NextResponse.next()
  } catch {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
