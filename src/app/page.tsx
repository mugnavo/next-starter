import Link from "next/link";
import { Suspense } from "react";

import { SignOutButton } from "@/components/sign-out-btn";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth/auth";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-4xl font-bold">Mugnavo Next.js Starter</h1>
      <div className="flex items-center gap-2">
        This is an unprotected page:
        <pre className="bg-card text-card-foreground rounded-md border p-1">
          app/page.tsx
        </pre>
      </div>

      <Suspense fallback={<div>Loading user...</div>}>
        <UserAction />
      </Suspense>

      <ThemeToggle />

      <a
        className="text-muted-foreground hover:text-foreground underline"
        href="https://github.com/mugnavo/next-starter"
        target="_blank"
        rel="noreferrer noopener"
      >
        mugnavo/next-starter
      </a>
    </div>
  );
}

async function UserAction() {
  const session = await getAuthSession();

  return session ? (
    <div className="flex flex-col gap-2">
      <p>Welcome back, {session.user.name}!</p>
      <Button render={<Link href="/dashboard" />} className="w-fit" size="lg">
        Go to Dashboard
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
      <Button render={<Link href="/signin" />} className="w-fit" size="lg">
        Sign in
      </Button>
    </div>
  );
}
