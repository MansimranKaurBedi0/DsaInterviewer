import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  topic: String,

  difficulty: String,

  question: {
    title: String,
    problem: String
  },

  answer: String,

  feedback: String,

  score: Number

}, {
  timestamps: true
});

const Interview = mongoose.model(
  "Interview",
  interviewSchema
);

export default Interview;