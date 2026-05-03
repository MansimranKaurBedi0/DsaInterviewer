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
  const questionList =
  questions[topic][difficulty];

const randomIndex = Math.floor(
  Math.random() * questionList.length
);

const selectedQuestion =
  questionList[randomIndex];
  interviewState.topic = topic;
  interviewState.difficulty = difficulty;
  interviewState.currentQuestion =
    selectedQuestion;

  interviewState.totalQuestions += 1;
interviewState.awaitingAnswer = true;
  return selectedQuestion;
}

export default generateQuestion;