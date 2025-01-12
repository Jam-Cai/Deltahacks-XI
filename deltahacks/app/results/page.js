"use client";

import { useEffect, useState } from "react";

export default function ResultsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); 
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen bg-gray-200 flex justify-center items-center">
      {loading ? (
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="mt-4 text-4xl text-black">Loading...</p>
        </div>
      ) : (
        <h2 className="text-3xl text-black ">Random Text: The analysis is complete!</h2>
      )}
    </div>
  );
}
