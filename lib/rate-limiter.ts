import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// If Upstash env vars are missing (e.g. during local build or in limited CI),
// export a safe fallback rateLimiter that allows requests. This prevents the
// Next.js build from failing when the module is imported while collecting
// page data. In environments where Redis is configured, we use the real
// Upstash Ratelimit implementation.
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  })

  // Rate limit to 5 requests per 10 seconds
  export const rateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 s"),
    analytics: true,
    prefix: "ratelimit",
  })
} else {
  // Fallback/no-op rate limiter used when Upstash is not configured.
  // It returns success: true so callers proceed normally during build or
  // in environments where Upstash isn't available.
  // Keep the exported shape minimal to match the .limit interface used by callers.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export const rateLimiter: any = {
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
