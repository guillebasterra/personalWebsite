"use client";

import Link from "next/link";
import React from "react";

interface MenuProps {
  orientation: "vertical" | "horizontal";
  className?: string;
}

export default function Menu({ orientation, className }: MenuProps) {
  const isVertical = orientation === "vertical";
  return (
    <nav
      className={`
        flex
        ${isVertical ? "flex-col" : "flex-row"}
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
