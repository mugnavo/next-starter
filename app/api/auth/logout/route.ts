import { cookies } from "next/headers";

import { getAuthSession, invalidateSession, SESSION_COOKIE_NAME } from "~/lib/auth";

export async function POST() {
  const { session } = await getAuthSession();

  const cookieStore = await cookies();
  if (cookieStore.get(SESSION_COOKIE_NAME)) {
    cookieStore.delete(SESSION_COOKIE_NAME);
  }

  if (!session) {
    return new Response(null, {
      status: 401,
      headers: {
        Location: "/",
      },
    });
  }

  await invalidateSession(session.id);

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
