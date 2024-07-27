import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import type { Provider } from "next-auth/providers";
import google from "next-auth/providers/google";
import { skipCSRFCheck } from "@auth/core";

const providers: Provider[] = [google];
const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  providers,
  pages: {
    signIn: "/auth/login",
  },
  skipCSRFCheck,
});
