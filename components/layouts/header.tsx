import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ThemeToggle } from "../theme-toggle";
import MenuMobile from "./menu-mobile";
import MenuUser from "./menu-user";
import NavbarDesktop from "./navbar-desktop";

export default async function Header() {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 z-20">
      <NavbarDesktop />
      <MenuMobile />
      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <ThemeToggle />
        <MenuUser />
      </div>
    </header>
  );
}
