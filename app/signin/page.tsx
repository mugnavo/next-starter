import { getAuthSession } from "~/lib/server/auth";

import { redirect } from "next/navigation";

import { SignInButton } from "./SignInButton";

const callbackURL = "/dashboard";

export default async function AuthPage() {
  const session = await getAuthSession();

  if (session) {
    redirect(callbackURL);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-8 rounded-xl border bg-card p-10">
        Logo here
        <div className="flex flex-col gap-2">
          <SignInButton provider="discord" label="Discord" callbackURL={callbackURL} />
          <SignInButton provider="github" label="GitHub" callbackURL={callbackURL} />
          <SignInButton provider="google" label="Google" callbackURL={callbackURL} />
        </div>
      </div>
    </div>
  );
}
