import { useEffect } from 'react';
import { useState } from 'react'

function App() {
  const [advice, setAdvice] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    getAdvice()
  }
  , [])

  async function getAdvice() {
    const response = await fetch('https://api.adviceslip.com/advice')
    const data = await response.json()
    setAdvice(data.slip.advice)
    setCount(c => c + 1)
  }

  return <div>
    <h1>{advice}</h1>
    <button onClick={getAdvice}>Get advice</button>
    <Message count={count} />
  </div>
}

function Message({ count }) {
  return <p>You have read <strong>{count}</strong> pieces of advice.</p>
}

export default App
