"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Roboto } from "next/font/google";
import Hero from "./components/Hero.jsx";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Page = () => {

  const containerRef = useRef(null);
  const [isSecondPage, setIsSecondPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callCompleted, setCallCompleted] = useState(false);

  // Stuff for scrolling between the two pages
  const handleScroll = (event) => {
    const container = containerRef.current;
    const { scrollTop, clientHeight } = container;

    const isScrollingDown = scrollTop + event.deltaY > 0;
    const nextPage = isScrollingDown ? 1 : 0;

    container.scrollTo({
      top: nextPage * clientHeight,
      behavior: "smooth",
    });

    setIsSecondPage(nextPage === 1);
    event.preventDefault();
  };

  // Scrolling timeout
  const handleCall = () => {
    setLoading(true);
    setCallCompleted(false);

    setTimeout(() => {
      setLoading(false);
      setCallCompleted(true);
      setTimeout(() => {
        setCallCompleted(false); 
      }, 3000);
    }, 3000);
  };

  return (
    <>
      <Hero />
      {/* <div
        ref={containerRef}
        className={`h-screen overflow-hidden scroll-snap-y-mandatory scroll-smooth ${roboto.className}`}
        onWheel={handleScroll}
      >
        <div
          className="h-full w-full transition-transform duration-[1500ms] ease-in-out"
          style={{
            transform: `translateY(${isSecondPage ? "-100vh" : "0"})`,
          }}
        >
          <section
            style={{
              backgroundImage: "url('/iStock-1311598658.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="h-screen relative"
          >
            <div className="absolute top-0 left-0 h-full w-1/4 flex flex-col justify-center items-center text-white ml-10">
              <h1 className="text-8xl text-center mb-4">B-Audit</h1>
              <div className="text-center text-2xl">
                Empowering your company by identifying racial bias
              </div>
            </div>
            <div className="absolute bottom-8 w-full flex justify-center">
              <div className="animate-bounce text-white text-6xl">↓</div>
            </div>
          </section>
  
          <section className="h-screen flex">
            <div className="text-white text-center w-1/2 flex flex-col">
              <div className="bg-cyan-950 flex-1 flex items-center justify-center">
                <h2 className="text-xl px-6">
                  1 in 5 people from minority ethnic groups experience discrimination due to race when dealing with financial providers. Black and Hispanic race groups are the most strongly affected. 
                  Here at B-Audit we aim to identify the discrimination present in finance institutions so that they may realize just how big this issue is.
                </h2>
              </div>
            </div>
  
            <div className="bg-cyan-100 text-black flex flex-col justify-center items-center w-1/2">
              {loading ? (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                  <p className="mt-4 text-4xl text-black">Call in progress...</p>
                </div>
              ) : callCompleted ? (
                <p className="mt-4 text-4xl text-black">Call Completed!</p>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="(123) 456-7891"
                    className="rounded-lg mb-4 border border-gray-300 p-2 w-2/3 text-center"
                  />
                  <select
                    className="rounded-lg mb-4 border border-gray-300 p-2 w-2/3 text-center"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Accent
                    </option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </select>
                  <select
                    className="text-center rounded-lg mb-4 border border-gray-300 p-2 w-2/3"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
  
                  <div className="flex flex-col gap-4 w-2/3">
                    <button
                      className="px-6 py-3 rounded-lg bg-cyan-950 text-white w-full hover:bg-cyan-600 transition-colors duration-300"
                      onClick={handleCall}
                    >
                      Call
                    </button>
                    <Link href="/results">
                      <button className="px-6 py-3 rounded-lg bg-cyan-950 text-white w-full hover:bg-cyan-600 transition-colors duration-300">
                        See Results
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </section>
        </div>
      </div> */}
    </>
  );
};

export default Page;
