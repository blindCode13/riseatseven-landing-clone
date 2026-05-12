"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/Observer";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import img1 from "@/assets/images/common/8.webp";
import img2 from "@/assets/images/common/9.webp";

gsap.registerPlugin(useGSAP, Observer);

export default function InfiniteMarquee() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(
    () => {
      const slider = sliderRef.current;
      const container = containerRef.current;
      const cursor = cursorRef.current;

      if (!slider || !container || !cursor) return;

      // =====================================================
      // CONFIG
      // =====================================================

      const BASE_SPEED = 0.5;

      // downward scroll speed boost
      const DOWN_MULTIPLIER = 0.025;

      // max boosted speed
      const MAX_SPEED = 8;

      // reverse speed on upward scroll
      const REVERSE_SPEED = 8;

      // smoothing
      const SMOOTHING = 0.08;

      // =====================================================
      // CUSTOM CURSOR
      // =====================================================

      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
      });

      const moveCursor = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power3.out",
        });
      };

      const handleMouseEnter = () => {
        gsap.to(cursor, {
          opacity: 1,
          scale: 1,
          duration: 0.35,
          ease: "back.out(1.7)",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(cursor, {
          opacity: 0,
          scale: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", moveCursor);

      container.addEventListener(
        "mouseenter",
        handleMouseEnter
      );

      container.addEventListener(
        "mouseleave",
        handleMouseLeave
      );

      // =====================================================
      // HORIZONTAL LOOP
      // =====================================================

      const items = gsap.utils.toArray(".marquee-item");

      const horizontalLoop = (
        items,
        config = {}
      ) => {
        items = gsap.utils.toArray(items);

        let tl = gsap.timeline({
          repeat: config.repeat,
          paused: config.paused,
          defaults: {
            ease: "none",
          },

          onReverseComplete: () => {
            tl.totalTime(
              tl.rawTime() + tl.duration() * 100
            );
          },
        });

        let length = items.length;
        let startX = items[0].offsetLeft;

        let widths = [];
        let xPercents = [];

        let pixelsPerSecond =
          (config.speed || 1) * 100;

        gsap.set(items, {
          xPercent: (i, el) => {
            let w = (widths[i] = parseFloat(
              gsap.getProperty(el, "width", "px")
            ));

            xPercents[i] =
              (parseFloat(
                gsap.getProperty(el, "x", "px")
              ) /
                w) *
                100 +
              gsap.getProperty(el, "xPercent");

            return xPercents[i];
          },
        });

        gsap.set(items, { x: 0 });

        const totalWidth =
          items[length - 1].offsetLeft +
          (xPercents[length - 1] / 100) *
            widths[length - 1] -
          startX +
          items[length - 1].offsetWidth +
          (parseFloat(config.paddingRight) || 0);

        for (let i = 0; i < length; i++) {
          let item = items[i];

          let curX =
            (xPercents[i] / 100) * widths[i];

          let distanceToStart =
            item.offsetLeft - startX;

          let distanceToLoop =
            distanceToStart + widths[i];

          tl.to(
            item,
            {
              xPercent:
                ((curX - distanceToLoop) /
                  widths[i]) *
                100,

              duration:
                distanceToLoop / pixelsPerSecond,
            },
            0
          ).fromTo(
            item,
            {
              xPercent:
                ((curX -
                  distanceToLoop +
                  totalWidth) /
                  widths[i]) *
                100,
            },
            {
              xPercent: xPercents[i],

              duration:
                (curX -
                  distanceToLoop +
                  totalWidth -
                  curX) /
                pixelsPerSecond,

              immediateRender: false,
            },
            distanceToLoop / pixelsPerSecond
          );
        }

        return tl;
      };

      const loop = horizontalLoop(items, {
        repeat: -1,
        speed: 1,
        paddingRight: 40,
      });

      // =====================================================
      // SPEED SYSTEM
      // =====================================================

      let currentScale = BASE_SPEED;
      let targetScale = BASE_SPEED;

      loop.timeScale(currentScale);

      let scrollTimeout;
      let observer;

      // =====================================================
      // ENABLE SCROLL EFFECT ONLY ON DESKTOP
      // =====================================================

      if (window.innerWidth >= 768) {
        observer = Observer.create({
          target: window,
          type: "wheel,touch,pointer",

          onChangeY: (self) => {
            clearTimeout(scrollTimeout);

            const velocity = self.velocityY;

            // DOWN SCROLL = SPEED UP
            if (velocity > 0) {
              targetScale =
                BASE_SPEED +
                Math.min(
                  velocity *
                    DOWN_MULTIPLIER,
                  MAX_SPEED
                );
            }

            // UP SCROLL = REVERSE
            else if (velocity < 0) {
              targetScale =
                -BASE_SPEED *
                REVERSE_SPEED;
            }

            // RESET TO NORMAL
            scrollTimeout = setTimeout(() => {
              targetScale = BASE_SPEED;
            }, 120);
          },
        });
      }

      // =====================================================
      // RAF LOOP
      // =====================================================

      const updateMarquee = () => {
        currentScale = gsap.utils.interpolate(
          currentScale,
          targetScale,
          SMOOTHING
        );

        loop.timeScale(currentScale);
      };

      gsap.ticker.add(updateMarquee);

      // =====================================================
      // CLEANUP
      // =====================================================

      return () => {
        window.removeEventListener(
          "mousemove",
          moveCursor
        );

        container.removeEventListener(
          "mouseenter",
          handleMouseEnter
        );

        container.removeEventListener(
          "mouseleave",
          handleMouseLeave
        );

        gsap.ticker.remove(updateMarquee);

        observer?.kill();

        loop.kill();
      };
    },
    { scope: containerRef }
  );

  const MarqueeGroup = () => (
    <div className="marquee-item flex items-center shrink-0 gap-x-4 md:gap-x-10 px-5">
      <h2
        className="
          text-black
          text-[15vw]
          lg:text-[10vw]
          font-medium
          tracking-tighter
          leading-[0.9]
        "
      >
        Chasing Consumers
      </h2>

      <div
        className="
          relative
          w-[25vw]
          lg:w-[10vw]
          aspect-square
          rounded-2xl
          lg:rounded-3xl
          overflow-hidden
        "
      >
        <Image
          src={img2}
          alt="Work"
          fill
          className="object-cover"
          sizes="15vw"
        />
      </div>

      <h2
        className="
          text-black
          text-[15vw]
          lg:text-[10vw]
          font-medium
          tracking-tighter
          leading-[0.9]
        "
      >
        Not Algorithms
      </h2>

      <div
        className="
          relative
          w-[25vw]
          lg:w-[10vw]
          aspect-square
          rounded-2xl
          lg:rounded-3xl
          overflow-hidden
        "
      >
        <Image
          src={img1}
          alt="Team"
          fill
          className="object-cover"
          sizes="15vw"
        />
      </div>
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="
        relative
        w-full
        py-6
        lg:py-20
        overflow-hidden
        bg-transparent
        cursor-none
      "
    >
      {/* CURSOR */}
      <div
        ref={cursorRef}
        className="
          fixed
          top-0
          left-0
          z-[999]
          pointer-events-none
          flex
          items-center
          justify-center
          gap-2
          px-6
          py-3
          bg-[#b2f6e3]
          text-black
          rounded-full
          shadow-lg
          opacity-0
          scale-0
          whitespace-nowrap
        "
      >
        <span
          className="
            text-[12px]
            xl:text-[14px]
            font-bold
            uppercase
            tracking-tight
          "
        >
          Send Us Your Brief
        </span>

        <ArrowUpRight className="size-4 xl:size-5" />
      </div>

      {/* MARQUEE */}
      <div
        ref={sliderRef}
        className="flex whitespace-nowrap"
      >
        <MarqueeGroup />
        <MarqueeGroup />
        <MarqueeGroup />
        <MarqueeGroup />
      </div>
    </section>
  );
}