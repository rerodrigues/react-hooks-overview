import React from 'react';
import useCounter from './use-counter';

const App = () => {
  const initialValue = 0;
  const [value, increment] = useCounter(initialValue);

  return (
    <>
      <div>Current value: {value}</div>
      <button type="button" onClick={() => increment(-1)}>Decrement</button>
      <button type="button" onClick={() => increment(1)}>Increment</button>
    </>
  );
};

export default App;
