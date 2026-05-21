"use client";

import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  // get user info from session
  const { data: session } = useSession();

  return (
    <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6">
      <h1 className="text-sm font-medium text-gray-500">
        Welcome back, {session?.user?.name} 👋
      </h1>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="text-sm text-gray-500 hover:text-red-500 transition-colors"
      >
        Sign out
      </button>
    </header>
  );
}
