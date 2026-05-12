"use client";

import { useEffect } from "react";

import Lenis from "lenis";

export default function useSmoothScroll() {
  useEffect(() => {
    const isTouchDevice =
      window.matchMedia("(pointer: coarse)")
        .matches;

    // disable smooth scroll on touch devices
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    let animationFrameId;

    const raf = (time) => {
      lenis.raf(time);

      animationFrameId =
        requestAnimationFrame(raf);
    };

    animationFrameId =
      requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);

      lenis.destroy();
    };
  }, []);
}