"use client";

import FallingText from "@/components/FallingText";
import Footer from "@/components/Footer";
import Banner from "@/components/home/Banner";
import Featured from "@/components/home/Featured";
import Intro from "@/components/home/Intro";
import Legacy from "@/components/home/Legacy";
import Services from "@/components/home/Services";
import WhatsNew from "@/components/home/WhatsNew";
import InfiniteMarquee from "@/components/InfiniteMarquee";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import useSmoothScroll from "@/hook/useSmoothScroll";

export default function Home() {
  useSmoothScroll();
  return (
    <>
      <div className="w-full p-2 transition-opacity">
        <a href="https://riseatseven.com/category-leaderboard/" className="group flex items-center justify-center w-full px-5 py-2 text-xs font-semibold leading-none text-center tracking-tight text-grey-800 bg-light-green rounded-2xl transition-all lg:text-sm hover:lg:rounded-md">
          <span className="lg:hidden">🚨 The Category Leaderboard - Live Now</span>
          <span className="relative hidden overflow-hidden lg:block">
            <span className="block transition-transform duration-300 group-hover:-translate-y-[120%]">🚨 The Category Leaderboard - Live Now</span>
            <span className="absolute top-0 left-0 block translate-y-[110%] transition-transform duration-300 group-hover:translate-y-0">🚨 The Category Leaderboard - Live Now</span>
          </span>
        </a>
      </div>

      <Loading />
      <Navbar />
      <Banner />
      <Intro />
      <Featured />
      <Services />
      <InfiniteMarquee />
      <Legacy />
      <WhatsNew />
      <FallingText />
      <Footer />
    </>
  );
}
