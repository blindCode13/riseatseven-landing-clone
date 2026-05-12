"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaInstagram,
} from "react-icons/fa6";
import Logo from "@/components/Logo";

const socialLinks = [
  {
    href: "https://www.facebook.com/riseatseven",
    icon: FaFacebookF,
    label: "Facebook",
  },
  {
    href: "https://x.com/riseatseven",
    icon: FaXTwitter,
    label: "X / Twitter",
  },
  {
    href: "https://www.linkedin.com/company/riseatseven/",
    icon: FaLinkedinIn,
    label: "LinkedIn",
  },
  {
    href: "https://www.youtube.com/channel/UCAjOP9BgpZPTgae-QT9HGCw",
    icon: FaYoutube,
    label: "YouTube",
  },
  {
    href: "https://www.tiktok.com/@riseatseven",
    icon: FaTiktok,
    label: "TikTok",
  },
  {
    href: "https://www.instagram.com/riseatseven/",
    icon: FaInstagram,
    label: "Instagram",
  },
];

const footerColumns = [
  [
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
    { label: "Culture", href: "/culture" },
    { label: "Meet The Risers", href: "/meet-the-team" },
  ],
  [
    { label: "Testimonials", href: "/testimonials" },
    { label: "Blog & Resources", href: "/blog" },
    { label: "Webinars", href: "/webinars" },
    { label: "Careers", href: "/careers" },
  ],
  [
    { label: "Sheffield", href: "https://g.co/kgs/4Br7JaS" },
    { label: "Manchester", href: "https://g.co/kgs/9vh5imK" },
    { label: "London", href: "https://g.co/kgs/hsv6LhR" },
    { label: "New York", href: "https://g.co/kgs/NxzhAKU" },
    { label: "Contact", href: "/contact" },
  ],
];

const footerMeta = [
  "© 2025 Rise at Seven Ltd. All rights reserved",
  "Company Number 11955187",
  "VAT Registered GB 322402945",
];

export default function Footer() {
  return (
    <footer id="footer" className="w-full p-2">
      <div className="relative overflow-hidden rounded-[26px] bg-zinc-900">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 px-4 py-12 md:px-6">
          {/* LEFT SIDE */}
          <div className="col-span-12 flex flex-col gap-6 lg:col-span-4">
            <h2 className="max-w-md text-2xl font-medium tracking-tight text-white md:text-3xl">
              Stay updated with Rise news
            </h2>

            {/* Newsletter */}
            <form className="relative w-full">
              <input
                type="email"
                required
                placeholder="Your Email Address"
                className="h-14 md:h-16 w-full rounded-full border border-transparent bg-zinc-800 px-6 pr-20 text-white text-lg md:text-2xl outline-none transition placeholder:text-white/40 focus:border-white/20"
              />

              <button
                type="submit"
                className="absolute right-2 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-light-green text-black transition duration-300 hover:rotate-90 hover:bg-white"
              >
                <ArrowUpRight className="size-6 cursor-pointer" />
              </button>
            </form>

            {/* SOCIALS */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="group inline-flex items-center gap-2 rounded-xl bg-white px-2 py-1 text-black transition-all duration-300 hover:rounded-md"
                  >
                    <Icon className="size-4" />

                    <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* NAVIGATION */}
          <div className="col-span-12 flex flex-wrap justify-between gap-y-10 lg:col-span-7 lg:col-start-6">
            {footerColumns.map((column, idx) => (
              <div
                key={idx}
                className="flex w-1/2 flex-col gap-1 border-l border-white/20 pl-4 md:w-auto"
              >
                {column.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="group relative inline-flex overflow-hidden text-lg font-medium tracking-tight text-white transition hover:text-light-green lg:text-2xl"
                  >
                    <span className="transition-transform duration-300 group-hover:-translate-y-full">
                      {link.label}
                    </span>

                    <span className="absolute left-0 top-0 translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            ))}
          </div>

          {/* LOGO */}
          <div className="col-span-12 mt-6 lg:mt-16">
            <Logo className="h-auto w-full text-white" />
          </div>

          {/* BOTTOM */}
<div className="col-span-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
  <div className="flex flex-wrap items-center gap-3 text-xs text-white">
    {footerMeta.map((item, idx) => (
      <div key={item} className="flex items-center gap-3">
        <span>{item}</span>

        {idx !== footerMeta.length - 1 && (
          <span className="size-1 rounded-full bg-white" />
        )}
      </div>
    ))}

    <span className="size-1 rounded-full bg-white" />

    <AnimatedLink
      href="/privacy-policy"
      className="pb-0.5"
    >
      Privacy Policy
    </AnimatedLink>

    <span className="size-1 rounded-full bg-white" />

    <AnimatedLink
      href="/terms-conditions"
      className="pb-0.5"
    >
      Terms & Conditions
    </AnimatedLink>
  </div>

  <AnimatedLink
    href="#"
    className="w-fit pb-0.5 text-xs text-white md:text-sm"
  >
    Website MadeByShape
  </AnimatedLink>
</div>
        </div>
      </div>
    </footer>
  );
}

const AnimatedLink = ({ href, children, className = "" }) => {
  return (
    <Link
      href={href}
      className={`group relative inline-block overflow-hidden ${className}`}
    >
      <span>{children}</span>

      <span
        className="
          absolute
          bottom-0
          left-0
          h-px
          w-full
          bg-white
          origin-left
          scale-x-0
          transition-transform
          duration-500
          ease-out
          group-hover:scale-x-100
          group-hover:origin-left
          group-[&:not(:hover)]:origin-right
        "
      />
    </Link>
  );
};