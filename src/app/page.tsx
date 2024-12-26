import React from 'react';

export default function Home() {
  return (
    <main className="bg-[#f3f2ed] min-h-screen flex items-center justify-center overflow-visible">
      {/* 
        The outer "frame" container. 
        Width is 80% of viewport width (w-[80vw]) 
        and maxed at 4xl for extremely large screens.
      */}
      <div className="relative w-[80vw] max-w-4xl overflow-visible">
        {/* 
          A relative wrapper so the image, signature,
          and nav can be layered on top of each other.
        */}
        <div className="relative w-full">
          {/* Main LA image, set to z-0 so other items sit above it. */}
          <img
            src="/images/LA.png"
            alt="LA City View"
            className="w-full h-auto z-0"
          />

          {/* Signature - absolute with higher z-index to overlap the image */}
          <img
            src="/images/sig.png"
            alt="Signature"
            className="absolute top-[3vw] left-[-1vw] -translate-x-25 w-[20vw] z-10 overflow-visible"
          />

          {/* Bottom Nav - absolute with higher z-index to overlap as well */}
          <nav
            className="
              absolute 
              bottom-[3vw] left-1/2 
              flex space-x-[3vw] 
              text-red-600 font-sans font-bold 
              text-[3vw] z-10 
              transform -translate-x-1/2
            "
          >
            <a href="/home" className="hover:underline">
              HOME
            </a>
            <a href="/about" className="hover:underline">
              ABOUT
            </a>
            <a href="/contact" className="hover:underline">
              CONTACT
            </a>
          </nav>
        </div>
      </div>
    </main>
  );
}
