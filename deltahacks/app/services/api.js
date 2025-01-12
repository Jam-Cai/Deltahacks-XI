// services/api.js
const API_URL = "https://jacobs-macbook-pro.tail8a7d7a.ts.net"; // Update with your backend URL

export const callService = {
  // Initiate a call with user information
  initiateCall: async (gender, accent) => {
    try {
      console.log(`Gender: ${gender}, Accent: ${accent}`);

      // Construct query parameters properly
      const queryParams = new URLSearchParams({ gender, accent });

      const response = await fetch(`${API_URL}/api/call?${queryParams.toString()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ gender, accent }), // Send the data in the body for POST requests
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("Error initiating call:", error);
      throw error;
    }
  },

  // Get analysis results
  getAnalysis: async () => {
    try {
      const response = await fetch(`${API_URL}/api/analysis`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching analysis:", error);
      throw error;
    }
  },
};
