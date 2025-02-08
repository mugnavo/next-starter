"use client";

import { type ComponentProps } from "react";
import { Button } from "~/lib/components/ui/button";
import authClient from "~/lib/utils/auth-client";

interface Props extends ComponentProps<typeof Button> {
  provider: "discord" | "google" | "github";
  label: string;
  callbackURL?: string;
}

export function SignInButton({ provider, label, callbackURL, ...props }: Props) {
  return (
    <Button
      onClick={() =>
        authClient.signIn.social({
          provider,
          callbackURL,
        })
      }
      type="button"
      variant="outline"
      size="lg"
      {...props}
    >
      Sign in with {label}
    </Button>
  );
}
