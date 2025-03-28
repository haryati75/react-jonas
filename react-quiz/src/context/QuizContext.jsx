import { createContext, useContext } from "react";

export const QuizContext = createContext();

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}

export { useQuiz };
