import React from 'react';

import UseState from './use-state';
import UseEffect from './use-effect';
import UseCounter from './use-counter';
import UseCounter2 from './use-counter/component-2';
import UseContext from './use-context';
import UseReducer from './use-reducer';

const App = () => (
  <div className="app">
    <h1>React Hooks demos</h1>
    <div className="container">
      <div>
        <h2>useState demo:</h2>
        <UseState />
      </div>
      <div>
        <h2>useEffect demo:</h2>
        <UseEffect />
      </div>
      <div>
        <h2>useContext demo:</h2>
        <UseContext />
      </div>
      <div>
        <h2>useReducer demo:</h2>
        <UseReducer />
      </div>
      <div>
        <h2>Custom Hook demo: <small>(component 1)</small></h2>
        <UseCounter />
      </div>
      <div>
        <h2>Custom Hook demo: <small>(component 2)</small></h2>
        <UseCounter2 />
      </div>
    </div>
    <p>For a detailed explanation of the demos and testing refer to the README</p>
  </div>
);

export default App;
