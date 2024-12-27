"use client";

import "./globals.css"; // your Tailwind/global styles
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Menu from "./components/Menu"; // import the Menu component
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/"

  // 1) IF HOME PAGE => Use your "exact" home layout, but replace nav with <Menu>
  if (isHomePage) {
    return (
      <html lang="en">
        <body className="bg-[#e3e1da] min-h-screen flex items-center justify-center">
          <div className="relative w-[80vw] max-w-4xl overflow-visible">
            <div className="relative w-full h-auto">
              {children /* Render the Home page content (LA image, etc.) */}

              {/* Signature pinned as on Home */}
              <a href="/">
                <img
                  src="/images/sig.png"
                  alt="Signature"
                  className="
                    absolute
                    top-5 left-0
                    z-10
                    w-[30vw]
                    transform
                    -translate-x-1/2
                    -translate-y-1/2
                  "
                />
              </a>

              {/* 
                Bottom menu. We pass `orientation="horizontal"` 
                plus some classes to replicate your home nav styling.
              */}
              <div
                className="
                  absolute
                  z-10
                  bottom-0 left-1/2
                  transform -translate-x-1/2 translate-y-[50%]
                "
              >
                <Menu
                  orientation="horizontal"
                  className="text-[4vw] space-x-[3vw]" 
                />
              </div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // 2) ANY PAGE OTHER THAN HOME => side menu w/ hamburger
  return (
    <html lang="en">
      <body className="bg-[#e3e1da] min-h-screen relative overflow-visible">
        <div className="flex w-full h-full">
          {/* SIGNATURE + VERTICAL MENU (desktop) */}
          <aside
            className="
              hidden md:flex 
              flex-col items-start 
              p-8 
              w-[15vw] max-w-xs
              border-r border-red-300
              text-red-600 font-bold
            "
          >
            {/* Signature pinned at top */}
            <Link href="/">
              <img
                src="/images/sig.png"
                alt="Signature"
                className="w-[10vw] max-w-[150px] mb-4"
              />
            </Link>

            {/* 
              Our <Menu> with vertical orientation 
              and some extra spacing 
            */}
            <Menu orientation="vertical" className="space-y-4" />
          </aside>

          {/* HAMBURGER FOR SMALL SCREENS */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="fixed top-4 left-4 z-50 md:hidden bg-red-600 text-white p-2 rounded"
          >
            ☰
          </button>

          {/* MOBILE MENU OVERLAY */}
          {menuOpen && (
            <div
              className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
              onClick={() => setMenuOpen(false)}
            >
              <aside
                className="
                  absolute top-0 left-0 w-[70vw] h-full bg-[#e3e1da] 
                  flex flex-col p-6 space-y-6 
                  text-red-600 font-bold
                "
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="self-end text-3xl"
                  onClick={() => setMenuOpen(false)}
                >
                  ×
                </button>

                {/* Signature smaller on mobile if desired */}
                <Link href="/">
                  <img
                    src="/images/sig.png"
                    alt="Signature"
                    className="w-[30vw] mb-4"
                  />
                </Link>

                {/* 
                  Same <Menu> with vertical orientation, 
                  slightly bigger text for mobile, etc.
                */}
                <Menu
                  orientation="vertical"
                  className="text-[5vw] space-y-6"
                />
              </aside>
            </div>
          )}

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
