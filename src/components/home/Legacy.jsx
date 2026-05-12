"use client";

import { useRef, useState } from "react";

import Image from "next/image";

import Image1 from "@/assets/images/common/1.webp";
import Image2 from "@/assets/images/common/2.webp";
import Image3 from "@/assets/images/common/3.webp";

import { Swiper, SwiperSlide } from "swiper/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    image: Image1,
    title: "Pioneers",
    description: `
      We're dedicated to creating the industry narrative that others
      follow 3 years from now. We paved the path for creative SEO,
      multi-channel search with Digital PR, and Social Search and
      we will continue to do it.
      <br /><br />
      We're on a mission to be the first search-first agency to win
      a Cannes Lion disrupting the status quo.
    `,
    bg: "bg-black-bg",
    text: "text-white",
    rotate: 4,
  },
  {
    image: Image2,
    title: "Award Winning",
    description: `
      A roll top bath full of 79 awards. Voted The Drum's best
      agency outside of London. We are official judges for industry
      awards including Global Search Awards and Global Content
      Marketing Awards.
    `,
    bg: "bg-light-green",
    text: "text-black",
    rotate: 8,
  },
  {
    image: Image3,
    title: "Speed",
    description: `
      People ask us why we are called Rise at Seven? Ever heard
      the saying Early Bird catches the worm? Google is moving fast,
      but humans are moving faster. We chase consumers, not
      algorithms. We've created a service which takes ideas to
      result within 60 minutes.
    `,
    bg: "bg-white",
    text: "text-black",
    rotate: 12,
  },
];

// ─── CONTROLS ────────────────────────────────────────────────
// Total scroll distance for the entire animation.
// The outer wrapper is set to this height.
// Increase = slower / more scroll room. Decrease = faster.
const TOTAL_SCROLL_HEIGHT = 1450;
// ─────────────────────────────────────────────────────────────

export default function Legacy() {
  const [activeIndex, setActiveIndex] = useState(0);

  // outerRef  — the tall scroll container. Stays 100% in flow.
  //             Its height = TOTAL_SCROLL_HEIGHT.
  //             The sticky stage lives inside it.
  const outerRef = useRef(null);

  const progress = ((activeIndex + 1) / cards.length) * 100;

  useGSAP(
    () => {
      if (window.innerWidth < 1024) return;

      // ── CONTROLS ──────────────────────────
      const exitY          = -1400;
      const rotationFactor = -60;
      const overlapFactor  = 0.42;
      // ──────────────────────────────────────

      const cardsEl = gsap.utils.toArray(".stack-card");

      cardsEl.forEach((card, index) => {
        gsap.set(card, {
          rotate:     cards[index].rotate,
          zIndex:     cards.length - index,
          force3D:    true,
          willChange: "transform",
        });
      });

      const tl = gsap.timeline({ defaults: { ease: "none" } });

      cardsEl.forEach((card, index) => {
        tl.to(
          card,
          {
            y:        exitY,
            rotate:   cards[index].rotate + rotationFactor,
            duration: 1,
          },
          index * overlapFactor
        );
      });

      // ScrollTrigger drives the animation only.
      // NO pin here — CSS sticky handles the visual sticking.
      // This means GSAP never touches document flow — zero gap guaranteed.
      ScrollTrigger.create({
        animation:           tl,
        trigger:             outerRef.current,
        start:               "top top",
        end:                 `+=${TOTAL_SCROLL_HEIGHT}`,
        scrub:               1.2,
        invalidateOnRefresh: true,
      });

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: outerRef }
  );

  return (
    <div data-navbar-hide="true">

      {/* ── MOBILE ───────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 lg:hidden">
        <p className="text-center font-medium tracking-tight text-black-bg mb-8">
          Legacy In The Making
        </p>

        <Swiper
          loop
          breakpoints={{
            0:   { slidesPerView: 1,   spaceBetween: 16 },
            640: { slidesPerView: 1.6, spaceBetween: 16 },
          }}
          speed={800}
          autoHeight={false}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index} className="!h-auto">
              <div
                className={`${card.bg} ${card.text} rounded-2xl p-6 md:p-7 overflow-hidden min-h-full flex flex-col`}
              >
                <div className="overflow-hidden rounded-xl shrink-0">
                  <Image
                    src={card.image}
                    alt={card.title}
                    className="w-full aspect-7/5 object-cover"
                  />
                </div>

                <div className="flex flex-col items-center text-center flex-1 justify-between">
                  <div>
                    <h2 className="text-3xl font-medium tracking-tight my-3">
                      {card.title}
                    </h2>
                    <p
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: card.description }}
                    />
                  </div>
                  <div className="h-6 shrink-0" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="relative mt-4 h-[4px] w-full bg-white rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-black-bg rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* ── DESKTOP ──────────────────────────────────────────────

          HOW THIS WORKS — no GSAP pin involved at all:

          outerRef  = tall scroll container, height = TOTAL_SCROLL_HEIGHT.
                      100% in normal document flow at all times.
                      The next section sits directly below it — no gap possible.

          inner div = position: sticky, top: 0, height: 100vh.
                      Sticks to the top of the viewport while outerRef
                      scrolls past. Unsticks naturally when outerRef bottom
                      reaches the viewport bottom. Pure CSS — no JS needed.

          GSAP      = only drives the card animation via ScrollTrigger.
                      trigger = outerRef, no pin option at all.
                      Never touches document flow.

      ─────────────────────────────────────────────────────────── */}
      <div
        ref={outerRef}
        className="hidden lg:block relative"
        style={{ height: `${TOTAL_SCROLL_HEIGHT}px` }}
      >
        {/* Sticky stage — stays on screen while outer scrolls */}
        <div
          className="sticky top-0 w-full px-4 md:px-8 overflow-hidden"
          style={{ height: "100vh" }}
        >
          <p className="absolute top-6 left-1/2 -translate-x-1/2 text-center font-medium tracking-tight text-black-bg text-2xl">
            Legacy In The Making
          </p>

          <div className="w-full h-full flex items-center justify-center">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`stack-card absolute ${card.bg} ${card.text} rounded-[28px] p-6`}
                style={{ width: "580px", height: "580px" }}
              >
                <div className="flex flex-col items-center justify-center text-center h-full">
                  <div className="w-[200px] rounded-[16px] overflow-hidden mb-5">
                    <Image
                      src={card.image}
                      alt={card.title}
                      className="w-full aspect-square object-cover"
                    />
                  </div>

                  <h2 className="text-7xl font-medium tracking-tight mb-4">
                    {card.title}
                  </h2>

                  <p
                    className="max-w-[460px] text-base leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: card.description }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}