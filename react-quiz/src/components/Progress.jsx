import React from "react";
import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { index, answer, numQuestions, points, maximumPoints } = useQuiz();
  return (
    <header className="progress">
      <progress value={index + Number(answer !== null)} max={numQuestions} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maximumPoints} points
      </p>
    </header>
  );
}
