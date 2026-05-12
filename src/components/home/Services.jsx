"use client";

import { useRef } from "react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Image from "next/image";
import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import ourServicesImg from "@/assets/images/services/service.webp";
import serviceImg1 from "@/assets/images/services/1.webp";
import serviceImg2 from "@/assets/images/services/2.webp";
import serviceImg3 from "@/assets/images/services/3.webp";
import serviceImg4 from "@/assets/images/services/4.webp";
import serviceImg5 from "@/assets/images/services/5.webp";
import serviceImg6 from "@/assets/images/services/6.webp";

import SlideButton from "@/components/Buttons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);

  const titleImageRef = useRef(null);

  const services = [
    { title: "Digital PR", img: serviceImg1 },

    {
      title: "Organic Social & Content",
      img: serviceImg4,
    },

    {
      title: "Search & Growth Strategy",
      img: serviceImg2,
    },

    {
      title: "Content Experience",
      img: serviceImg5,
    },

    { title: "Data & Insights", img: serviceImg3 },

    { title: "Onsite SEO", img: serviceImg6 },
  ];

  useGSAP(
    () => {
      // ============================================
      // TITLE IMAGE REVEAL
      // ============================================

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
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-6 xl:py-12"
    >
      <div className="w-full px-4 md:px-7">
        <div className="grid grid-cols-12 gap-x-3 gap-y-3 overflow-hidden md:gap-x-5 md:gap-y-7 lg:pt-5">
          {/* HEADER */}
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-x-3 gap-y-3 md:border-b md:border-zinc-400/50 md:pb-5 md:gap-x-5 md:gap-y-7">
              {/* TITLE */}
              <div className="col-span-12 flex items-end md:col-span-9">
                <h2 className="flex flex-wrap items-center text-balance text-6xl font-medium tracking-tight text-zinc-900 md:text-7xl lg:text-7xl 2xl:text-8xl">
                  <span>Our</span>

                  {/* ANIMATED IMAGE */}
                  <span
                    ref={titleImageRef}
                    className="
                      mx-2
                      inline-flex
                      overflow-hidden
                      rounded-xl
                      bg-black/5
                      h-14
                      md:h-16
                      xl:h-20
                    "
                  >
                    <Image
                      src={ourServicesImg}
                      alt="Our Services"
                      className="h-full w-full object-cover"
                    />
                  </span>

                  <span>Services</span>
                </h2>
              </div>

              {/* DESKTOP BUTTON */}
              <div className="hidden md:col-span-3 md:flex md:items-center md:justify-end">
                <SlideButton className="whitespace-nowrap">
                  View All Services
                </SlideButton>
              </div>
            </div>
          </div>

          {/* SERVICES */}
          <div className="col-span-12 grid grid-cols-12 gap-x-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="col-span-12 -my-px md:col-span-6"
              >
                <Link
                  href="#"
                  className="group relative grid grid-cols-1 overflow-hidden"
                >
                  {/* LINE */}
                  <div className="absolute bottom-0 left-0 z-0 w-full md:px-12">
                    <div className="h-px w-full bg-zinc-400/50" />
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-20 col-start-1 row-start-1 flex items-center gap-3 py-4 text-black transition duration-500 lg:group-hover:text-white lg:py-6">
                    {/* MOBILE IMAGE */}
                    <div className="relative inline-flex h-12 w-12 overflow-hidden rounded-lg md:h-16 md:w-16 md:rounded-xl lg:hidden">
                      <Image
                        src={service.img}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* TITLE + ICON */}
                    <div className="lg:translate-x-10">
                      <div className="relative">
                        {/* HOVER ICON */}
                        <div className="absolute left-0 top-0 overflow-hidden pr-2">
                          <div className="-translate-x-full translate-y-full -rotate-45 transition duration-500 lg:group-hover:translate-x-0 lg:group-hover:translate-y-0 lg:group-hover:rotate-0">
                            <ArrowUpRight className="size-8 lg:size-10 xl:size-12" />
                          </div>
                        </div>

                        {/* TITLE */}
                        <div className="transition duration-500 lg:group-hover:translate-x-14">
                          <h3 className="text-3xl font-medium tracking-tight lg:text-4xl xl:text-5xl 3xl:text-6xl">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* HOVER BG IMAGE */}
                  <div className="absolute inset-0 z-10 overflow-hidden rounded-full bg-black opacity-0 transition duration-500 lg:group-hover:opacity-100">
                    <div className="h-full w-full opacity-60 transition duration-700 lg:group-hover:scale-105">
                      <Image
                        src={service.img}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <div className="col-span-12 md:hidden">
            <SlideButton className="w-full">
              View All Services
            </SlideButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;