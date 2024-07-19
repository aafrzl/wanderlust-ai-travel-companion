"use client";

import { links } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function NavLink() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link, idx) => (
        <Link
          key={idx}
          href={link.href}
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname === link.href && "text-foreground font-medium"
          )}
        >
          {link.title}
        </Link>
      ))}
    </>
  );
}
