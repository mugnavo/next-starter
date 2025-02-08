import "server-only";

import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { cache } from "react";
import { db } from "./db";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
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
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },

  // https://www.better-auth.com/docs/authentication/email-password
  // emailAndPassword: {
  //   enabled: true,
  // },
});

/**
 * Retrieves the session and user data if valid.
 * Can be used in server components, API route handlers, and server actions.
 */
export const getAuthSession = cache(async () => {
  return auth.api.getSession({ headers: await headers() });
});

/**
 * Same as `getAuthSession`, but redirects to the specified URL or `unauthorized.tsx` if the user is not authenticated.
 *
 * @param redirectUrl - Optional, uses the `unauthorized.tsx` page if not provided.
 */
export async function authGuard(redirectUrl?: string) {
  const session = await getAuthSession();

  if (!session && redirectUrl) {
    redirect(redirectUrl);
  } else if (!session) {
    // https://nextjs.org/docs/app/api-reference/functions/unauthorized
    unauthorized();
  }

  return session;
}
