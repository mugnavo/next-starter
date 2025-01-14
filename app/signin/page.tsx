import { auth, getAuthSession } from "~/lib/server/auth";

import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";

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
        <form className="flex flex-col gap-2">
          <SignInButton provider="discord" label="Discord" />
          <SignInButton provider="github" label="GitHub" />
          <SignInButton provider="google" label="Google" />
        </form>
      </div>
    </div>
  );
}

function SignInButton({
  provider,
  label,
}: {
  provider: "discord" | "google" | "github";
  label: string;
}) {
  async function signIn() {
    "use server";

    const res = await auth.api.signInSocial({
      body: { provider },
      callbackURL,
    });
    if (res.url) {
      redirect(res.url);
    }
  }

  return (
    <Button formAction={signIn} type="submit" variant="outline" size="lg">
      Sign in with {label}
    </Button>
  );
}
