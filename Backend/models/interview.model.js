import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  topic: String,

  difficulty: String,

  question: {
    title: String,
    problem: String
  },

  answer: String,

  feedback: String,

}, {
  timestamps: true
});

const Interview = mongoose.model(
  "Interview",
  interviewSchema
);

export default Interview;