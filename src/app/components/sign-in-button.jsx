"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google", { redirectTo: "/tasks" })}
      className="bg-bg-700 p-4 rounded-2xl"
    >
      Sign in with Google
    </button>
  );
}
