"use client";

import "./globals.css"; // your Tailwind/global styles
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  // We'll treat "/" and "/home" as the "home" route
  const isHomePage = pathname === "/" || pathname === "/home";

  // ----------------------------------------------------
  // 1) HOME PAGE LAYOUT (exactly like your current home)
  // ----------------------------------------------------
  if (isHomePage) {
    return (
      <html lang="en">
        <body className="bg-[#e3e1da] min-h-screen flex items-center justify-center">
          {/* Container sized to 80% of the viewport width, up to a max */}
          <div className="relative w-[80vw] max-w-4xl overflow-visible">
            <div className="relative w-full h-auto">
              {/* Renders whatever <Home> exports (the LA image, etc.) */}
              {children}

              {/* Signature pinned exactly as in your Home code */}
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

              {/* Bottom nav, same styling as your Home code */}
              <nav
                className="
                  absolute
                  z-10
                  bottom-0 left-1/2
                  flex space-x-[3vw]
                  text-red-600 font-sans font-bold
                  text-[4vw]
                  transform
                  -translate-x-1/2
                  translate-y-[50%]
                "
              >
                <Link href="/" className="hover:underline">
                  HOME
                </Link>
                <Link href="/about" className="hover:underline">
                  ABOUT
                </Link>
                <Link href="/contact" className="hover:underline">
                  CONTACT
                </Link>
              </nav>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // ---------------------------------------------------------
  // 2) SIDE MENU FOR ANY PAGE OTHER THAN HOME
  // ---------------------------------------------------------
  return (
    <html lang="en">
      <body className="bg-[#e3e1da] min-h-screen relative overflow-visible">
        {/* 
          Main wrapper - We’ll have a vertical menu for larger screens (md+),
          and a hamburger for small screens. 
        */}
        <div className="flex w-full h-full">
          {/* SIGNATURE + SIDE MENU (larger screens) */}
          <aside
            className={`
              hidden md:flex 
              flex-col items-start
              text-red-600 font-bold font-sans 
              text-[2vw]      /* tweak as you like */
              p-8 
              w-[15vw]       /* side menu width */
              max-w-xs
              space-y-8
              border-r border-red-300
            `}
          >
            {/* Signature pinned at the top, smaller if desired */}
            <Link href="/">
              <img
                src="/images/sig.png"
                alt="Signature"
                className="w-[10vw] max-w-[150px]"
              />
            </Link>

            {/* Nav links in a vertical stack */}
            <div className="flex flex-col space-y-4 mt-4">
              <Link href="/" className="hover:underline">
                HOME
              </Link>
              <Link href="/about" className="hover:underline">
                ABOUT
              </Link>
              <Link href="/contact" className="hover:underline">
                CONTACT
              </Link>
            </div>
          </aside>

          {/* HAMBURGER BUTTON (small screens only) */}
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
                  flex flex-col p-6 space-y-6 text-red-600 font-bold text-[5vw]
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

                <Link
                  href="/"
                  className="hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link
                  href="/about"
                  className="hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  ABOUT
                </Link>
                <Link
                  href="/contact"
                  className="hover:underline"
                  onClick={() => setMenuOpen(false)}
                >
                  CONTACT
                </Link>
              </aside>
            </div>
          )}

          {/* MAIN CONTENT AREA (non-home pages) */}
          <main className="flex-1 p-4 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
