"use client";

import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth/auth-client";
import type { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
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
      size="lg"
      {...props}
    >
      Sign in with {label}
    </Button>
  );
}
