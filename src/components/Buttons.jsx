import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SlideButton({ 
  href = "#", 
  children, 
  className = "" 
}) {
  const hasBg = className.includes("bg-");
  const defaultStyles = !hasBg ? "bg-white text-gray-900" : "";

  return (
    <Link
      href={href}
      className={`
        group relative inline-flex items-center justify-center overflow-hidden 
        rounded-3xl px-6 py-3 text-base font-medium capitalize 
        transition-all duration-300 hover:rounded-xl 
        focus:outline-none focus:ring-2 focus:ring-gray-900/10 
        ${defaultStyles} ${className}
      `}
    >

      <span className="relative flex flex-col overflow-hidden h-[1.2em]">
        <span className="flex items-center gap-x-2 h-full transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
          <span>{children}</span>
          <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>

        <span className="absolute top-0 left-0 flex items-center gap-x-2 h-full translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
          <span>{children}</span>
          <ArrowUpRight className="size-4" />
        </span>

      </span>
    </Link>
  );
}