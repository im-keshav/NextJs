import Link from "next/link";
import React from "react";
import { ModeToggle } from "./toggleTheme";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b border-border bg-card/50 backdrop-blur-md">
      <Link
        href="/home"
        className="text-xl font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity"
      >
        E-comm
      </Link>

      <div className="flex items-center gap-6 font-medium text-sm text-muted-foreground">
        <Link href="/home" className="hover:text-foreground transition-colors">
          Home
        </Link>
        <Link
          href="/products"
          className="hover:text-foreground transition-colors"
        >
          Products
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
