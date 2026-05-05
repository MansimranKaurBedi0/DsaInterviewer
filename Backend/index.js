import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import generateQuestion from "./tools/generateQuestion.js";
import interviewState from "./state/interviewState.js";
import Interview from "./models/interview.model.js";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { requireAuth } from "./middleware/auth.middleware.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

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
You are a strict DSA interviewer. 
Your interview structure MUST follow these rules:
1. Conduct the interview by asking exactly 3 questions per topic.
2. Start with a topic (e.g., 'arrays'), ask 1 question, wait for the user to answer, evaluate it, and then ask the next question.
3. Once you have asked 3 questions on the current topic, announce that you are moving on to a different topic and ask 3 questions from that new topic.
4. Available topics: arrays, two_pointers, sliding_window, stack, binary_search, linked_list, trees, graphs.
5. Always use the generateQuestion tool to provide coding questions.
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

app.post('/api/chat', requireAuth, async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (interviewState.awaitingAnswer) {
      const evaluation = await chat.sendMessage({
        message: `
      Question: ${JSON.stringify(interviewState.currentQuestion)}

      Candidate Answer:
      ${userMessage}

      Evaluate like a STRICT DSA interviewer.
      If the candidate says "I don't know", gives an empty answer, or provides an answer completely unrelated to solving the problem, point it out.

      Give feedback. Also ask if they are ready for the next question or give a follow-up.
`
      });

      interviewState.history.push({
        question: interviewState.currentQuestion,
        answer: userMessage,
        feedback: evaluation.text,
        timestamp: new Date()
      });

      await Interview.create({
        userId: req.user.userId,
        topic: interviewState.topic,
        difficulty: interviewState.difficulty,
        question: interviewState.currentQuestion,
        answer: userMessage,
        feedback: evaluation.text
      });

      const isBadAnswer = evaluation.text.includes("SCORE: 0") || 
                          evaluation.text.toLowerCase().includes("don't know") || 
                          evaluation.text.toLowerCase().includes("completely unrelated");

      if (interviewState.topic) {
        await User.findByIdAndUpdate(req.user.userId, {
          $set: { [`progress.${interviewState.topic}`]: isBadAnswer ? 'Needs Review' : 'Doing Well' }
        });
      }

      interviewState.awaitingAnswer = false;

      return res.json({
        reply: evaluation.text,
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
          reply: `**Interview Question ${interviewState.totalQuestions}:**\n\n${questionText}\n\n*Explain your approach to solve this problem.*`,
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

app.get('/api/interviews/history', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const interviews = await Interview.find({ userId: req.user.userId }).sort({ createdAt: -1 }).limit(10);
    
    res.json({ interviews, progress: user.progress || {} });
  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({ error: "An error occurred fetching history." });
  }
});