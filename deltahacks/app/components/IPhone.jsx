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
  const [isShaking, setIsShaking] = useState(false);

  const genderOptions = [
    { value: "", label: "Select gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const accentOptions = [
    { value: "", label: "Select accent" },
    { value: "british", label: "British" },
    { value: "american", label: "American" },
    { value: "australian", label: "Australian" },
    { value: "indian", label: "Indian" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log(`Iphone Gender: ${formData.gender}`);
    const newErrors = {};

    if (!formData.gender.trim()) {
      newErrors.gender = "Please select a gender";
    }
    if (!formData.accent.trim()) {
      newErrors.accent = "Please specify an accent";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        setStatus("loading");
        setIsShaking(true);

        // Start shaking animation
        setTimeout(() => {
          setIsShaking(false);
        }, 5000);

        const callresult = await callService.initiateCall(
          formData.gender,
          formData.accent
        );

        setTimeout(async () => {
          setStatus("success");
        }, 3000);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setStatus("success");
      }
    }
  };

  const SelectField = ({ label, name, options, value, error }) => (
    <div className="bg-white w-4/5 shadow-2xl py-4 px-8 rounded-2xl text-sm text-black space-y-2 hover:bg-[#FBAE3C] hover:duration-300">
      <h1 className="font-bold text-lg">{label}</h1>
      <select
        name={name}
        value={value}
        onChange={handleInputChange}
        className="border-2 rounded-2xl p-2 w-full focus:outline-none focus:border-[#FBAE3C]"
        disabled={status === "loading"}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className={`relative mx-auto h-[800px] w-[400px] rounded-[60px] bg-gray-800 p-5 shadow-xl ${
          isShaking ? "animate-shake" : ""
        }`}
        style={{
          animation: isShaking
            ? "shake 0.2s cubic-bezier(.36,.07,.19,.97) infinite"
            : "none",
          transformOrigin: "50% 50%",
          ["@keyframes shake"]: {
            "0%, 100%": {
              transform: "translate3d(0, 0, 0)",
            },
            "10%, 30%, 50%, 70%, 90%": {
              transform: "translate3d(-4px, 0, 0)",
            },
            "20%, 40%, 60%, 80%": {
              transform: "translate3d(4px, 0, 0)",
            },
          },
        }}
      >
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
                <p className="mt-4 text-sm">{callResult.reasons_for_decision}</p>
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
              <SelectField
                label="Gender"
                name="gender"
                options={genderOptions}
                value={formData.gender}
                error={errors.gender}
              />

              <SelectField
                label="Accent"
                name="accent"
                options={accentOptions}
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