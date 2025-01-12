import dotenv from "dotenv"; // Load environment variables
import twilio from "twilio";
import express from "express";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const VoiceResponse = twilio.twiml.VoiceResponse;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

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

// for Twilio
app.post("/call", (request, response) => {
  // Use the Twilio Node.js SDK to build an XML response
  const twiml = new VoiceResponse();

  for (let i = 0; i < 3; i++) {
    twiml.say("Hello.");
    twiml.record({
      transcribe: true,
      transcribeCallback: "/transcription",
      maxLength: 5,
      playBeep: false
    });
    twiml.pause({ length: 1 }); // Pause for 1 second between recordings
  }

  // End the call with <Hangup>
  twiml.hangup();

  // Render the response as XML in reply to the webhook request
  response.type("text/xml");
  console.log(twiml.toString());
  response.send(twiml.toString());
});

// Handle transcription callback
app.post("/transcription", (request, response) => {
  const transcriptionText = request.body.TranscriptionText;
  console.log("Transcription: ", transcriptionText);
  response.sendStatus(200);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
