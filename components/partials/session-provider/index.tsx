"use client";

import { SessionProvider as SessionProviderWrapper } from "next-auth/react";

export default function SessionProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProviderWrapper>{children}</SessionProviderWrapper>;
}
