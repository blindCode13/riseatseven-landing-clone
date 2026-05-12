"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import BG1 from "@/assets/images/banner-images/bg1.webp";
import BG2 from "@/assets/images/banner-images/bg2.webp";
import BG3 from "@/assets/images/banner-images/bg3.webp";
import BG4 from "@/assets/images/banner-images/bg4.webp";
import BG5 from "@/assets/images/banner-images/bg5.webp";
import BG6 from "@/assets/images/banner-images/bg6.webp";

import sideIcon from "@/assets/images/banner-images/sideIcon.svg";
import Icon1 from "@/assets/images/banner-images/icon1.webp";
import Icon2 from "@/assets/images/banner-images/icon2.webp";
import Icon3 from "@/assets/images/banner-images/icon3.webp";
import Icon4 from "@/assets/images/banner-images/icon4.webp";

import Brand1 from "@/assets/images/brands/google.webp";
import Brand2 from "@/assets/images/brands/chat-gpt.webp";
import Brand3 from "@/assets/images/brands/gemini.webp";
import Brand4 from "@/assets/images/brands/tiktok.webp";
import Brand5 from "@/assets/images/brands/youtube.webp";
import Brand6 from "@/assets/images/brands/pinterest.webp";
import Brand7 from "@/assets/images/brands/giphy.webp";
import Brand8 from "@/assets/images/brands/reddit.webp";
import Brand9 from "@/assets/images/brands/amazon.webp";

const backgrounds = [BG1, BG2, BG3, BG4, BG5, BG6];
const Brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6, Brand7, Brand8, Brand9];

export default function Banner() {
  const [randomBG, setRandomBG] = useState(BG1);
  const container = useRef(null);

  useEffect(() => {
    const picked = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setRandomBG(picked);
  }, []);

  const splitText = (text, className) => {
    return text.split("").map((char, index) => (
      <span key={index} className="inline-block py-[0.2em] -my-[0.2em]">
        <span className={`${className} inline-block`}>
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ));
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.4 } });

    tl.from(".char-cat", { y: 100, opacity: 0, stagger: 0.03 })
      .from(".char-we", { y: 100, opacity: 0, stagger: 0.03 }, 0)
      .from(".char-leaders", { y: 100, opacity: 0, stagger: 0.03 }, 0.2)
      .from(".char-create", { y: 100, opacity: 0, stagger: 0.03 }, 0.3);

    tl.to(".anim-box-container", {
      width: "auto",
      duration: 0.5,
      ease: "expo.inOut"
    }, "-=0.1");

    tl.from(".anim-box-image", {
      scale: 0,
      opacity: 0,
      duration: 0.4,
    }, "<+=0.1");

  }, { scope: container });

  return (
    <section ref={container} className="w-full h-[calc(100vh-52px)] px-2">
      <div className="w-full h-full rounded-3xl bg-black overflow-hidden relative">
        <Image className="absolute w-full h-full top-0 left-0 object-cover" src={randomBG} alt="Banner_BG" fill priority />

        <div className="w-full h-full bg-black/30 backdrop-blur-md z-20">
          <div className="absolute top-1/2 -translate-y-1/2 w-full text-white flex flex-col text-center">

            <div className="flex flex-col gap-3 mb-4">
              <p className="uppercase font-semibold text-xs">#1 Most recommended <br /> content marketing agency</p>
              <div className="flex items-center justify-center gap-4">
                <Image src={sideIcon} alt="Leaf" className="w-6" />
                <Image src={Icon1} alt="Global Search Awards" className="w-12" />
                <Image src={Icon2} alt="The Drum" className="w-8" />
                <Image src={Icon3} alt="UK Social Media Awards" className="w-14" />
                <Image src={Icon4} alt="UK Content Awards" className="w-14 hidden md:flex" />
                <Image src={sideIcon} alt="Leaf" className="w-6 -scale-x-100" />
              </div>
            </div>

            <h1 className="font-medium text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-14 md:leading-18 lg:leading-24 xl:leading-28 text-center max-[620px]:max-w-md mx-auto">
              {splitText("We", "char-we")}
              {" "}
              {splitText("Create", "char-create")}
              <br />
              <span className="flex flex-wrap items-center justify-center gap-x-2 xl:gap-x-4">
                <span className="flex items-center">
                  {splitText("Category", "char-cat")}

                  <div className="anim-box-container overflow-hidden w-0 inline-flex justify-center items-center">
                    <div className="pl-2 xl:pl-4">
                      <Image
                        src={randomBG}
                        alt="Banner_Box"
                        className="anim-box-image size-14 md:size-18 lg:size-24 xl:size-28 rounded-lg md:rounded-xl shrink-0 object-cover"
                      />
                    </div>
                  </div>
                </span>

                <span>
                  {splitText("Leaders", "char-leaders")}
                </span>
              </span>
            </h1>

            <p className="font-medium text-lg md:text-2xl xl:text-3xl mt-2 sm:mt-6 md:mt-8">on every searchable platform</p>

            <div className="hidden 2xl:flex items-center justify-center gap-14 mt-12">
              {Brands.map((item, i) => (
                <Image key={i} src={item} alt="Brand" className="w-16" />
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 w-full px-6 flex justify-center md:justify-between text-white font-medium">
            <div className="w-fit text-center hidden md:flex">
              <p className="text-sm font-sans-primary leading-normal text-pretty lg:text-base">
                Organic media planners creating, distributing & optimising<br />
                search-first content for SEO, Social, PR, Ai and LLM search
              </p>
            </div>
            <div className="w-fit text-center">
              <p className="text-sm font-sans-primary leading-normal text-pretty lg:text-base">
                4 Global Offices serving<br />
                UK, USA (New York) &amp; EU
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}