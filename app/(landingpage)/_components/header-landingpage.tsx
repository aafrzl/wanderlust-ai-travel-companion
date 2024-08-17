import Logo from "@/components/layouts/logo";
import MenuUser from "@/components/layouts/menu-user";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="container w-[90%] lg:w-full flex items-center justify-between bg-secondary/50 dark:bg-background/50 backdrop-blur-md drop-shadow-md rounded-full fixed top-5 inset-x-0 mx-auto pb-1 px-4 shadow-md z-20">
      <Logo />
      <div className="flex items-center gap-x-4">
        {session ? (
          <MenuUser />
        ) : (
          <Link
            href="/auth/login"
            className={cn(buttonVariants(), "rounded-full font-medium")}
          >
            Login
          </Link>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
