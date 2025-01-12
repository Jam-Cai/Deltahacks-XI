import dotenv from "dotenv";
import { CohereClientV2 } from "cohere-ai";
dotenv.config();

const cohere_gen = new CohereClientV2({
  token: process.env.COHERE_SENTIMENT_API_KEY,
});
// token: process.env.COHERE_SENTIMENT_API_KEY,

console.log(process.env.COHERE_API_KEY);

const summary_prompt =
  "Generate a JSON object and Analyze the following transcript of a phone call between a loan applicant and a representative. Summarize the key outcomes and tone of the conversation from the loan applicant's perspective. Specifically, include: Whether the loan was granted or not. Key reasons provided for the decision. The attitude or emotional tone of the applicant during the call. Here is the transcript: ";

const cohereResponse = await cohere_gen.chat({
  model: "command-r-plus",
  messages: [
    {
      role: "user",
      content: summary_prompt.concat(
        "The loan applicant inquired about a personal loan, provided details of their income and credit history, was informed their application was declined due to insufficient income, expressed frustration and disappointment, and ended the call with a request for further clarification"
      ),
    },
  ],
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
      required: ["loan_decision", "reasons_for_decision", "loaner_attitude"],
    },
  },
});

// console.log(cohereResponse);
console.log("-----------------------------------");

console.log(cohereResponse.message.content[0].text);
console.log("-----------------------------------");

// console.log(type(cohereResponse.message.content[0].text.load));

// const parsed = JSON.parse(cohereResponse);
console.log(JSON.parse(cohereResponse.message.content[0].text).loan_decision);
console.log(
  JSON.parse(cohereResponse.message.content[0].text).reasons_for_decision
);
console.log(JSON.parse(cohereResponse.message.content[0].text).loaner_attitude);
if (
  !cohereResponse.message.content[0].text["loan_decision"] ||
  !cohereResponse.message.content[0].text["reasons_for_decision"] ||
  !cohereResponse.message.content[0].text["loaner_attitude"]
) {
  console.error("Missing required fields in Cohere response");
}

console.log(JSON.stringify(cohereResponse.message.content));
