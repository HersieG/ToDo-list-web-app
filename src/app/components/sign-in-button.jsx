"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
export default function SignInButton() {
  return (
    <button
      onClick={() => signIn("google", { redirectTo: "/tasks" })}
      className="bg-bg-700 p-4 rounded-2xl shadow-s active:scale-95 hover:cursor-pointer text-text hover:shadow-l transition-all duration-100"
    >
      Sign in with Google
    </button>
  );
}
