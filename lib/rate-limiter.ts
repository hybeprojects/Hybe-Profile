import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// If Upstash env vars are missing (e.g. during local build or in limited CI),
// use a safe fallback rate limiter that allows requests. This prevents the
// Next.js build from failing when the module is imported while collecting
// page data. In environments where Redis is configured, we use the real
// Upstash Ratelimit implementation.
let _rateLimiter: unknown

if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  // Rate limit to 5 requests per 10 seconds
  _rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    analytics: true,
    prefix: "ratelimit",
  })
} else {
  // Fallback/no-op rate limiter used when Upstash is not configured.
  // It returns success: true so callers proceed normally during build or
  // in environments where Upstash isn't available.
  _rateLimiter = {
    async limit(_key: string) {
      return {
        success: true,
        limit: 999999,
        remaining: 999999,
        reset: Date.now() + 1000,
      }
    },
  }
}

export const rateLimiter = _rateLimiter as any
