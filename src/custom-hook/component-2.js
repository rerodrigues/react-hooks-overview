import React from 'react';
import useCounter from './use-counter';

const App = () => {
  const initialValue = 50;
  const [value, increment] = useCounter(initialValue);

  return (
    <>
      <div>Current value: {value}</div>
      <label htmlFor="amount">Increment by number:</label>
      <input type="number" id="amount" onChange={e => increment(e.target.value)} />
    </>
  );
};

export default App;
