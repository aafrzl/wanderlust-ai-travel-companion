"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
