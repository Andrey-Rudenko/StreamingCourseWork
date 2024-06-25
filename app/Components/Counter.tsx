import React, { useState } from "react";


function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h1>js на клиенте работает</h1>
      <h2>Ваш счет: {count} </h2>

      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter