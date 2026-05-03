import questions from "../data/questions.js";
import interviewState from "../state/interviewState.js";

function generateQuestion({ topic, difficulty }) {
   topic = topic.toLowerCase();
  difficulty = difficulty.toLowerCase();
  if (
    !questions[topic] ||
    !questions[topic][difficulty]
  ) {
    return "No question found for this topic or difficulty.";
  }
  const selectedQuestion =
    questions[topic][difficulty][0];

  interviewState.topic = topic;
  interviewState.difficulty = difficulty;
  interviewState.currentQuestion =
    selectedQuestion;

  interviewState.totalQuestions += 1;

  return selectedQuestion;
}

export default generateQuestion;