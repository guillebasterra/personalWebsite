"use client";

import "./globals.css";
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Menu from "./components/Menu";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // We'll treat "/" and "/home" as "home" routes
  const isHome = pathname === "/" || pathname === "/home";

  return (
    <html lang="en">
      <body className="bg-[#e3e1da] min-h-screen relative">
        {/*
          1) Outer container that was on your Home page:
             - centers content
             - w-[80vw] max-w-4xl, etc.
          2) We always render it, so the LA image (from page.tsx) 
             can appear inside {children}, *and* 
             the nav/signature can sit on top if needed.
        */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="relative w-[80vw] max-w-4xl overflow-visible">
            {/* 
              2a) The child route content goes here.
                  On Home, that's your LA image, etc.
                  On About, Resume, Contact, it's your other content.
            */}
            {children}

            {/*
              3) Signature.
                 We do NOT short‐circuit — we always render the same DOM node 
                 but change classes (position, size) if it’s home or not.
            */}
            <Link
              href="/"
              // We wrap the signature in a Link, so clicking it goes home
              className={`
                absolute z-10
                ${isHome
                  ? `
                    // HOME layout for signature:
                    top-5 left-0
                    w-[30vw]
                    transform -translate-x-1/2 -translate-y-1/2
                  `
                  : `
                    // NON-HOME layout (pin top-left inside container):
                    top-5 left-5
                    w-[10vw] min-w-[100px] max-w-[150px]
                  `
                }
              `}
            >
              <img
                src="/images/sig.png"
                alt="Signature"
                className="w-full h-auto"
              />
            </Link>

            {/*
              4) Nav (the big red text on home, vertical on other pages).
                 We always render the same <nav> but swap classes 
                 for position/orientation. We'll use your "Menu" 
                 if you created one, or replicate the links inline.
            */}
            <div
              className={`
                absolute z-10 
                ${isHome
                  ? `
                    // HOME: bottom-centered, big text
                    bottom-0 left-1/2
                    transform -translate-x-1/2 translate-y-1/2
                  `
                  : `
                    // NON-HOME: top-left corner (below signature),
                    // vertical layout or small horizontal, your choice
                    top-[8rem] left-5
                  `
                }
              `}
            >
              {/* 
                Use the same <Menu> you showed earlier, 
                but pass orientation/className so it matches your “big red bottom” for home 
                vs. “vertical side” for the other pages 
              */}
              {isHome ? (
                <Menu
                  orientation="horizontal"
                  className="text-red-600 font-sans font-bold text-[4vw] space-x-[3vw]"
                />
              ) : (
                <Menu
                  orientation="vertical"
                  className="text-red-600 font-sans font-bold text-xl space-y-4"
                />
              )}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
