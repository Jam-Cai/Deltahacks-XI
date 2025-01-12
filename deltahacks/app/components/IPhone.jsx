import React from "react";

function IPhone({ title = "Hello World!", subtitle = "Welcome to my iPhone" }) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative mx-auto h-[800px] w-[400px] rounded-[60px] bg-gray-800 p-5 shadow-xl">
        {/* Frame notch */}
        <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-gray-800"></div>

        {/* Volume buttons */}
        <div className="absolute -left-1 top-16 h-12 w-1 rounded-l-lg bg-gray-800"></div>
        <div className="absolute -left-1 top-32 h-12 w-1 rounded-l-lg bg-gray-800"></div>

        {/* Power button */}
        <div className="absolute -right-1 top-16 h-12 w-1 rounded-r-lg bg-gray-800"></div>

        {/* Screen */}
        <div
          style={{
            backgroundImage: "url('phonebg.svg')",
            backgroundSize: "cover",
          }}
          className="h-full w-full rounded-[45px] bg-white flex flex-col gap-8 items-center justify-center"
        >
          <div className="w-4/5 py-4 px-8 rounded-2xl text-center text-md text-black space-y-2 ">
            <h1 className="font-black text-6xl">
              Fair<span className="text-[#FBAE3C]">Fi</span>
            </h1>
            <h2>Let's begin</h2>
          </div>

          <div className="bg-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl text-sm text-black space-y-2 hover:bg-[#FBAE3C] hover:duration-300">
            <h1 className="font-bold text-lg">Phone Number</h1>
            <input
              type="text"
              placeholder="XXX-XXX-XXXX"
              className="border-2 rounded-2xl p-2 w-full"
            />
          </div>

          <div className="bg-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl text-sm text-black space-y-2 hover:bg-[#FBAE3C] hover:duration-300">
            <h1 className="font-bold text-lg">Gender</h1>
            <input
              type="text"
              placeholder="XXX-XXX-XXXX"
              className="border-2 rounded-2xl p-2 w-full"
            />
          </div>

          <div className="bg-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl text-sm text-black hover:bg-[#FBAE3C] hover:duration-300 space-y-2">
            <h1 className="font-bold text-lg">Accent</h1>
            <input
              type="text"
              placeholder="XXX-XXX-XXXX"
              className="border-2 rounded-2xl p-2 w-full"
            />
          </div>
          <button className="bg-black text-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl hover:bg-[#FBAE3C] hover:duration-300 space-y-2">
            <h1 className="font-bold text-4xl">Call</h1>
          </button>
        </div>

        {/* Home button */}
        <div className="absolute bottom-4 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
}

export default IPhone;
