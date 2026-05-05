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
    const interviews = await Interview.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    
    // Simple analysis for recommendations
    const topicsMap = {};
    interviews.forEach(i => {
      if (!topicsMap[i.topic]) topicsMap[i.topic] = { count: 0, badAnswers: 0 };
      topicsMap[i.topic].count++;
      
      // If feedback says 0 score or points out they don't know, mark as bad
      if (i.feedback.includes("SCORE: 0") || i.feedback.toLowerCase().includes("don't know") || i.feedback.toLowerCase().includes("completely unrelated")) {
        topicsMap[i.topic].badAnswers++;
      }
    });

    const recommendations = [];
    for (const [topic, stats] of Object.entries(topicsMap)) {
      if (stats.badAnswers > 0) {
        recommendations.push(topic);
      }
    }

    res.json({ interviews, recommendations });
  } catch (error) {
    console.error("History Error:", error);
    res.status(500).json({ error: "An error occurred fetching history." });
  }
});