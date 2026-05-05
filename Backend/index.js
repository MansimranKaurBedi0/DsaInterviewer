import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import generateQuestion from "./tools/generateQuestion.js";
import interviewState from "./state/interviewState.js";
import Interview from "./models/interview.model.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const questionDeclaration = {
  name: "generateQuestion",
  description: "Generate DSA question based on topic and difficulty",
  parameters: {
    type: "object",
    properties: {
      topic: { type: "string" },
      difficulty: { type: "string" }
    },
    required: ["topic", "difficulty"]
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
      systemInstruction: `
You are a DSA interviewer.

If user asks for a coding question,
always use generateQuestion tool.
  `,
      tools: [
        {
          functionDeclarations: [questionDeclaration]
        }
      ]
    },
    history: [],
  });
}

let chat;

async function init() {
  await connectDB();
  chat = createChat();
  console.log("Database connected and chat initialized.");
  
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
  });
}

init();

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (interviewState.awaitingAnswer) {
      const evaluation = await chat.sendMessage({
        message: `
      Question: ${JSON.stringify(interviewState.currentQuestion)}

      Candidate Answer:
      ${userMessage}

      Evaluate like a DSA interviewer.

      First line should be:
      SCORE: X

      (where X is between 1 to 10)

      Then give feedback and one follow-up question.
`
      });
      const match = evaluation.text.match(/SCORE:\s*(\d+)(?:\/10)?/i);

      interviewState.history.push({
        question: interviewState.currentQuestion,
        answer: userMessage,
        feedback: evaluation.text,
        timestamp: new Date()
      });

      await Interview.create({
        topic: interviewState.topic,
        difficulty: interviewState.difficulty,
        question: interviewState.currentQuestion,
        answer: userMessage,
        feedback: evaluation.text,
        score: match ? Number(match[1]) : 0
      });

      let scoreDelta = 0;
      if (match) {
        scoreDelta = Number(match[1]);
        interviewState.score += scoreDelta;
      }

      interviewState.awaitingAnswer = false;

      return res.json({
        reply: evaluation.text,
        score: scoreDelta,
        totalScore: interviewState.score,
        isQuestion: false
      });
    }

    const response = await chat.sendMessage({
      message: userMessage,
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const toolCall = response.functionCalls[0];

      if (toolCall.name === "generateQuestion") {
        const result = generateQuestion(toolCall.args);
        const questionText = result.problem ? `**${result.title}**\n${result.problem}` : result;
        return res.json({
          reply: `**Interview Question:**\n\n${questionText}\n\n*Explain your approach to solve this problem.*`,
          isQuestion: true
        });
      }
    }

    return res.json({ 
      reply: response.text, 
      isQuestion: false 
    });

  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "An error occurred while processing your request." });
  }
});