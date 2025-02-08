import Link from "next/link";
import { Button } from "~/lib/components/ui/button";
import { authGuard } from "~/lib/server/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE:
  // You should always perform authentication checks in each child route/page or in your data layer. Do not rely on parent layouts for auth guards.
  // See https://youtu.be/EGDD0rlBd8Q
  await authGuard("/signin");

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold">Dashboard Layout</h1>
      <pre className="rounded-md border bg-card p-1 text-card-foreground">
        app/dashboard/layout.tsx
      </pre>

      <Button asChild className="w-fit" size="lg">
        <Link href="/">Back to Home</Link>
      </Button>

      {children}
    </div>
  );
}
