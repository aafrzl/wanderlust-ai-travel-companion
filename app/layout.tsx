import RootProvider from "@/components/root-providers";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wanderlust | Your AI Travel Companion",
  description:
    "Wanderlust is your AI Travel Companion for planning your next trip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("antialiased", font.className)}>
        <RootProvider>
          {children}
          <Toaster />
        </RootProvider>
      </body>
    </html>
  );
}
