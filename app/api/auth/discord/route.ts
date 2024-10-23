import { generateState } from "arctic";
import { cookies } from "next/headers";

import { discord } from "~/lib/auth";

export async function GET(): Promise<Response> {
  const state = generateState();

  const url = discord.createAuthorizationURL(state, ["identify", "email"]);

  const cookieStore = await cookies();
  cookieStore.set("discord_oauth_state", state, {
    path: "/",
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return Response.redirect(url);
}
