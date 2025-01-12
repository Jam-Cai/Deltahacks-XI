"use client";
import { useState, useEffect, React } from "react";
import Nav from "../components/Nav";

const Page = () => {
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const API_URL = "http://localhost:4000";
  // Fetch reports
  const getReports = async () => {
    try {
      const response = await fetch(`${API_URL}/api/analysis`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  useEffect(() => {
    getReports();
  }, []); // Re-fetch reports when session changes

  return (
    <>
      <section
        style={{
          backgroundImage: "url('/bg.svg')",
          backgroundSize: "cover",
        }}
        className="min-h-screen bg-white"
      >
        <div className="pt-6 pl-6 text-9xl text-black font-bold bg-white shadow-2xl rounded-2xl w-max p-12 text-center">
          <div className="flex flex-row">
            <h1 className="text-9xl">
              Dash<span className="text-[#FBAE3C]">Board</span>
            </h1>
            <img src="logoo.svg" className="w-28 mt-[-12]" alt="Logo" />
          </div>
        </div>

        <div className="flex gap-24 font-black text-black p-12">
          <div className="w-1/5">
            <div className="flex border-8 flex-col justify-center gap-12 items-center gap-6 bg-white shadow-2xl text-center h-full p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
              <img
                src="business.jpg"
                alt="Business Avatar"
                className="rounded-3xl w-36 h-36 object-cover"
              />
              <h1 className="text-5xl">EQ Bank</h1>
              <p className="font-normal">
                EQ Bank redefines banking with innovative, customer-focused
                financial solutions. From high-interest savings accounts to
                seamless international money transfers, we empower you to make
                the most of your money.
              </p>
              <div className="flex items-center justify-center">
                <div className="text-9xl font-black rounded-full bg-[#FBAE3C] border-12 border-[#E69A28] p-12 flex items-center justify-center w-76 h-84">
                  <div className="p-8 bg-white rounded-full flex items-center justify-center w-46 h-46">
                    {reports.alphabetical_grade}
                  </div>{" "}
                </div>{" "}
              </div>
            </div>
          </div>

          <div className="w-4/5 grid grid-cols-4 gap-8 bg-[#FBAE3C] rounded-2xl shadow-2xl p-8">
            <div className="grid col-span-4 p-12 bg-white shadow-2xl rounded-2xl border-8">
              {" "}
              <h1 className="font-normal">
               <div className="flex flex-row">
                  <img src="logoo.svg" className="w-14 mt-[-24]" alt="Logo" />
                  <h2 className="text-4xl font-black mb-4">
                    Business Bias Recommendations:
                  </h2>
               </div>
                <p>
                  {reports?.recommendations ?? "No recommendations available"}
                </p>{" "}
              </h1>
            </div>
            {reports?.data?.map((report, index) => (
              <div
                key={index}
                className="bg-white border-8 flex flex-col justify-between items-center shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300 p-4"
              >
                <ul className="font-normal text-sm">
                  <div className="flex flex-row justify-center items-center gap-6">
                    <img src="man.png" className="w-24 h-24 rounded-2xl mb-4" />

                    <li className="text-4xl font-bold">
                      {report.loan_decision}
                    </li>
                  </div>
                  <li className="text-2xl mb-2">Package #{index + 1}</li>

                  <li>{report.reasons_for_decision}</li>
                  <li>{report.loaner_attitude}</li>
                </ul>
              </div>
            ))}
            <div className="bg-white border-8 flex flex-col justify-between items-center shadow-2xl rounded-2xl hover:scale-105 transition-transform duration-300 p-4">
              <p className="text-[200px] text-center">?</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
