import { CohereClientV2 } from "cohere-ai";
import dotenv from "dotenv";
import twilio from "twilio";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
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
  "Hi, I’d like to take out a personal loan for around $20,000.",
  "I make $60,000 a year, with $1,500 in monthly bills.",
  "It’s around 720.",
  "Sure, it’s Alex Carter, 123 Main Street, and my number is 555-6789.",
  "Thanks!",
];

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/analysis", async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    const analysisSchema = new mongoose.Schema({
      loan_decision: String,
      reasons_for_decision: String,
      loaner_attitude: String,
      transcript: String,
      created_at: {
        type: Date,
        default: Date.now,
      },
    });

    const Analysis =
      mongoose.models.Analysis || mongoose.model("Analysis", analysisSchema);

    const analyses = await Analysis.find(
      {},
      {
        _id: 0,
        created_at: 0,
        __v: 0,
      }
    ).sort({ created_at: -1 });

    //create json that contains data analysis from db to identify bias


    return res.status(200).json({
      success: true,
      data: analyses,
    });
  } catch (error) {
    console.error("Error fetching analyses:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch analyses",
    });
  } finally {
    await mongoose.connection.close();
  }
});

// Initial call handler
app.post("/call", (request, response) => {
  const twiml = new VoiceResponse();

  // Start with the first question
  twiml.say(questions[0]);

  twiml.gather({
    input: "speech",
    action: "/gather/1",
    timeout: 12,
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
        timeout: 9,
        speechTimeout: "auto",
      });

      response.type("text/xml");
      response.send(twiml.toString());
    });
  }
});

app.post(`/gather/${questions.length}`, async (request, response) => {
  const twiml = new VoiceResponse();

  const speechResult = request.body.SpeechResult;
  console.log(`Answer ${questions.length}:`, speechResult);
  answers = answers.concat(" ").concat(speechResult);

  try {
    mongoose.connect(process.env.MONGODB_URL);
    mongoose.set("strictQuery", false);
    console.log("Connected to MongoDB");

    const analysisSchema = new mongoose.Schema({
      loan_decision: {
        type: String,
        required: true,
        description:
          "Indicates if the loan was granted or not, e.g., 'Granted' or 'Not Granted'.",
      },
      reasons_for_decision: {
        type: String,
        required: true,
        description:
          "Summarizes the reasons provided for granting or denying the loan.",
      },
      loaner_attitude: {
        type: String,
        required: true,
        description:
          "Describes the emotional tone or attitude of the loaner, e.g., 'Calm', 'Frustrated', etc.",
      },
      transcript: {
        type: String,
        required: true,
        description: "The full transcript of the conversation.",
      },
    });

    const Analysis = mongoose.model("Analysis", analysisSchema);

    const summary_prompt =
      "Prioritize generating a JSON object, analyze the following transcript of a phone call between a loan applicant and a representative. Summarize the key outcomes and tone of the conversation from the loan applicant's perspective. Specifically, include: Whether the loan was granted or not DO NOT PUT PENDING, PUT EITHER GRANTED OR NOT GRANTED. Key reasons provided for the decision. The attitude or emotional tone of the applicant during the call. Here's the transcript: ";

    const cohereResponse = await cohere_sentiment.chat({
      model: "command-r-plus",
      messages: [{ role: "user", content: summary_prompt.concat(answers) }],
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
            loaner_attitude: {
              type: "string",
              description:
                "Describes the emotional tone or attitude of the applicant, e.g., 'Calm', 'Frustrated', etc.",
            },
          },
          required: [
            "loan_decision",
            "reasons_for_decision",
            "loaner_attitude",
          ],
        },
      },
    });
    console.log("Cohere Response:", cohereResponse);
    console.log("-----------------------------------");

    const loan_decision = JSON.parse(
      cohereResponse.message.content[0].text
    ).loan_decision;

    const reasons_for_decision = JSON.parse(
      cohereResponse.message.content[0].text
    ).reasons_for_decision;

    const loaner_attitude = JSON.parse(
      cohereResponse.message.content[0].text
    ).loaner_attitude;

    const newAnalysis = new Analysis({
      loan_decision: loan_decision,
      reasons_for_decision: reasons_for_decision,
      loaner_attitude: loaner_attitude,
      transcript: answers,
    });

    await newAnalysis.save();
    console.log("Analysis Saved");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.connection.close();
  }

  twiml.hangup();
  response.type("text/xml");
  response.send(twiml.toString());
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
