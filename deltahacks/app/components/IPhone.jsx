// import React from "react";

// function IPhone({ title = "Hello World!", subtitle = "Welcome to my iPhone" }) {
//   return (
//     <div className="flex items-center justify-center p-4">
//       <div className="relative mx-auto h-[800px] w-[400px] rounded-[60px] bg-gray-800 p-5 shadow-xl">
//         {/* Frame notch */}
//         <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-gray-800"></div>

//         {/* Volume buttons */}
//         <div className="absolute -left-1 top-16 h-12 w-1 rounded-l-lg bg-gray-800"></div>
//         <div className="absolute -left-1 top-32 h-12 w-1 rounded-l-lg bg-gray-800"></div>

//         {/* Power button */}
//         <div className="absolute -right-1 top-16 h-12 w-1 rounded-r-lg bg-gray-800"></div>

//         {/* Screen */}
//         <div
//           style={{
//             backgroundImage: "url('phonebg.svg')",
//             backgroundSize: "cover",
//           }}
//           className="h-full w-full rounded-[45px] bg-white flex flex-col gap-8 items-center justify-center"
//         >
//           <div className="w-4/5 py-4 px-8 rounded-2xl text-center text-md text-black space-y-2 ">
//             <h1 className="font-black text-6xl">
//               Fair<span className="text-[#FBAE3C]">Fi</span>
//             </h1>
//             <h2>Let's begin</h2>
//           </div>

//           <div className="bg-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl text-sm text-black space-y-2 hover:bg-[#FBAE3C] hover:duration-300">
//             <h1 className="font-bold text-lg">Phone Number</h1>
//             <input
//               type="text"
//               placeholder="XXX-XXX-XXXX"
//               className="border-2 rounded-2xl p-2 w-full"
//             />
//           </div>

//           <div className="bg-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl text-sm text-black space-y-2 hover:bg-[#FBAE3C] hover:duration-300">
//             <h1 className="font-bold text-lg">Gender</h1>
//             <input
//               type="text"
//               placeholder="XXX-XXX-XXXX"
//               className="border-2 rounded-2xl p-2 w-full"
//             />
//           </div>

//           <div className="bg-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl text-sm text-black hover:bg-[#FBAE3C] hover:duration-300 space-y-2">
//             <h1 className="font-bold text-lg">Accent</h1>
//             <input
//               type="text"
//               placeholder="XXX-XXX-XXXX"
//               className="border-2 rounded-2xl p-2 w-full"
//             />
//           </div>
//           <button className="bg-black text-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl hover:bg-[#FBAE3C] hover:duration-300 space-y-2">
//             <h1 className="font-bold text-4xl">Call</h1>
//           </button>
//         </div>

//         {/* Home button */}
//         <div className="absolute bottom-4 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-gray-400"></div>
//       </div>
//     </div>
//   );
// }

// export default IPhone;

import React, { useState } from "react";
import { callService } from "../services/api";

function IPhone({ title = "Hello World!", subtitle = "Welcome to my iPhone" }) {
  const [formData, setFormData] = useState({
    gender: "male",
    accent: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [callResult, setCallResult] = useState(null);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {};

    if (!formData.gender.trim()) {
      newErrors.gender = "Please select a gender";
    }
    if (!formData.accent.trim()) {
      newErrors.accent = "Please specify an accent";
    }

    setErrors(newErrors);
    console.log(errors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setStatus("loading");
        // Initiate call
        const callresult = await callService.initiateCall(
          formData.gender,
          formData.accent
        );

        // Wait for a moment then fetch analysis
        setTimeout(async () => {
          console.log("adasda13iru q3rygwiufg weiulFG");

          setStatus("success");
          // const analysisResult = await callService.getAnalysis();
          // setCallResult(analysisResult.data[0]); // Get the latest analysis
        }, 3000); // Adjust timing based on your needs
      } catch (error) {
        console.error("Error:", error);
        // setStatus("error");
      } finally {
        setStatus("success");
      }
    }
  };

  const InputField = ({ label, name, placeholder, value, error }) => (
    <div className="bg-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl text-sm text-black space-y-2 hover:bg-[#FBAE3C] hover:duration-300">
      <h1 className="font-bold text-lg">{label}</h1>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="border-2 rounded-2xl p-2 w-full focus:outline-none focus:border-[#FBAE3C]"
        disabled={status === "loading"}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="flex items-center justify-center p-4">
      <div className="relative mx-auto h-[800px] w-[400px] rounded-[60px] bg-gray-800 p-5 shadow-xl">
        {/* Frame notch */}
        <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-3xl bg-gray-800"></div>

        {/* Volume buttons */}
        <div className="absolute -left-1 top-48 h-12 w-1 rounded-l-lg bg-gray-800"></div>
        <div className="absolute -left-1 top-64 h-12 w-1 rounded-l-lg bg-gray-800"></div>

        {/* Power button */}
        <div className="absolute -right-1 top-56 h-12 w-1 rounded-r-lg bg-gray-800"></div>

        {/* Screen */}
        <div
          style={{
            backgroundImage: "url('phonebg.svg')",
            backgroundSize: "cover",
          }}
          className="h-full w-full rounded-[45px] bg-white flex flex-col gap-8 items-center justify-center overflow-y-auto"
        >
          <div className="absolute top-10 left-1/2 h-8 w-28 -translate-x-1/2 rounded-full bg-black"></div>

          <div className="w-4/5 py-4 px-8 rounded-2xl text-center text-md text-black space-y-2">
            <div className="flex flex-row items-center">
              <h1 className="font-black text-6xl">
                Fair<span className="text-[#FBAE3C]">Fi</span>
              </h1>
              <img src="logoo.svg" className="w-20 mt-[-24]" alt="Logo" />
            </div>
            <h2>Let's begin</h2>
          </div>

          {status === "success" && callResult ? (
            <div className="w-4/5 space-y-4 text-center">
              <div className="bg-white shadow-2xl p-6 rounded-2xl">
                <h2 className="font-bold text-xl mb-4">Loan Decision</h2>
                <p
                  className={`text-lg font-semibold ${
                    callResult.loan_decision === "Granted"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {callResult.loan_decision}
                </p>
                <p className="mt-4 text-sm">
                  {callResult.reasons_for_decision}
                </p>
                <p className="mt-2 text-sm italic">
                  Attitude: {callResult.loaner_attitude}
                </p>
              </div>
              <button
                onClick={() => {
                  setStatus("idle");
                  setCallResult(null);
                  setFormData({
                    gender: "",
                    accent: "",
                  });
                }}
                className="bg-[#FBAE3C] text-white px-6 py-2 rounded-xl hover:bg-black transition-colors"
              >
                Start New Call
              </button>
            </div>
          ) : (
            <>
              {/* <InputField
                disabled={true}
                label="Phone Number"
                name="phone number"
                placeholder="Enter phone number"
                value=""
                error=""
              /> */}

              <InputField
                label="Gender"
                name="gender"
                placeholder="Enter gender"
                value={formData.gender}
                error={errors.gender}
              />

              <InputField
                label="Accent"
                name="accent"
                placeholder="Enter accent"
                value={formData.accent}
                error={errors.accent}
              />

              <button
                onClick={handleSubmit}
                disabled={status === "loading"}
                className={`bg-black text-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl hover:bg-[#FBAE3C] hover:duration-300 transition-colors ${
                  status === "loading" ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <h1 className="font-bold text-4xl">
                  {status === "loading" ? "Calling..." : "Call"}
                </h1>
              </button>

              {status === "error" && (
                <p className="text-red-500 text-sm">
                  An error occurred. Please try again.
                </p>
              )}
            </>
          )}
        </div>

        {/* Home button */}
        <div className="absolute bottom-8 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-gray-400"></div>
      </div>
    </div>
  );
}

export default IPhone;
