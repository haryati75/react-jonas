import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  return (
    <>
      <Step step={step} setStep={setStep} />
      <Counter count={count} step={step} setCount={setCount} />
      <Display count={count} />
    </>
  );
}

function Step({ step, setStep }) {
  const increment = () => setStep((curStep) => curStep + 1);
  const decrement = () => setStep((curStep) => curStep - 1);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>Step: {step}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

function Counter({ count, step, setCount }) {
  const increment = () => setCount((curCount) => curCount + step);
  const decrement = () => setCount((curCount) => curCount - step);
  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>Count: {count}</span>
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
