import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const ALG = "HS256"
const SESSION_COOKIE = "hybe_session"
// In absence of envs, fallback to a static dev secret. For production, set AUTH_SECRET.
const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET ?? "hybe-dev-secret")

export type SessionPayload = { hybeId: string; contact: string | null; requiresPasswordChange: boolean }

export async function createSession(payload: SessionPayload) {
  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: ALG })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, jwt, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  })
}

export async function destroySession() {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 })
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) return null
  try {
    const { payload } = await jwtVerify(token, SECRET)
    return {
      hybeId: String(payload.hybeId),
      contact: (payload.contact as string) ?? null,
      requiresPasswordChange: Boolean(payload.requiresPasswordChange),
    }
  } catch {
    return null
  }
}
