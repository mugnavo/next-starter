import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";

import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/lib/db";
import { cache } from "react";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  telemetry: {
    enabled: false,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  plugins: [nextCookies()],

  // https://www.better-auth.com/docs/concepts/session-management#session-caching
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  // https://www.better-auth.com/docs/concepts/oauth
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // https://www.better-auth.com/docs/authentication/email-password
  emailAndPassword: {
    enabled: true,
  },

  experimental: {
    // https://www.better-auth.com/docs/adapters/drizzle#joins-experimental
    joins: true,
  },
});

/**
 * Retrieves the session and user data if valid.
 * Can be used in server components, API route handlers, and server actions.
 *
 * @param disableCookieCache - Fetch the latest session from the database, ignoring the cookie cache.
 */
export const getAuthSession = cache(async (disableCookieCache = false) => {
  return auth.api.getSession({
    headers: await headers(),
    query: {
      disableCookieCache,
    },
  });
});

/**
 * Same as `getAuthSession`, but redirects to the specified URL or `unauthorized.tsx` if the user is not authenticated.
 *
 * @param redirectUrl - Optional, uses the `unauthorized.tsx` page if not provided.
 * @param disableCookieCache - Fetch the latest session from the database, ignoring the cookie cache.
 */
export async function authGuard(
  redirectUrl?: string | null,
  disableCookieCache?: boolean,
) {
  const session = disableCookieCache
    ? await getAuthSession(true)
    : await getAuthSession();

  if (!session && redirectUrl) {
    redirect(redirectUrl);
  } else if (!session) {
    // https://nextjs.org/docs/app/api-reference/functions/unauthorized
    unauthorized();
  }

  return session;
}
