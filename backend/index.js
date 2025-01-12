require("dotenv").config();
const twilio = require("twilio");
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const VoiceResponse = twilio.twiml.VoiceResponse;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/results", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/makeCall", async (req, res) => {
  res.send("Make Call API");
});

app.post("/api/analysis", async (req, res) => {
  res.send("Analysis API");
});

// Twilio voice handler
app.post("/call", (req, res) => {
  const response = new VoiceResponse();

  // Start recording the entire call
  // response.startRecording({
  //   action: "/recording-complete",
  //   timeout: 0,
  //   transcribe: true,
  //   transcribeCallback: "/transcription",
  //   maxLength: 3600, // Maximum length in seconds (1 hour)
  //   recordingStatusCallback: "/recording-status",
  //   playBeep: false,
  // });

  // Your dialogue script
  const script = [
    "Hi, I'm interested in applying for a personal loan.",
    "My name is [INSERT_NAME]",
    `I live at [INSERT_ADDRESS] in [INSERT_CITY]. I've been there for two years.`,
    // ... rest of your script ...
  ];

  // Add each line with appropriate pauses
  script.forEach((line) => {
    response.say({ voice: "alice" }, line);
    console.log(line)
    response.pause({ length: 1 });
  });

  // End the call after script completion
  response.hangup();

  res.type("text/xml");
  res.send(response.toString());
});

// Handle recording completion
app.post("/recording-complete", (req, res) => {
  const response = new VoiceResponse();
  console.log("Recording completed:", req.body.RecordingUrl);
  res.type("text/xml");
  res.send(response.toString());
});

// Handle recording status updates
app.post("/recording-status", (req, res) => {
  console.log("Recording status:", req.body.RecordingStatus);
  res.sendStatus(200);
});

// Handle transcription callback
app.post("/transcription", (req, res) => {
  console.log("Transcription:", req.body.TranscriptionText);
  console.log("Transcription URL:", req.body.TranscriptionUrl);
  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
