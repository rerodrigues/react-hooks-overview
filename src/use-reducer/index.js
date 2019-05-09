import React, { useReducer } from 'react';

import reducer from './reducer';
import { INCREMENT, DECREMENT } from './actions';

const initialState = {
  count: 0,
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <div>Current value: {state.count}</div>
      <button type="button" onClick={() => dispatch(DECREMENT)}>Decrement</button>
      <button type="button" onClick={() => dispatch(INCREMENT)}>Increment</button>
    </>
  );
};

export default App;
