import Header from "@/components/layouts/header";
import React from "react";

export default function LayoutDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-col gap-4 p-2 sm:gap-6 sm:p-6">
        {children}
      </main>
    </div>
  );
}
