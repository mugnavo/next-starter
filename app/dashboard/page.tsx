import { authGuard } from "~/lib/server/auth";

export default async function DashboardIndex() {
  // Perform authentication checks in each child route/page or in your data layer.
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
