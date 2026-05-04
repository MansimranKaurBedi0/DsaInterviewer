//this will maintain the state of the interview, including the current question, score, and other relevant information.
const interviewState = {
  topic: null,
  difficulty: null,
  currentQuestion: null,
  score: 0,
  totalQuestions: 0,
  awaitingAnswer: false
  ,history: []
};

export default interviewState;