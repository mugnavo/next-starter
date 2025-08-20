"use client";

import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  function signOut() {
    authClient.signOut({
      fetchOptions: {
        onResponse: () => router.refresh(),
      },
    });
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
