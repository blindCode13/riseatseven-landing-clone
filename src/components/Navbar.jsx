"use client";

import Image1 from "@/assets/images/navbar/1.webp";
import Image2 from "@/assets/images/navbar/2.webp";
import Image3 from "@/assets/images/navbar/3.webp";
import Image4 from "@/assets/images/navbar/4.webp";
import Image5 from "@/assets/images/navbar/5.webp";
import Image6 from "@/assets/images/navbar/6.webp";
import Image7 from "@/assets/images/navbar/7.webp";
import Image8 from "@/assets/images/navbar/8.webp";
import Image9 from "@/assets/images/navbar/9.webp";
import Image10 from "@/assets/images/navbar/10.webp";
import Image11 from "@/assets/images/navbar/11.webp";
import Image12 from "@/assets/images/navbar/12.webp";
import Image13 from "@/assets/images/navbar/13.webp";
import Image14 from "@/assets/images/navbar/14.webp";
import Image15 from "@/assets/images/navbar/15.webp";
import Image16 from "@/assets/images/navbar/16.webp";
import Image17 from "@/assets/images/navbar/17.webp";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "@/components/Logo";
import { ChevronDown, Plus } from "lucide-react";
import SlideButton from "@/components/Buttons";
import Image from "next/image";

gsap.registerPlugin(useGSAP);

const navigation = [
  {
    title: "Services",
    submenu: [
      { name: "Search & Growth Strategy", imageSRC: Image1 },
      { name: "Onsite SEO", imageSRC: Image2 },
      { name: "Content Experience", imageSRC: Image3 },
      { name: "B2B Marketing", imageSRC: Image4 },
      { name: "Digital PR", imageSRC: Image5 },
      { name: "Social Media & Campaigns", imageSRC: Image6 },
      { name: "Data & Insights", imageSRC: Image7 },
      { name: "Social SEO/Search", imageSRC: Image8 },
    ],
  },
  {
    title: "Industries",
    submenu: [{ name: "B2B Marketing", imageSRC: Image4 }],
  },
  {
    title: "International",
    submenu: [
      { name: "US Digital PR", imageSRC: Image9 },
      { name: "Spain Digital PR", imageSRC: Image10 },
      { name: "Germany Digital PR", imageSRC: Image11 },
      { name: "Netherlands Digital PR", imageSRC: Image12 },
    ],
  },
  {
    title: "About",
    submenu: [
      { name: "About Us", imageSRC: Image13 },
      { name: "Meet The Risers", imageSRC: Image1 },
      { name: "Culture", imageSRC: Image14 },
      { name: "Testimonials", imageSRC: Image9 },
    ],
  },
  {
    title: "Work",
    submenu: [],
  },
  {
    title: "Careers",
    submenu: [],
  },
  {
    title: "Blog & Resources",
    submenu: [
      { name: "Blog", imageSRC: Image15 },
      { name: "Category Leaderboard", imageSRC: Image16 },
      { name: "Multi-Channel Search Report", imageSRC: Image17 },
    ],
  },
  {
    title: "Webinar",
    submenu: [],
  },
];

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openMenu, setOpenMenu] = useState("");
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  const [isPinned, setIsPinned] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // useRef instead of useState so the scroll handler always
  // reads the live value (no stale closure issue)
  const hideBlockedRef = useRef(false);

  const navbarRef = useRef(null);
  const lastScrollY = useRef(0);

  const navWrapperRef = useRef(null);
  const hoverBgRef = useRef(null);
  const dropdownRef = useRef(null);
  const overlayRef = useRef(null);
  const hideTimeout = useRef(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenu]);

  // ─── Intersection Observer ────────────────────────────────────────────────
  // Watches every <section data-navbar-hide="true|false"> in the document.
  // • data-navbar-hide="true"  → hide the navbar while that section is visible
  // • data-navbar-hide="false" → always show the navbar while that section is visible
  useEffect(() => {
    const sections = document.querySelectorAll("[data-navbar-hide]");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const shouldHide =
            entry.target.dataset.navbarHide === "true";

          if (entry.isIntersecting) {
            if (shouldHide) {
              // This section demands the navbar be hidden
              hideBlockedRef.current = true;
              setIsVisible(false);
            } else {
              // This section demands the navbar be visible
              hideBlockedRef.current = false;
              setIsVisible(true);
            }
          } else {
            // Section left the viewport — release the lock so
            // normal scroll-based show/hide takes over again
            if (shouldHide) {
              hideBlockedRef.current = false;
            }
          }
        });
      },
      {
        // Fire when 15 % of the section enters / leaves
        threshold: 0,
        // Shrink the bottom edge of the root by 10 % so the
        // trigger feels like "the section has properly arrived"
        rootMargin: "0px 0px -100% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // ─── Scroll handler ───────────────────────────────────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      // PIN the navbar after scrolling past 12 px
      if (currentScroll > 12) {
        setIsPinned(true);
      } else {
        setIsPinned(false);
        setIsVisible(true);
      }

      // SHOW / HIDE on scroll direction
      // hideBlockedRef.current is always the live value — no stale closure
      if (currentScroll > lastScrollY.current && currentScroll > 80) {
        if (!hideBlockedRef.current) {
          setIsVisible(false);
        }
      } else {
        // Only restore visibility if a hide-section isn't blocking it
        if (!hideBlockedRef.current) {
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // no dependency on hideBlocked — ref is always fresh

  const toggleMenu = (title) => {
    setOpenMenu(openMenu === title ? "" : title);
  };

  const clearHideTimeout = () => {
    if (hideTimeout.current) {
      clearTimeout(hideTimeout.current);
    }
  };

  const hideDropdown = () => {
    hideTimeout.current = setTimeout(() => {
      gsap.to(dropdownRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power2.out",
        overwrite: true,
        onComplete: () => {
          setActiveDropdown(null);
        },
      });

      gsap.to(hoverBgRef.current, {
        opacity: 0,
        duration: 0.2,
        overwrite: true,
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
        overwrite: true,
      });
    }, 220);
  };

  useGSAP(
    () => {
      if (!activeDropdown) return;

      clearHideTimeout();

      const activeEl = document.querySelector(
        `[data-nav="${activeDropdown.title}"]`
      );

      if (!activeEl || !navWrapperRef.current) return;

      const rect = activeEl.getBoundingClientRect();
      const parentRect = navWrapperRef.current.getBoundingClientRect();

      // Pill hover background
      gsap.to(hoverBgRef.current, {
        x: rect.left - parentRect.left,
        y: rect.top - parentRect.top,
        width: rect.width,
        height: rect.height,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });

      // Page overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
        overwrite: true,
      });

      // Dropdown panel — expand to fit its content
      gsap.killTweensOf(dropdownRef.current);

      const content = dropdownRef.current.firstElementChild;
      if (!content) return;

      gsap.to(dropdownRef.current, {
        width: content.offsetWidth,
        height: content.offsetHeight,
        duration: 0.38,
        ease: "power3.out",
        overwrite: true,
      });

      gsap.set(dropdownRef.current, { opacity: 1 });
    },
    { dependencies: [activeDropdown] }
  );

  return (
    <>
      {/* Full-page blur overlay shown when a dropdown is open */}
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-40 bg-black/10 opacity-0 backdrop-blur-md"
      />

      <section
        ref={navbarRef}
        className={`${
          isPinned
            ? "fixed top-0 bg-white/70 backdrop-blur-md xl:backdrop-blur-none xl:bg-transparent"
            : "absolute top-0"
        } z-50 w-full px-3 transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-[120%]"
        } ${isPinned ? "pt-3" : "pt-12 text-white"}`}
      >
        <nav
          className={`relative flex h-18 items-center justify-between xl:rounded-full px-5 transition-all duration-300 md:h-16 ${
            isPinned
              ? "xl:bg-white/70 xl:backdrop-blur-md"
              : "bg-transparent backdrop-blur-0"
          }`}
        >
          <Logo size={160} />

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileMenu(true)}
            className="relative flex h-6 w-6 items-center justify-center xl:hidden"
          >
            <span
              className={`absolute h-0.5 w-6 origin-center transition-all duration-300 ${
                isPinned ? "bg-black" : "bg-white"
              } ${
                mobileMenu
                  ? "translate-y-0 rotate-45"
                  : "-translate-y-1 rotate-0"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 origin-center transition-all duration-300 ${
                isPinned ? "bg-black" : "bg-white"
              } ${
                mobileMenu
                  ? "translate-y-0 -rotate-45"
                  : "translate-y-1 rotate-0"
              }`}
            />
          </button>

          {/* ── DESKTOP NAV ── */}
          <div
            ref={navWrapperRef}
            className="relative hidden xl:flex items-center"
            onMouseEnter={clearHideTimeout}
            onMouseLeave={hideDropdown}
          >
            {/* Pill that slides under the hovered nav item */}
            <div
              ref={hoverBgRef}
              className="pointer-events-none absolute rounded-full bg-white opacity-0"
            />

            <ul className="relative z-10 flex items-center justify-center font-medium leading-tight">
              {navigation.map((item) => {
                const hasDropdown = item.submenu.length > 0;

                return (
                  <li
                    key={item.title}
                    data-nav={item.title}
                    onMouseEnter={() => {
                      if (!hasDropdown) return;

                      clearHideTimeout();
                      setActiveDropdown(item);

                      const randomImage =
                        item.submenu[
                          Math.floor(Math.random() * item.submenu.length)
                        ]?.imageSRC;

                      setActiveImage(randomImage);
                    }}
                    className={`relative rounded-full px-4 py-1 ${
                      hasDropdown ? "cursor-pointer" : ""
                    }`}
                  >
                    <span
                      className={`relative z-10 flex items-center gap-1 transition-colors duration-300 ${
                        !isPinned && activeDropdown?.title === item.title
                          ? "text-black"
                          : ""
                      }`}
                    >
                      {item.title}
                      {hasDropdown && <Plus size={12} />}
                    </span>
                    {
                      item.title == "Work" &&
                      <span className="absolute bg-light-green px-1.5 py-0.5 -top-2 -right-1 text-[0.5rem] text-black rounded-full">25</span>
                    }
                  </li>
                );
              })}
            </ul>

            <DesktopDropdown
              activeDropdown={activeDropdown}
              activeImage={activeImage}
              setActiveImage={setActiveImage}
              dropdownRef={dropdownRef}
              hideDropdown={hideDropdown}
              clearHideTimeout={clearHideTimeout}
            />
          </div>

          <div className="hidden xl:flex">
            <SlideButton
              className={`${
                isPinned ? "bg-black text-white" : "bg-white text-black"
              } py-3.5 -mr-2`}
            >
              Get in Touch
            </SlideButton>
          </div>
        </nav>
      </section>

      {/* ── MOBILE MENU ── */}
      <div
        className={`fixed inset-0 z-[60] flex transition-all duration-500 xl:hidden ${
          mobileMenu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-md" />

        <div className="relative h-full w-full p-3">
          <div className="flex h-full w-full flex-col rounded-[1.5rem] bg-black/65 px-5 pb-4 pt-6 text-white">
            <div className="flex h-18 items-start justify-between">
              <Logo size={160} />

              <button
                onClick={() => setMobileMenu(false)}
                className="relative flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`absolute h-0.5 w-6 bg-white origin-center transition-all duration-300 ${
                    mobileMenu
                      ? "translate-y-0 rotate-45"
                      : "-translate-y-1 rotate-0"
                  }`}
                />
                <span
                  className={`absolute h-0.5 w-6 bg-white origin-center transition-all duration-300 ${
                    mobileMenu
                      ? "translate-y-0 -rotate-45"
                      : "translate-y-1 rotate-0"
                  }`}
                />
              </button>
            </div>

            <div className="mt-3 flex-1 overflow-y-auto">
              <div className="flex flex-col gap-1">
                {navigation.map((item) => {
                  const isOpen = openMenu === item.title;

                  return (
                    <div key={item.title}>
                      <button
                        onClick={() => toggleMenu(item.title)}
                        className="flex w-full items-start justify-between gap-3 py-0.5 text-left"
                      >
                        <span className="text-[2.5rem] font-medium leading-[0.9] tracking-tight">
                          {item.title}
                        </span>

                        {item.submenu.length > 0 && (
                          <div className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white">
                            <ChevronDown
                              size={14}
                              className={`transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        )}
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          isOpen ? "max-h-96 pt-2 pb-3" : "max-h-0"
                        }`}
                      >
                        <div className="flex flex-col gap-0.5">
                          {item.submenu.map((sub) => (
                            <a
                              key={sub.name}
                              href="#"
                              className="text-2xl font-bold leading-tight text-white"
                            >
                              {sub.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <SlideButton className="py-4">Get in Touch</SlideButton>
          </div>
        </div>
      </div>
    </>
  );
}

function DesktopDropdown({
  activeDropdown,
  activeImage,
  setActiveImage,
  dropdownRef,
  hideDropdown,
  clearHideTimeout,
}) {
  if (!activeDropdown) return null;

  const isServices = activeDropdown.title === "Services";
  const singleItem = activeDropdown.submenu.length === 1;

  return (
    <div
      className="absolute left-1/2 top-[calc(100%+22px)] z-50 mt-2 -translate-x-1/2"
      onMouseEnter={clearHideTimeout}
      onMouseLeave={hideDropdown}
    >
      <div
        ref={dropdownRef}
        className="overflow-hidden rounded-3xl bg-[#f5f5f5] shadow-[0_20px_80px_rgba(0,0,0,0.15)]"
        style={{ width: 0, height: 0 }}
      >
        <div className="w-fit p-2">
          <div className="flex items-center gap-6">
            <div
              className={`px-6 py-8 ${
                singleItem
                  ? "min-w-fit"
                  : isServices
                  ? "min-w-[620px]"
                  : "min-w-fit"
              }`}
            >
              <div>
                {isServices && (
                  <p className="mb-8 text-base font-medium text-black/60">
                    Core Services
                  </p>
                )}

                <div
                  className={
                    isServices
                      ? "grid grid-flow-col grid-rows-4 gap-x-20 gap-y-2"
                      : "flex flex-col justify-center gap-y-2"
                  }
                >
                  {activeDropdown.submenu.map((sub) => (
                    <div
                      key={sub.name}
                      className="w-fit transition-opacity"
                      onMouseEnter={() => setActiveImage(sub.imageSRC)}
                    >
                      <a
                        href="#"
                        className="group inline-flex w-fit overflow-hidden"
                      >
                        <span className="relative block overflow-hidden">
                          <span
                            className={`block pb-1 transition-transform duration-300 group-hover:-translate-y-[100%] ${
                              isServices
                                ? "text-xl leading-[1.2]"
                                : "text-3xl leading-[1.05]"
                            } whitespace-nowrap font-medium tracking-tight text-black`}
                          >
                            {sub.name}
                          </span>

                          <span
                            className={`absolute left-0 top-0 block translate-y-[110%] transition-transform duration-300 group-hover:translate-y-0 ${
                              isServices
                                ? "text-xl leading-[1.2]"
                                : "text-3xl leading-[1.05]"
                            } whitespace-nowrap font-medium tracking-tight text-black`}
                          >
                            {sub.name}
                          </span>
                        </span>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex shrink-0 items-center justify-center p-2">
              <div className="relative h-[295px] w-[300px] overflow-hidden rounded-[1.5rem]">
                {activeImage && (
                  <Image
                    src={activeImage}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-black/10" />

                {isServices && (
                  <div className="absolute bottom-2 left-2">
                    <SlideButton className="bg-black text-white">
                      View All Services
                    </SlideButton>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}