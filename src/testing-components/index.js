import React, { useState } from 'react';

const App = () => {
  const initialValue = 0;
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <div id="counter">{ value }</div>
      <button type="button" id="increment" onClick={() => setValue(value + 1)}>Increment value</button>
    </>
  );
};

export default App;
