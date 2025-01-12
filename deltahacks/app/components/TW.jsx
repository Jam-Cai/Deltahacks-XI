import React from "react";
import Typewriter from "typewriter-effect";
const TW = () => {
  return (
    <div className="flex bg-white shadow-2xl w-full p-6 rounded-2xl">
      <h1 className="text-4xl font-bold flex flex-inline gap-3">
        Welcome to
        <span className="text-[#FFC107]">
          <Typewriter
            options={{
              strings: [
                "growing unbiased finance",
                "getting fair service",
                "eliminating systemic bias",
                "a step toward fairness",
              ],
              autoStart: true,
              loop: true,
              delay: 70,
            }}
          />
        </span>
      </h1>
    </div>
  );
};

export default TW;
