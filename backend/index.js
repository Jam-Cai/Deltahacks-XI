import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";
import twilio from "twilio";
import express from "express";
import cors from "cors";

dotenv.config();

let answers = "";
const app = express();
const PORT = process.env.PORT || 3000;
const VoiceResponse = twilio.twiml.VoiceResponse;
const cohere_sentiment = new CohereClientV2({
  token: process.env.COHERE_SENTIMENT_API_KEY,
});

const cohere_gen = new CohereClientV2({
  token: process.env.COHERE_API_KEY,
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Store questions in an array
const questions = [
  "Hi, what's your name?",
  "Where are you coming from?",
  "Where did you study?",
  "Why do you want money?",
];

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

// Initial call handler
app.post("/call", (request, response) => {
  const twiml = new VoiceResponse();

  // Start with the first question
  twiml.say(questions[0]);

  twiml.gather({
    input: "speech",
    action: "/gather/1",
    timeout: 5,
    speechTimeout: "auto",
  });

  response.type("text/xml");
  response.send(twiml.toString());
});

// Create handlers for each question
questions.forEach((_, index) => {
  if (index < questions.length - 1) {
    app.post(`/gather/${index + 1}`, (request, response) => {
      const twiml = new VoiceResponse();

      // Save the previous response
      const speechResult = request.body.SpeechResult;
      answers = answers.concat(" ").concat(speechResult);
      console.log(`Answer ${index + 1}:`, speechResult);
      console.log(answers);
      // Ask the next question
      twiml.say(questions[index + 1]);

      twiml.gather({
        input: "speech",
        action: `/gather/${index + 2}`,
        timeout: 5,
        speechTimeout: "auto",
      });

      response.type("text/xml");
      response.send(twiml.toString());
    });
  }
});

// Handle the final question
app.post(`/gather/${questions.length}`, (request, response) => {
  const twiml = new VoiceResponse();

  // Save the final response
  const speechResult = request.body.SpeechResult;
  console.log(`Answer ${questions.length}:`, speechResult);
  answers = answers.concat(" ").concat(speechResult);

  const summary_prompt =
    "Analyze the following transcript of a phone call between a loan applicant and a representative. Summarize the key outcomes and tone of the conversation from the loan applicant's perspective. Specifically, include: Whether the loan was granted or not. Key reasons provided for the decision. The attitude or emotional tone of the applicant during the call."(
      async () => {
        const response = await cohere_sentiment.chat({
          model: "command-r-plus",
          message: summary_prompt.concat(answers),
          response_format: {
            response_format: {
              type: "json_object",
              schema: {
                type: "object",
                properties: {
                  loan_decision: {
                    type: "string",
                    description:
                      "Indicates if the loan was granted or not, e.g., 'Granted' or 'Not Granted'.",
                  },
                  reasons_for_decision: {
                    type: "string",
                    description:
                      "Summarizes the reasons provided for granting or denying the loan.",
                  },
                  applicant_attitude: {
                    type: "string",
                    description:
                      "Describes the emotional tone or attitude of the applicant, e.g., 'Calm', 'Frustrated', etc.",
                  },
                  additional_notes: {
                    type: "string",
                    description:
                      "Captures any other critical observations or points from the conversation.",
                  },
                },
                required: [
                  "loan_decision",
                  "reasons_for_decision",
                  "applicant_attitude",
                ],
              },
            },
          },
        });
      }
    )();

  // Thank the user and end the call
  twiml.say("Thank you for your responses. Goodbye!");
  twiml.hangup();
  response.type("text/xml");
  response.send(twiml.toString());
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
