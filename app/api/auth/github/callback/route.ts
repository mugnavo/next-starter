import { OAuth2RequestError } from "arctic";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";

import {
  createSession,
  generateSessionToken,
  github,
  setSessionTokenCookie,
} from "~/lib/auth";
import { db } from "~/lib/db";
import { oauthAccount, user } from "~/lib/db/schema";

interface GitHubUser {
  id: string;
  name: string | null;
  email: string;
  avatar_url: string;
  location: string | null;
  login: string;
}

export async function GET(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("github_oauth_state")?.value ?? null;

  if (!code || !state || !storedState || state !== storedState) {
    return new Response(null, {
      status: 400,
    });
  }

  const PROVIDER_ID = "github";

  try {
    const tokens = await github.validateAuthorizationCode(code);
    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    });
    const providerUser: GitHubUser = await githubUserResponse.json();

    const existingUser = await db.query.oauthAccount.findFirst({
      where: and(
        eq(oauthAccount.provider_id, PROVIDER_ID),
        eq(oauthAccount.provider_user_id, providerUser.id)
      ),
    });

    if (existingUser) {
      const token = generateSessionToken();
      const session = await createSession(token, existingUser.user_id);
      await setSessionTokenCookie(token, session.expires_at);
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/",
        },
      });
    } else {
      const existingUserEmail = await db.query.user.findFirst({
        where: eq(user.email, providerUser.email),
      });
      if (existingUserEmail) {
        await db.insert(oauthAccount).values({
          provider_id: PROVIDER_ID,
          provider_user_id: providerUser.id,
          user_id: existingUserEmail.id,
        });
        const token = generateSessionToken();
        const session = await createSession(token, existingUserEmail.id);
        setSessionTokenCookie(token, session.expires_at);
        return new Response(null, {
          status: 302,
          headers: {
            Location: "/",
          },
        });
      }
    }

    const userId = await db.transaction(async (tx) => {
      const [{ newId }] = await tx
        .insert(user)
        .values({
          email: providerUser.email,
          name: providerUser.name || providerUser.login,
          avatar_url: providerUser.avatar_url,
        })
        .returning({ newId: user.id });
      await tx.insert(oauthAccount).values({
        provider_id: PROVIDER_ID,
        provider_user_id: providerUser.id,
        user_id: newId,
      });
      return newId;
    });

    const token = generateSessionToken();
    const session = await createSession(token, userId);
    await setSessionTokenCookie(token, session.expires_at);
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/",
      },
    });
  } catch (e) {
    console.log(e);
    if (e instanceof OAuth2RequestError) {
      return new Response(null, {
        status: 400,
      });
    }
    return new Response(null, {
      status: 500,
    });
  }
}
