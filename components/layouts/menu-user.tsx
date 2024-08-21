"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

export default function MenuUser() {
  const session = useSession();

  if (!session) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 cursor-pointer">
          <AvatarImage src={session.data?.user?.image || ""} />
          <AvatarFallback>
            {session.data?.user?.name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <p className="text-xs px-2 py-1.5">
          <strong>{session.data?.user?.name}</strong>
          <br />
          <span className="text-gray-500">{session.data?.user?.email}</span>
        </p>
        <DropdownMenuItem>
          <Link href={"mailto:afrizal.mufriz25@gmail.com"}>Support</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
