"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/lib/components/ui/button";
import authClient from "~/lib/utils/auth-client";

export function SignOutButton() {
  const router = useRouter();

  async function signOut() {
    await authClient.signOut();

    router.refresh();
  }

  return (
    <Button
      type="submit"
      className="w-fit"
      variant="destructive"
      size="lg"
      onClick={signOut}
    >
      Sign out
    </Button>
  );
}
