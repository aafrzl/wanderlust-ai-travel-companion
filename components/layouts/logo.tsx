import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-semibold md:text-base"
    >
      <Image
        src="/wanderlust-logo-light.svg"
        alt="Logo Wanderlust"
        width={24}
        height={24}
        className="w-fit h-14 dark:hidden inline"
      />
      <Image
        src="/wanderlust-logo-dark.svg"
        alt="Logo Wanderlust"
        width={24}
        height={24}
        className="w-fit h-14 hidden dark:inline"
      />
      <span className="sr-only">Wanderlust</span>
    </Link>
  );
}
