import React from "react";
import Logo from "./logo";
import NavLink from "./nav-link";

export default function NavbarDesktop() {
  return (
    <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Logo />
      <NavLink />
    </nav>
  );
}
