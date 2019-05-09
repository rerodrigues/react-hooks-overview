import React, { useState } from 'react';

const defaultState = { count: 0 };
const CounterContext = React.createContext([defaultState, () => {}]);

const CounterProvider = (props) => {
  const [state, setState] = useState(defaultState);
  const updateContext = newValue => setState({ ...state, ...newValue });

  return (
    <CounterContext.Provider value={[state, updateContext]}>
      {props.children}
    </CounterContext.Provider>
  );
};

export { CounterContext, CounterProvider };
