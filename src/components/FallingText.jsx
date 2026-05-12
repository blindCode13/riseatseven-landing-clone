"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const text = "Ready to Rise at Seven?";
const CHAR_Y_START = -60; // tweak this — yPercent, so -60 = 60% of char height above

export default function DropSlideText() {
  const container = useRef(null);
  const heading = useRef(null);

  useGSAP(
    () => {
      const headingEl = heading.current;
      const headingWidth = headingEl.offsetWidth;
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Position heading off to the right initially
      gsap.set(headingEl, {
        y: 150,
        x: headingWidth - windowWidth + windowWidth * 0.5,
      });

      // Slide heading horizontally
      gsap.to(headingEl, {
        x: () => -(headingWidth - window.innerWidth + 1000),
        y: 400,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "+=" + (headingWidth - windowWidth + windowHeight * 0.35),
          scrub: true,
        },
      });

      // Split into chars and drop them
      const splitText = new SplitText(headingEl, { type: "chars" });
      const chars = splitText.chars;

      gsap.set(chars, {
        yPercent: CHAR_Y_START,
        rotate: 10,
      });

      gsap.to(chars, {
        yPercent: 0,
        rotate: 0,
        ease: "back.inOut(4)",
        stagger: 0.35,
        duration: 2.5,
        scrollTrigger: {
          trigger: container.current,
          start: "top 77%",
          end: "+=" + (headingWidth - windowWidth + 200),
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <section
      ref={container}
      className="overflow-hidden h-[100vh] hidden xl:flex"
    >
      <div className="flex h-[100vh]">
        <div
          ref={heading}
          className="shrink-0 text-[16vw] font-medium tracking-tight leading-tight"
          aria-label={text}
        >
          {text}
        </div>
      </div>
    </section>
  );
}