import { useState } from "react";
import "./styles.css";

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  function handleReset() {
    setCount(0);
    setStep(1);
  }

  return (
    <>
      <Step step={step} setStep={setStep} />
      <Counter count={count} step={step} setCount={setCount} />
      <Display count={count} />
      {(count !== 0 || step !== 1) && (
        <button onClick={handleReset}>Reset</button>
      )}
    </>
  );
}

function Step({ step, setStep }) {
  return (
    <div>
      <input
        type="range"
        min={0}
        max={10}
        value={step}
        onChange={(e) => setStep(Number(e.target.value))}
      />
      <span>{step}</span>
    </div>
  );
}

function Counter({ count, step, setCount }) {
  const increment = () => setCount((curCount) => curCount + step);
  const decrement = () => setCount((curCount) => curCount - step);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <input
        type="number"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button onClick={increment}>+</button>
    </div>
  );
}

function Display({ count }) {
  const today = new Date();
  const newDate = new Date(today);
  newDate.setDate(today.getDate() + count);

  return (
    <p>
      {count === 0 && `Today is ${today.toDateString()}`}
      {count > 0 && `In ${count} days from today is ${newDate.toDateString()}`}
      {count < 0 && `${Math.abs(count)} days ago was ${newDate.toDateString()}`}
    </p>
  );
}
