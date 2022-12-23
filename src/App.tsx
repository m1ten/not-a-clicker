import { useState } from "react";

function App() {
  const [value, setValue] = useState(1);
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + value);
  }

  return (
    <div className="container">
      <h1>Welcome to Clicker-TS!</h1>

      <div className="row">
        <div>
          <input
            id="value-input"
            onChange={(e) => setValue(Number(e.target.value) || 1)}
            placeholder="Enter a value..."
          />
          <button type="button" onClick={() => increment()}>
            Increment
          </button>
        </div>
      </div>
      <p>{count}</p>
    </div>
  );
}

export default App;
