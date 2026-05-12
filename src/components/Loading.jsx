"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Loader() {
  const loaderRef = useRef(null);

  useGSAP(() => {
    gsap.to(loaderRef.current, {
      y: "-140vh",
      duration: 1,
      ease: "expo.inOut",
      onComplete: () => {
        loaderRef.current?.remove();
      },
    });
  });

  return (
    <div className="fixed inset-0 overflow-hidden z-[9999] pointer-events-none">
      <svg
        ref={loaderRef}
        className="absolute inset-0 w-full h-[160vh] will-change-transform"
        viewBox="0 0 1000 1400"
        preserveAspectRatio="none"
      >
        <path
          d="
            M0 0
            H1000
            V1100
            Q500 850 0 1100
            Z
          "
          fill="#b2f6e3"
        />
      </svg>
    </div>
  );
}