"use client";

import Image1 from "@/assets/images/featured/sixt.webp";
import Image2 from "@/assets/images/featured/dojo-b2b.webp";
import Image3 from "@/assets/images/featured/magnet-trade.webp";
import Image4 from "@/assets/images/featured/esim.webp";
import Image5 from "@/assets/images/featured/jd-sports.webp";
import Image6 from "@/assets/images/featured/parkdean-resorts1.webp";
import Image7 from "@/assets/images/featured/pooky.webp";
import Image8 from "@/assets/images/featured/parkdean-resorts2.webp";
import Image9 from "@/assets/images/featured/revolution-beauty.webp";
import Image10 from "@/assets/images/featured/lloyds-pharmacy.webp";
import Image11 from "@/assets/images/featured/preety-little-thing.webp";

import { useRef, useState } from "react";

import {
  ArrowUpRight,
  ChartLine,
  Search,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Image from "next/image";
import SlideButton from "@/components/Buttons";

gsap.registerPlugin(ScrollTrigger);

const data = [
  {
    title: "SIXT",
    type: "Car Rental",
    year: "2023-2025",
    description: "An extra 3m clicks regionally through SEO",
    imageSRC: Image1,
    backgroundColor: "cb7c3b",
  },

  {
    title: "Dojo - B2B",
    type: "Card Machines",
    year: "2021-2025",
    description: "A B2B success story for Dojo card machines",
    imageSRC: Image2,
    backgroundColor: "fdd8c4",
  },

  {
    title: "Magnet Trade - B2B",
    type: null,
    year: "2023-2024",
    description: "A full service SEO success story 170%+ increase",
    imageSRC: Image3,
    backgroundColor: "d8c4fd",
  },

  {
    title: "Leading E Sim brand globally",
    type: "Esims",
    year: "2023-2025",
    description: "Increasing brand and non brand visibility UK/ES",
    imageSRC: Image4,
    backgroundColor: "cb7c3b",
  },

  {
    title: "JD Sports",
    type: "Trainers",
    year: "2025",
    description: "65% up YoY in clicks for JDSports FR, IT, ES",
    imageSRC: Image5,
    backgroundColor: "3b8ccb",
  },

  {
    title: "Parkdean Resorts",
    type: "Easter Breaks",
    year: "2019-2025",
    description: "Dominating Google and Al search",
    imageSRC: Image6,
    backgroundColor: "d2b59d",
  },

  {
    title: "Pooky",
    type: "Rechargeable Lights",
    year: "2025",
    description: "Driving demand for Pooky Rechargeable Lights",
    imageSRC: Image7,
    backgroundColor: "3ab0bd",
  },

  {
    title: "Parkdean Resorts",
    type: "UK Holidays",
    year: "2019-2025",
    description: "Social search and multi channel content to #1",
    imageSRC: Image8,
    backgroundColor: "d29dd0",
  },

  {
    title: "Revolution Beauty",
    type: "Beauty Dupes",
    year: "2022-2025",
    description: "Building the UK's leading beauty dupe brand",
    imageSRC: Image9,
    backgroundColor: "fecacc",
  },

  {
    title: "Lloyds Pharmacy",
    type: "STI tests",
    year: "2022-2023",
    description: "Driving category leadership for STItests",
    imageSRC: Image10,
    backgroundColor: "61dcfb",
  },

  {
    title: "PrettyLittleThing",
    type: "Outfits",
    year: "2021-2023",
    description: `Driving discovery for everything "outfits" for PLT`,
    imageSRC: Image11,
    backgroundColor: "fecacc",
  },
];

export default function Featured() {
  const [activeIndex, setActiveIndex] = useState(null);

  const sectionRef = useRef(null);

  const textWrapperRef = useRef(null);
  const textRef = useRef(null);

  const cardsWrapperRef = useRef(null);
  const cardsRef = useRef(null);

  const cursorRef = useRef(null);

  const isTouchDevice = () => {
    return window.matchMedia("(pointer: coarse)")
      .matches;
  };

  const handleMouseMove = (e) => {
    if (!cursorRef.current) return;

    gsap.to(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.18,
      ease: "power2.out",
    });
  };

  const showCursor = (e) => {
    if (!cursorRef.current || isTouchDevice()) return;

    gsap.killTweensOf(cursorRef.current);

    // instantly place cursor correctly first
    gsap.set(cursorRef.current, {
      x: e.clientX,
      y: e.clientY,
    });

    // THEN animate appearance
    gsap.to(cursorRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const hideCursor = () => {
    if (!cursorRef.current || isTouchDevice()) return;

    gsap.killTweensOf(cursorRef.current);

    gsap.to(cursorRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "power3.inOut",
    });
  };

  useGSAP(() => {
    const section = sectionRef.current;

    const textWrapper = textWrapperRef.current;
    const text = textRef.current;

    const cardsWrapper = cardsWrapperRef.current;
    const cards = cardsRef.current;

    if (
      !section ||
      !textWrapper ||
      !text ||
      !cardsWrapper ||
      !cards
    )
      return;

    gsap.set(cursorRef.current, {
      xPercent: -50,
      yPercent: -50,
    });

    const extraOffset = 280;

    const getCardsDistance = () => {
      const extraCardScroll = 18;

      return (
        cards.scrollHeight -
        cardsWrapper.clientHeight +
        extraCardScroll
      );
    };

    const getTextDistance = () => {
      return (
        text.scrollHeight -
        textWrapper.clientHeight
      );
    };

    const getTotalScroll = () => {
      return getCardsDistance() + extraOffset;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getTotalScroll()}`,
        scrub: 1.2,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(
      cards,
      {
        y: () => -getCardsDistance(),
        ease: "none",
      },
      0
    );

    tl.to(
      text,
      {
        y: () => -(getTextDistance() + 300),
        ease: "none",
      },
      0
    );

    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );

      ScrollTrigger.getAll().forEach((trigger) =>
        trigger.kill()
      );
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="w-full p-4 md:p-8"
      data-navbar-hide="true"
    >
      <div className="w-full h-[calc(100vh-32px)] md:h-[calc(100vh-58px)] bg-black-bg rounded-3xl overflow-hidden px-4 lg:px-12 flex gap-8 text-white">

        {/* LEFT TEXT */}
        <div className="w-[120%] hidden lg:flex flex-col gap-24 py-24 relative overflow-hidden">
          <p className="text-xl font-semibold shrink-0">
            Featured Work
          </p>

          <div
            ref={textWrapperRef}
            className="flex-1 overflow-hidden relative"
          >
            <div
              ref={textRef}
              className="flex flex-col gap-2 2xl:gap-6 tracking-tight will-change-transform"
            >
              {data.map((item, i) => (
                <a
                  href="#"
                  key={i}
                  onMouseEnter={() =>
                    setActiveIndex(i)
                  }
                  onMouseLeave={() =>
                    setActiveIndex(null)
                  }
                  className={`flex transition-all duration-500 ${activeIndex === i
                    ? "ml-2 xl:ml-4"
                    : "ml-0"
                    } ${i == 0 && "mt-36"}`}
                >
                  <h1 className="text-5xl xl:text-6xl 2xl:text-[5.6rem] font-medium">
                    {item.title}
                  </h1>

                  <span className="text-xs tracking-normal ml-2 mt-3">
                    [{item.year}]
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="absolute top-52 w-full h-36 bg-linear-to-b from-black-bg via-black-bg/60 to-transparent pointer-events-none"></div>

          <div className="absolute bottom-24 w-full h-36 bg-linear-to-t from-black-bg via-black-bg/60 to-transparent pointer-events-none"></div>
        </div>

        {/* RIGHT CARDS */}
        <div
          ref={cardsWrapperRef}
          className="w-full overflow-hidden"
        >
          <div
            ref={cardsRef}
            className="w-full flex flex-col gap-4 will-change-transform"
          >
            <p className="lg:hidden text-base font-semibold mt-6 mb-2">
              Featured Work
            </p>

            {data.map((item, i) => (
              <a
                href="#"
                key={i}
                onMouseEnter={(e) => {
                  setActiveIndex(i);
                  showCursor(e);
                }}
                onMouseLeave={() => {
                  setActiveIndex(null);
                  hideCursor();
                }}
                className={`group w-full aspect-7/5 rounded-2xl overflow-hidden ${i == 0 && "lg:mt-12"
                  } relative shrink-0 cursor-none`}
              >
                {/* IMAGE */}
                <Image
                  src={item.imageSRC}
                  alt={item.title}
                  fill
                  className="w-full h-full object-cover"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    style={{
                      backgroundColor: `#${item.backgroundColor}`,
                    }}
                    className={`absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${activeIndex === i
                        ? "w-[250%] h-[250%]"
                        : "w-0 h-0"
                      }`}
                  />

                  {/* DESCRIPTION */}
                  <div
                    className={`absolute inset-0 z-20 transition-all ${activeIndex === i
                      ? "opacity-100 translate-y-0 duration-500"
                      : "opacity-0 translate-y-12 duration-100"
                      }`}
                  >
                    <p className="text-2xl md:text-3xl xl:text-5xl 2xl:text-6xl font-medium text-black m-4 lg:mx-6 lg:mt-8 max-w-3xl">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* MOBILE GRADIENT */}
                <div className="lg:hidden absolute w-full h-full bottom-0 bg-linear-to-t from-black-bg/60 to-transparent group-hover:hidden"></div>

                {/* TYPE BADGE */}
                {item.type && (
                  <div className="z-30 flex items-center justify-center gap-2 absolute top-4 group-hover:top-auto group-hover:bottom-4 lg:top-auto lg:bottom-4 right-4 font-medium text-sm tracking-tight px-4 py-2 bg-white/20 rounded-full backdrop-blur-xl transition-all duration-300">
                    <Search className="size-4" />

                    {item.type}

                    <ChartLine className="size-4" />
                  </div>
                )}

                {/* MOBILE TEXT */}
                <div className="absolute left-4 bottom-4 group-hover:hidden">
                  <p className="text-sm lg:hidden">
                    [{item.year}]
                  </p>

                  <p className="text-4xl max-w-md font-medium lg:hidden">
                    {item.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>

      {/* CUSTOM CURSOR */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[999] pointer-events-none size-20 xl:size-28 rounded-full bg-light-green text-black flex items-center justify-center opacity-0 scale-0"
      >
        <ArrowUpRight className="size-8 xl:size-12" />
      </div>

      <div className="w-full flex items-center justify-center mt-6">
        <SlideButton>Explore Our Work</SlideButton>
      </div>
    </section>
  );
}