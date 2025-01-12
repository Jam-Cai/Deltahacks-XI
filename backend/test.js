require("dotenv").config(); // Add this line to load environment variables
// Your AccountSID and Auth Token from console.twilio.com
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const T_NUMBER = process.env.T_NUMBER;
const M_NUMBER = process.env.M_NUMBER;

// Download the helper library from https://www.twilio.com/docs/node/install
const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const client = twilio(accountSid, authToken);


  async function createCall() {
    const call = await client.calls.create({
      to: `${M_NUMBER}`, // Text your number
      from: `${T_NUMBER}`, // From a valid Twilio number
      url: "https://seven-jokes-hang.loca.lt/call",
    });
    
    const transcript = 

    console.log(call.sid);
  }

createCall();
