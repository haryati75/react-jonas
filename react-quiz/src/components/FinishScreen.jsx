import { useQuiz } from "../context/QuizContext";

export default function FinishScreen() {
  const { points, maximumPoints, highscore, dispatch } = useQuiz();
  const percentage = (points / maximumPoints) * 100;

  let emoji;
  if (percentage === 100) {
    emoji = "🏅";
  } else if (percentage >= 80) {
    emoji = "🎉";
  } else if (percentage >= 50) {
    emoji = "🙃";
  } else if (percentage >= 0) {
    emoji = "🤔";
  } else {
    emoji = "🤦‍♂️";
  }

  return (
    <>
      <p className="result">
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maximumPoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Re-start Quiz
      </button>
    </>
  );
}
