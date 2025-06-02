"use client";

import Quiz from "./components/quiz";

const quizQuestions = [
  {
    id: "1",
    text: "What is the capital of France?",
    type: "single",
    options: [
      { id: "1-1", text: "London", isCorrect: false },
      { id: "1-2", text: "Paris", isCorrect: true },
      { id: "1-3", text: "Berlin", isCorrect: false },
      { id: "1-4", text: "Madrid", isCorrect: false },
    ],
    timeLimit: 150, // 30 seconds for this question
  },
  {
    id: "2",
    text: "Which of these are programming languages?",
    type: "multiple",
    options: [
      { id: "2-1", text: "HTML", isCorrect: false },
      { id: "2-2", text: "JavaScript", isCorrect: true },
      { id: "2-3", text: "CSS", isCorrect: false },
      { id: "2-4", text: "Python", isCorrect: true },
    ],
    timeLimit: 150,
  },
  {
    id: "3",
    text: "React is a JavaScript library for building user interfaces.",
    type: "truefalse",
    options: [
      { id: "3-1", text: "True", isCorrect: true },
      { id: "3-2", text: "False", isCorrect: false },
    ],
    timeLimit: 150,
  },
];

export default function QuizPage() {
  const handleQuizComplete = (results: {
    score: number;
    total: number;
    answers: Record<string, string | string[]>;
  }) => {
    console.log("Quiz results:", results);
    alert(`You scored ${results.score} out of ${results.total}!`);
  };

  return <Quiz questions={quizQuestions} onComplete={handleQuizComplete} />;
}
