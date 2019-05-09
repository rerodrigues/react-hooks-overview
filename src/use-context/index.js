import React, { useContext } from 'react';
import { CounterContext, CounterProvider } from './counter-context';

const App = () => (
  <CounterProvider>
    <Button />
  </CounterProvider>
);

const Button = () => {
  const [context, updateContext] = useContext(CounterContext);

  return (
    <>
      <div>Current value: {context.count}</div>
      <button type="button" onClick={() => updateContext({ count: context.count - 1 })}>Decrement</button>
      <button type="button" onClick={() => updateContext({ count: context.count + 1 })}>Increment</button>
    </>
  );
};

export default App;
