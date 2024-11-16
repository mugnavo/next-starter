import { authGuard } from "~/lib/auth";

export default async function DashboardIndex() {
  // Each child route/page should perform its own authentication checks.
  // Do not rely on parent layouts for auth guards.
  const { user } = await authGuard("/signin");

  return (
    <div className="flex flex-col gap-1">
      Dashboard index page
      <pre className="rounded-md border bg-card p-1 text-card-foreground">
        app/dashboard/page.tsx
      </pre>
      <div className="mt-4">
        User data:
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </div>
  );
}
