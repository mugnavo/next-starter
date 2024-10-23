import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { getAuthSession } from "~/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getAuthSession();
  // Protected layout, redirect if not authenticated

  if (!user) {
    return redirect("/signin");
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold">Dashboard Layout</h1>
      <div className="flex items-center gap-2">
        This is a protected layout:
        <pre className="rounded-md border bg-slate-50 p-1">app/dashboard/layout.tsx</pre>
      </div>

      <Button asChild className="w-fit" size="lg">
        <Link href="/">Back to Home</Link>
      </Button>

      {children}
    </div>
  );
}
