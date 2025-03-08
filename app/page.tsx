import Link from "next/link";

import { SignOutButton } from "~/lib/components/SignOutButton";
import ThemeToggle from "~/lib/components/ThemeToggle";
import { Button } from "~/lib/components/ui/button";
import { getAuthSession } from "~/lib/server/auth";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-4xl font-bold">Mugnavo Next.js Starter</h1>
      <div className="flex items-center gap-2">
        This is an unprotected page:
        <pre className="rounded-md border bg-card p-1 text-card-foreground">
          app/page.tsx
        </pre>
      </div>

      {session ? (
        <div className="flex flex-col gap-2">
          <p>Welcome back, {session.user.name}!</p>
          <Button asChild className="w-fit" size="lg">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <div>
            More data:
            <pre>{JSON.stringify(session.user, null, 2)}</pre>
          </div>
          <SignOutButton />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <p>You are not signed in.</p>
          <Button asChild className="w-fit" size="lg">
            <Link href="/signin">Sign in</Link>
          </Button>
        </div>
      )}

      <ThemeToggle />

      <a
        className="text-muted-foreground underline hover:text-foreground"
        href="https://github.com/mugnavo/next-starter"
        target="_blank"
        rel="noreferrer noopener"
      >
        mugnavo/next-starter
      </a>
    </div>
  );
}
