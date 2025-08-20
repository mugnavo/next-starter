import { redirect } from "next/navigation";

import { getAuthSession } from "@/lib/auth/auth";
import { SignInButton } from "./SignInButton";

const callbackURL = "/dashboard";

export default async function AuthPage() {
  const session = await getAuthSession();

  if (session) {
    redirect(callbackURL);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="bg-card flex flex-col items-center gap-8 rounded-xl border p-10">
        Logo here
        <div className="flex flex-col gap-2">
          <SignInButton
            provider="github"
            label="GitHub"
            callbackURL={callbackURL}
            className="bg-neutral-700 hover:bg-neutral-700/80"
          />
          <SignInButton
            provider="google"
            label="Google"
            callbackURL={callbackURL}
            className="bg-[#DB4437] hover:bg-[#DB4437]/80"
          />
        </div>
      </div>
    </div>
  );
}
