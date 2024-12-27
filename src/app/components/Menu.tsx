// components/Menu.tsx

"use client";

import Link from "next/link";
import React from "react";

/** 
 * Example props if you want to customize orientation/color, etc.
 * Adjust to your needs. 
 */
interface MenuProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export default function Menu({
  orientation = "vertical",
  className = "",
}: MenuProps) {
  const isVertical = orientation === "vertical";

  return (
    <nav
      className={`
        flex font-sans font-bold text-red-600
        ${isVertical ? "flex-col space-y-4" : "flex-row space-x-8"}
        ${className}
      `}
    >
      <Link href="/" className="hover:underline">
        HOME
      </Link>
      <Link href="/about" className="hover:underline">
        ABOUT
      </Link>
      <Link href="/resume" className="hover:underline">
        RESUME
      </Link>
      <Link href="/contact" className="hover:underline">
        CONTACT
      </Link>
    </nav>
  );
}
