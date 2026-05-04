import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import readlineSync from "readline-sync";
import generateQuestion from "./tools/generateQuestion.js";
import interviewState from "./state/interviewState.js";
import Interview from "./models/interview.model.js";
import connectDB from "./config/db.js";
dotenv.config();

//ye humne. declaration dede k agr dsa interview k related hoga toh ye tool use kr skte ho and ye ye parameters pass kr dena muje
const questionDeclaration = {
  name: "generateQuestion",
  description:
    "Generate DSA question based on topic and difficulty",

  parameters: {
    type: "object",

    properties: {
      topic: {
        type: "string"
      },

      difficulty: {
        type: "string"
      }
    },

    required: [
      "topic",
      "difficulty"
    ]
  }
};
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

function createChat() {
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    contents: "arrays",
    config: {
      //idr usko instructions dedi 
      systemInstruction: `
You are a DSA interviewer.

If user asks for a coding question,
always use generateQuestion tool.
  `,
      //idr avavible tools bta diye 
      tools: [
        {
          functionDeclarations: [
            questionDeclaration
          ]
        }
      ]
    },
    history: [],
  });
}
async function main() {
  await connectDB();
  const chat = createChat();
  while (true) {
    const userProblem = readlineSync.question("You:");
    if (interviewState.awaitingAnswer) {
      const evaluation = await chat.sendMessage({
        message: `
      Question: ${JSON.stringify(interviewState.currentQuestion)}

      Candidate Answer:
      ${userProblem}

      Evaluate like a DSA interviewer.

      First line should be:
      SCORE: X

      (where X is between 1 to 10)

      Then give feedback and one follow-up question.
`
      });
      const match = evaluation.text.match(
        /SCORE:\s*(\d+)(?:\/10)?/i
      );
interviewState.history.push({
  question: interviewState.currentQuestion,
  answer: userProblem,
  feedback: evaluation.text,
  timestamp: new Date()
});
await Interview.create({
  topic: interviewState.topic,

  difficulty: interviewState.difficulty,

  question: interviewState.currentQuestion,

  answer: userProblem,

  feedback: evaluation.text,

  score: match ? Number(match[1]) : 0
});

      if (match) {
        interviewState.score += Number(match[1]);
      }
      console.log("\n" + evaluation.text);
      console.log(
        `Current Score: ${interviewState.score}`
      );


      interviewState.awaitingAnswer = false;

      continue;
    }
    if (userProblem.toLowerCase() === "exit") {
      console.log("Chat ended.");
      break;
    }

    const response = await chat.sendMessage({
      message: userProblem,
    });
    //response handle kr rhe
    if (response.functionCalls && response.functionCalls.length > 0) {
      const toolCall = response.functionCalls[0];

      if (toolCall.name === "generateQuestion") {
       
        const result = generateQuestion(toolCall.args);
        console.log("\nInterview Question:");
        console.log(result);
        console.log("Explain your approach to solve this problem.");
      }
    }
    else {
      console.log(response.text);
    }


  }
}

main();