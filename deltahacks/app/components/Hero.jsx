"use client";
import IPhone from "./IPhone";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background";
import TW from "./TW";
import AnimatedTooltipPreview from "./AnimatedTooltipPreview";
import Nav from "./Nav";
export function Hero() {
  return (
    <>
      <Nav />
      <section
        style={{
          backgroundImage: "url('bg.svg')",
          backgroundSize: "cover",
        }}
        className="min-h-screen bg-white flex flex-row gap-24 justify-center items-center px-8"
      >
        <div className="flex flex-col text-9xl font-black text-black space-y-12 w-2/5">
          <div>
            <h1 className="text-[200px] ">
              Fair<span className="text-[#FBAE3C]">Fi</span>
            </h1>
          </div>
          <TW />
          <div className="grid grid-cols-2 gap-8 w-full">
            <div className="bg-white shadow-2xl h-48 w-full p-8 rounded-2xl hover:scale-105 hover:ease-in-out hover:duration-300">
              <h1 className="text-2xl mb-4">What is FairFi?</h1>
              <p className="text-lg font-normal">
                It's a tool that allows employers in the financial sector
                analyze their employees' biases.
              </p>
            </div>
            <div className="bg-white shadow-2xl h-48 w-full p-8 rounded-2xl hover:scale-105 hover:ease-in-out hover:duration-300">
              <h1 className="text-2xl mb-4">What is FairFi?</h1>
              <p className="text-lg font-normal">
                asjdioaj diosjadoi jsaoid oasjdoi oij asjdioaj diosjadoi jsaoid
                oasjdoi oijasjdioaj diosjadoi
              </p>
            </div>
            <div className="bg-white shadow-2xl h-48 w-full p-8 rounded-2xl hover:scale-105 hover:ease-in-out hover:duration-300">
              <h1 className="text-2xl mb-4">What is FairFi?</h1>
              <p className="text-lg font-normal">
                asjdioaj diosjadoi jsaoid oasjdoi oij asjdioaj diosjadoi jsaoid
                oasjdoi oijasjdioaj diosjadoi
              </p>
            </div>
            <div className="bg-white shadow-2xl h-48 w-full p-8 rounded-2xl hover:scale-105 hover:ease-in-out hover:duration-300">
              <h1 className="text-xl mb-4">Developed & Designed by</h1>
              <AnimatedTooltipPreview />
            </div>
          </div>
        </div>
        <IPhone />
      </section>
    </>
  );
}

export default Hero;
