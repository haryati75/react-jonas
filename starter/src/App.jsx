import { useState } from "react";
import "./styles.css";

export default function App() {
  return <TipCalculator />;
}

function TipCalculator() {
  const [billAmount, setBillAmount] = useState(0);
  const [myRating, setMyRating] = useState(0);
  const [friendRating, setFriendRating] = useState(0);

  function handleReset() {
    setBillAmount(0);
    setMyRating(0);
    setFriendRating(0);
  }

  return (
    <div className="card">
      <BillInput billAmount={billAmount} setBillAmount={setBillAmount} />

      <RatingInput rating={myRating} setRating={setMyRating}>
        <label>How did you like the service?</label>
      </RatingInput>

      <RatingInput rating={friendRating} setRating={setFriendRating}>
        <label>How did your friend like the service?</label>
      </RatingInput>

      <PayWithTip
        billAmount={billAmount}
        myRating={myRating}
        friendRating={friendRating}
      />
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

function BillInput({ billAmount, setBillAmount }) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="number"
        value={billAmount}
        onChange={(e) => setBillAmount(Number(e.target.value))}
      />
    </div>
  );
}

function RatingInput({ rating, setRating, children }) {
  return (
    <div>
      {children}
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={0}>Bad (0)</option>
        <option value={5}>Good (5)</option>
        <option value={10}>Excellent (10)</option>
        <option value={20}>Amazing (20)</option>
      </select>
    </div>
  );
}

function PayWithTip({ billAmount, myRating, friendRating }) {
  const tip = ((myRating + friendRating) / 200) * billAmount;
  const total = billAmount + tip;
  return (
    <h1>
      You pay ${total} (${billAmount} + ${tip} tip)
    </h1>
  );
}
