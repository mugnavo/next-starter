import Link from "next/link";

import { Button } from "~/components/ui/button";
import { getAuthSession } from "~/lib/auth";

export default async function Home() {
  const { user } = await getAuthSession();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-4xl font-bold">Mugnavo Next.js Starter</h1>
      <div className="flex items-center gap-2">
        This is an unprotected page:
        <pre className="rounded-md border bg-slate-50 p-1">app/page.tsx</pre>
      </div>

      {user ? (
        <div className="flex flex-col gap-2">
          <p>Welcome back, {user.name}!</p>
          <Button asChild className="w-fit" size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <div>
            More data:
            <pre>{JSON.stringify(user, null, 2)}</pre>
          </div>
          <form method="POST" action="/api/auth/logout">
            <Button type="submit" className="w-fit" variant="destructive" size="lg">
              Sign out
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>You are not signed in.</p>
          <Button asChild className="w-fit" size="lg">
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      )}

      <Button variant="outline" className="w-fit" asChild>
        <a
          href="https://github.com/mugnavo/next-starter"
          target="_blank"
          rel="noopener noreferrer"
          title="github.com/mugnavo/next-starter"
        >
          GitHub
        </a>
      </Button>
    </div>
  );
}
