"use client";

import { Button, type ButtonProps } from "~/components/ui/button";
import authClient from "~/lib/utils/auth-client";

interface Props extends ButtonProps {
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
