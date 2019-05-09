import React, { useState, useEffect } from 'react';

const App = () => {
  const initialValue = 0;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    document.title = `${value} is the current value`;
  });

  return (
    <>
      <div>Current value: {value}</div>
      <button type="button" onClick={() => setValue(value - 1)}>Decrement</button>
      <button type="button" onClick={() => setValue(value + 1)}>Increment</button>
    </>
  );
};

export default App;
