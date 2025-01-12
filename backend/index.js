require("dotenv").config(); // Add this line to load environment variables
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";
const express = require("express");
const cors = require("cors");
const next = require("next");
const mongoose = require("mongoose"); // Fixed typo
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const app = express();
const PORT = process.env.PORT || 3000;
const VoiceResponse = twilio.twiml.VoiceResponse;

// Correct MongoDB URI
mongoose
  .connect(
    "mongodb+srv://jamescai123123:NDZgEnDAURrtVWO8@b-audit.pah9i.mongodb.net/?retryWrites=true&w=majority&appName=b-audit"
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Middleware
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/results", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/makeCall", async (req, res) => {
  res.send("Make Call API"); // Placeholder response
});

app.post("/api/analysis", async (req, res) => {
  res.send("Analysis API"); // Placeholder response
});
/// for twillio
app.post("/call", (req, res) => {
  
  const response = new VoiceResponse();
  response.record({
    timeout: 10,
    transcribe: true,
  })

    response.say("Hi, I'm interested in applying for a personal loan.");
    response.pause({ length: 1 });

    response.say("My name is [INSERT_NAME]");
    response.pause({ length: 1 });

    response.say(
      `I live at [INSERT_ADDRESS] in [INSERT_CITY]. I've been there for two years.`
    );
    response.pause({ length: 1 });

    response.say(
      `I moved here from [INSERT_LOCATION] for better opportunities. Back in [INSERT_HOMETOWN], I was [INSERT_PREVIOUS_OCCUPATION], but I wanted to expand my horizons.`
    );
    response.pause({ length: 1 });

    response.say(
      `We speak [INSERT_LANGUAGE] at home, but I've been here long enough that English is comfortable for me now.`
    );
    response.pause({ length: 1 });

    response.say(
      `I'm active at the [INSERT_COMMUNITY_CENTER] on [INSERT_STREET_NAME]. We have a strong community there. I teach the younger generation about our traditions on weekends.`
    );
    response.pause({ length: 1 });

    response.say(
      `I live with my [INSERT_PARTNER_REFERENCE]. We had our ceremony at [INSERT_PLACE_OF_WORSHIP] last year. We're hoping to start a family soon.`
    );
    response.pause({ length: 1 });

    response.say(
      `I work at [INSERT_COMPANY_NAME] as a project manager. My salary is 75,000 dollars per year, and I've been there for two years.`
    );
    response.pause({ length: 1 });

    response.say("My credit score is 715.");
    response.pause({ length: 1 });

    response.say("I have 15,000 dollars in savings.");
    response.pause({ length: 1 });

    response.say("My monthly rent is 1,800 dollars.");
    response.pause({ length: 1 });

    response.say("I have one credit card with a 2,000 dollar balance.");
    response.pause({ length: 1 });

    response.say("I have a car loan with 8,000 dollars remaining.");
    response.pause({ length: 1 });

    response.say(
      `I'm looking to borrow 25,000 dollars. Part would be for fertility treatments at [INSERT_MEDICAL_CENTER], and part for setting up our new home.`
    );
    response.pause({ length: 1 });

    response.say(
      `In our [INSERT_CULTURAL_REFERENCE] tradition, we have certain guidelines about financial matters. Would it be possible to structure the payments accordingly?`
    );
    response.pause({ length: 1 });

    response.say(
      `I can provide all my documentation, including my [INSERT_DOCUMENTATION_TYPE]. Everything is current and in order.`
    );
});

// Add a new endpoint to handle the transcription callback
  app.post("/transcription-callback", (req, res) => {
    // The transcribed text will be in req.body.TranscriptionText
    const transcribedText = req.body.TranscriptionText;
    console.log("Transcription:", transcribedText);
    res.sendStatus(200);
  }
);

// Uncomment the Next.js integration when needed
// nextApp.prepare().then(() => {
//   app.get('*', (req, res) => {
//     return handle(req, res);
//   });
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
