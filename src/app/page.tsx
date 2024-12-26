// app/page.tsx
import React from "react";

export default function Home() {
  return (
    <>
      {/* LA image only. The layout above handles the rest. */}
      <img
        src="/images/LA.png"
        alt="LA City View"
        className="w-max h-auto z-0"
      />
    </>
  );
}
