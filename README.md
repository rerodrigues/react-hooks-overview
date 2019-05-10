# React Hooks Overview

## What are React Hooks

React hooks are a new way of accessing state and lifecycle methods.

## What's new with hooks

In fact, react hooks almost didn't adds so many new things, it's more like a shortcut for functionalities which already existed before.

## Advantages of hooks

The main advantage of hooks is the possibility to use it on a functional component.
Another great advantage is the separation of concerns in multiple hooks calls, more on that later.

## Rules of hooks

React Hooks have a strict set of rules, that can be found in detail in [Rules of Hooks].
The most important are:

1) Hooks can only be called within React components and custom hooks. Always in the main function, not in helpers or additional functions.
2) Hooks must never be called inside a condition or a loop. This because hooks must be always executed in the same order and the same amount of times.

There is an [ESLint plugin] for help dealing with these rules.

## Most common hooks

### useState

This is by far the most used hook. As the name implies, it is a hook for dealing with the state variables.
It returns an array containing two values, the first is the state variable itself, and the second, a function to set its value.

#### Usage

```jsx
import React, { useState } from 'react';

const App = () => {
  const initialValue = 0;
  const [value, setValue] = useState(initialValue);

  return (
    <>
      <div>Current value: {value}</div>
      <button type="button" onClick={() => setValue(value - 1)}>Decrement</button>
      <button type="button" onClick={() => setValue(value + 1)}>Increment</button>
    </>
  );
};

export default App;
```

### useEffect

This is a very powerful hook. `useEffect` is a direct replacement for three of the old lifecycle methods, `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

#### Basic Usage

In this example, the component will render with the title with value of 0 and update it everytime we click on the button.

```jsx
import React, { useState, useEffect } from 'react';

const App = () => {
  const initialValue = 0;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    document.title = `${value} is the current value=`;
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
```

#### Only run when certain variables changes

Will only run when the `value` variable is changed.

```jsx
useEffect(() => {
  document.title = `${value} is the current value`;
}, [value]
```

#### Only run on componentDidMount

Passing an empty array will block the hook from running when component re-renders.

```jsx
useEffect(() => {
  document.title = `${value} is the current value=`;
}, []
```

#### Running when component unmounts

Returning a function, this function will be called on component unmount and the hook will act similar to the `componentWillUnmount` lifecycle method.

```jsx
useEffect(() => {
  document.title = `${value} is the current value`;

  return () => {
    console.log('Component unmounted')
  }
}
```

## Custom Hooks

Custom hooks can be created to share same logic across different components.
They are ordinary functions, however its name __MUST__ begin with `use`.
Custom hooks can use other hooks, as well as other custom hooks.
The same rules of [Rules of Hooks] applies to custom hooks.

### Custom hook

This custom hook will set the title with value of 0 and update it every time the increment function is called.

```jsx
import { useState, useEffect } from 'react';

const useCounter = (initialValue = 0) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    document.title = `${value} is the current value`;
  });

  const increment = (amount = 0) => setValue(parseInt(value, 10) + parseInt(amount, 10));

  return [
    value,
    increment,
  ];
};

export default useCounter;
```

### Component 1

```jsx
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
```

### Component 2

```jsx
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
```

## Testing Hooks

### Components with hooks

For now, React hooks are not very well supported across all the React eco-system. Especially Enzyme does not fully support testing functional components with hooks yet.
For this you will need to use a library called [react-testing-library] like the example below:

```jsx
import React from 'react';
import {
  render,
  fireEvent,
  queryByAttribute,
} from 'react-testing-library';

import MyComponent from '.';

const getById = queryByAttribute.bind(null, 'id');

const { container } = render(<MyComponent />);
const counter = getById(container, 'counter');

describe('Component with hooks', () => {
  it('should load with initial state of 0', () => {
    expect(counter.textContent).toBe('0');
  });

  it('should click increment button and increments count', () => {
    const increment = getById(container, 'increment');

    fireEvent.click(increment);
    expect(counter.textContent).toBe('1');
  });
});
```

### Custom Hooks

As a said before, hooks can only be used in react components and custom hooks, but a test suite is none of the two. And so, the [Rules of hooks] are violated in this scenario.

#### This will NOT work

```js
import React, { useState } from 'react';

define('useCounter tests', () => {
  const initialValue = 0;
  const [ value, increment ] = useCounter(initialValue);

  it('should return the initial value', () => {
    expect(value).toEqual(initialValue);
  })
})
```

#### How to test a custom hook

For testing custom hooks you will need to use another library called [react-hooks-testing-library], like in the example below:

```js
import { renderHook, act } from 'react-hooks-testing-library';
import useCounter from '.';

const { result } = renderHook(() => useCounter());
const [count, increment] = result.current;

describe('Custom Hook', () => {
  it('should initilize counter with default value', () => {
    expect(count).toBe(0);
  });

  it('should increment counter', () => {
    act(() => increment(1));
    const [updateCount] = result.current;

    expect(updateCount).toBe(1);
  });
});
```

## Other Hooks

### useContext

This hook lets you access a Context and return its default or Provider value. Example:

#### Context

```jsx
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
```

#### Component

```jsx
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
```

### useReducer

As the name implies, this hook will receive an action and based in its type, return a new, mutated, state.

Example:

#### Action types

```js
export const INCREMENT_TYPE = '@my-app/INCREMENT';
export const DECREMENT_TYPE = '@my-app/DECREMENT';
```

#### Actions

```js
import { INCREMENT_TYPE, DECREMENT_TYPE } from './action-types';

export const INCREMENT = { type: INCREMENT_TYPE };
export const DECREMENT = { type: DECREMENT_TYPE };
};
```

#### Reducer

```js
import { INCREMENT_TYPE, DECREMENT_TYPE } from './action-types';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case INCREMENT_TYPE:
      return { ...state, count: state.count + 1 };
    case DECREMENT_TYPE:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default reducer;
```

### Component

```jsx
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
```

## Multiple hook calls and separation of concerns

When using lifecycle methods, each method only can be called once, this leads to messy functions, dealing with multiple concerns at the same time. Example:

```jsx
componentDidMount() {
  document.title = `${this.state.value} is the current value`; // concern 1

  const response = fakeService.getResponse(this.state.id); // concern 2
  this.state.response = response;
}
```

With hooks, each responsibility can be split in one different hook call. Example:

```jsx
const [id, setId] = useState();
const [response, setResponse] = useState();

useEffect(() => { // 1 concern, only runs when count changes
  document.title = `${value} is the current value`;
}, [count]);

useEffect(() => { // 1 concern, only runs when id changes
  setResponse(fakeService.getResponse(id));
}. [id]);
```

[ESLint plugin]: https://www.npmjs.com/package/eslint-plugin-react-hooks
[react-testing-library]: https://github.com/testing-library/react-testing-library
[react-hooks-testing-library]: https://github.com/mpeyper/react-hooks-testing-library
[Rules of Hooks]: https://reactjs.org/docs/hooks-rules.html
