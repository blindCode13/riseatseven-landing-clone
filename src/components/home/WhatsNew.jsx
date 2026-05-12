"use client";

import { useRef, useState } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";

import {
  ArrowUpRight,
  Clock3,
} from "lucide-react";

import "swiper/css";

import w1 from "@/assets/images/common/4.webp";
import w2 from "@/assets/images/common/5.webp";
import w3 from "@/assets/images/common/6.webp";

import avatar1 from "@/assets/images/common/avatar1.webp";
import avatar2 from "@/assets/images/common/avatar2.webp";
import BoxImage from "@/assets/images/common/7.webp";

import SlideButton from "@/components/Buttons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const newsCards = [
  {
    id: 0,
    image: w1,
    author: "Ray Saddiq",
    avatar: avatar1,
    readTime: "3 mins",
    title:
      "Rise at Seven Appoints Hollie Lovell as Senior Operations Lead",
    href: "#",
  },

  {
    id: 1,
    image: w2,
    author: "Ray Saddiq",
    avatar: avatar1,
    readTime: "2 mins",
    title:
      "Rise at Seven Exits Sheffield and Triples Manchester as New HQ as they grow for global expansion",
    href: "#",
  },

  {
    id: 2,
    image: w3,
    author: "Carrie Rose",
    avatar: avatar2,
    readTime: "2 mins",
    title:
      "Ryan McNamara Is Now Rise at Seven’s Global Operations Director",
    href: "#",
  },
];

export default function WhatsNew() {
  const [activeIndex, setActiveIndex] =
    useState(0);

  const sectionRef = useRef(null);

  const cursorRef = useRef(null);

  const titleImageRef = useRef(null);

  const progress =
    ((activeIndex + 1) / newsCards.length) *
    100;

  useGSAP(
    () => {
      const cursor = cursorRef.current;

      // ==================================================
      // CUSTOM CURSOR
      // ==================================================

      gsap.set(cursor, {
        xPercent: -50,
        yPercent: -50,
      });

      const moveCursor = (e) => {
        gsap.to(cursor, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.45,
          ease: "power3.out",
        });
      };

      window.addEventListener(
        "mousemove",
        moveCursor
      );

      // ==================================================
      // TITLE IMAGE REVEAL
      // ==================================================

      gsap.set(titleImageRef.current, {
        width: 0,
      });

      gsap.to(titleImageRef.current, {
        width:
          window.innerWidth >= 1280
            ? 80
            : window.innerWidth >= 768
            ? 64
            : 56,

        duration: 1.2,

        ease: "power4.out",

        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // ==================================================
      // CARD HOVER EFFECT
      // ==================================================

      const cards = gsap.utils.toArray(
        ".news-card"
      );

      cards.forEach((card) => {
        const overlay =
          card.querySelector(".blur-overlay");

        // initial state
        gsap.set(overlay, {
          width: 0,
          height: 0,
        });

        card.addEventListener(
          "mouseenter",
          () => {
            // cursor in
            gsap.to(cursor, {
              opacity: 1,
              scale: 1,
              duration: 0.3,
              ease: "back.out(1.7)",
            });

            // circular grow
            gsap.to(overlay, {
              width: "250%",
              height: "250%",
              duration: 0.75,
              ease: "power4.out",
            });
          }
        );

        card.addEventListener(
          "mouseleave",
          () => {
            // cursor out
            gsap.to(cursor, {
              opacity: 0,
              scale: 0,
              duration: 0.25,
            });

            // shrink to center
            gsap.to(overlay, {
              width: 0,
              height: 0,
              duration: 0.65,
              ease: "power4.out",
            });
          }
        );
      });

      return () => {
        window.removeEventListener(
          "mousemove",
          moveCursor
        );
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden pb-12 xl:pb-24"
    >
      {/* CUSTOM CURSOR */}
      <div
        ref={cursorRef}
        className="
          fixed
          top-0
          left-0
          z-[999]
          pointer-events-none
          size-20
          xl:size-28
          rounded-full
          bg-light-green
          text-black
          flex
          items-center
          justify-center
          opacity-0
          scale-0
        "
      >
        <ArrowUpRight className="size-8 xl:size-12 pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-x-3 gap-y-6 overflow-hidden md:gap-x-5 md:gap-y-7">
        {/* HEADER */}
        <div className="col-span-12 px-4 md:px-7">
          <div className="grid grid-cols-12 gap-x-3 gap-y-3 md:border-b md:border-zinc-400/50 md:pb-5 md:gap-x-5 md:gap-y-7">
            {/* TITLE */}
            <div className="col-span-12 flex items-end md:col-span-9">
              <h2 className="flex flex-wrap items-center text-balance text-6xl font-medium tracking-tight text-zinc-900 md:text-7xl xl:text-8xl">
                <span>What&apos;s</span>

                {/* IMAGE REVEAL */}
                <span
                  ref={titleImageRef}
                  className="
                    mx-2
                    inline-flex
                    overflow-hidden
                    rounded-xl
                    border
                    border-zinc-400/50
                    bg-black/5
                    h-14
                    md:h-16
                    xl:h-20
                  "
                >
                  <Image
                    src={BoxImage}
                    alt="BoxImage"
                    className="h-full w-full object-cover"
                  />
                </span>

                <span>New</span>
              </h2>
            </div>

            {/* DESKTOP BUTTON */}
            <div className="hidden md:col-span-3 md:flex md:items-center md:justify-end">
              <SlideButton className="h-fit whitespace-nowrap">
                Explore More Thoughts
              </SlideButton>
            </div>
          </div>
        </div>

        {/* SWIPER */}
        <div className="col-span-12 min-w-0 overflow-hidden">
          <div className="overflow-hidden px-4 md:px-7">
            <Swiper
              loop
              speed={700}
              watchOverflow
              slidesPerView={1.2}
              spaceBetween={15}
              onSlideChange={(swiper) =>
                setActiveIndex(swiper.realIndex)
              }
              breakpoints={{
                0: {
                  slidesPerView: 1.2,
                  spaceBetween: 15,
                },

                768: {
                  slidesPerView: 2.2,
                  spaceBetween: 15,
                },

                1024: {
                  enabled: false,
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="w-full !overflow-visible"
            >
              {newsCards.map((card) => (
                <SwiperSlide
                  key={card.id}
                  className="py-2"
                >
                  <Link
                    href={card.href}
                    className="
                      news-card
                      group
                      flex
                      flex-col
                      gap-5
                      transition
                      duration-500
                      hover:-translate-y-2
                    "
                  >
                    {/* IMAGE */}
                    <div
                      className="
                        relative
                        aspect-square
                        overflow-hidden
                        rounded-2xl
                        lg:rounded-3xl
                      "
                    >
                      {/* IMAGE */}
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                      />

                      {/* OVERLAY */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div
                          className="
                            blur-overlay
                            absolute
                            left-1/2
                            bottom-0
                            -translate-x-1/2
                            translate-y-1/2
                            rounded-full
                            pointer-events-none
                            backdrop-blur-xl
                            bg-black/10
                          "
                        />
                      </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col gap-3">
                      {/* META */}
                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        {/* AUTHOR */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium tracking-tight text-zinc-700 xl:min-h-8 xl:py-1.5 xl:text-base">
                          <div className="relative h-5 w-5 overflow-hidden rounded-full">
                            <Image
                              src={card.avatar}
                              alt={card.author}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <span>
                            {card.author}
                          </span>
                        </div>

                        {/* TIME */}
                        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium tracking-tight text-zinc-700 xl:min-h-8 xl:py-1.5 xl:text-base">
                          <Clock3 className="size-4" />

                          <span>
                            {card.readTime}
                          </span>
                        </div>
                      </div>

                      {/* TITLE */}
                      <h3 className="text-balance text-2xl font-medium leading-none tracking-tight text-zinc-900 transition duration-300 xl:text-3xl 4xl:text-4xl">
                        {card.title}
                      </h3>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* MOBILE PROGRESS */}
            <div className="relative mt-5 block lg:hidden">
              <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-zinc-200">
                <div
                  className="absolute left-0 top-0 h-full rounded-full bg-zinc-900 transition-all duration-500 ease-out"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <div className="col-span-12 px-4 md:hidden">
          <SlideButton className="w-full">
            Explore More Thoughts
          </SlideButton>
        </div>
      </div>
    </section>
  );
}