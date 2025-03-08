import React from "react";

export default function Progress({
  index,
  numQuestions,
  points,
  maximumPoints,
  answer,
}) {
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
