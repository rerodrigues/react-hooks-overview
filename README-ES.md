# React Hooks - Visión general

## Qué son los React Hooks

React hooks son una nueva manera de acceder al state y a los lifeclycle methods.

## Qué ha de nuevo con hooks

En realidad, los react hooks casi no agregan muchas cosas nuevas, ellos son más como un shortcut para las funcionalidades que ya existían antes.

## Ventajas de hooks

La principal ventaja de los hooks es la posibilidad de usarlos en componentes funcionales.
Otra gran ventaja es la separación de responsabilidades en múltiples llamadas a los hooks, más sobre esto adelante.

## Reglas de los hooks

React Hooks tiene un conjunto de reglas muy estricto, que se puede encontrar en detalles en las [Reglas de Hooks].
Las más importantes son:

1) Sólo se puede llamar un hook dentro de un componente React o un custom hook. Siempre en la función principal, nunca en helpers o funciones adicionales.
2) Hooks no pueden nunca ser llamados dentro de una condición o un loop. Esto se pasa por que los hooks necesitan ser siempre ejecutados en la misma orden y la misma cantidad de veces.

Hay un [plugin ESLint] para ayudarnos a lidiar con estas reglas.

## Hooks más comunes

### useState

Este es lo hook mas usado. Como lo nombre indica, este es un hook para tratar variables de state,
Retorna un array con dos valores, el primero es la própria variable de state, y el segundo, una función para setear esta variable.

#### Uso

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

Este es un hook muy poderoso. `useEffect` es un sustituto directo para tres de los lifecycle methods viejos, `componentDidMount`, `componentDidUpdate`, y `componentWillUnmount`.

#### Uso básico

En este ejemplo, el component va a renderizar con el título conteniendo el valor de 0 y va a actualizar cada vez que hagamos click en el buton.

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

#### Sólo ejecuta en componentDidMount

Al pasar un array vacío, el hook no se ejecuta cuando el componente se renderizar otras veces.

```jsx
useEffect(() => {
  document.title = `${value} is the current value=`;
}, []);
```

#### Sólo ejecuta cuando variables específicas se cambian

Sólo va a ejecutar cuando la variable `value`se cambia.

```jsx
useEffect(() => {
  document.title = `${value} is the current value`;
}, [value]);
```

#### Ejecutando cuando el componente desmontase

Al retornar una función, ella vá a ser llamada cuando el componente desmontarse y el hook actuará de manera similar al lifecycle method `componentWillUnmount`;

```jsx
useEffect(() => {
  document.title = `${value} is the current value`;

  return () => {
    console.log('Component unmounted')
  }
});
```

## Custom Hooks

Para compartir una misma lógica entre diferentes componentes, se puede crear un custom hook.
Ellos son funciones comunes, pero su nombre __DEBE__ empezar con `use`
Custom hooks pueden usar otros hooks, así como otros custom hooks.
Las mismas reglas de [Reglas de Hooks] se aplican a los custom hooks.

### Custom hook

Este custom hook va a setear el título con el valor de 0 y actualizarlo toda vez que se chama la función increment.

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

## Probando Hooks

### Componentes con hooks

Por ahora, React hooks no son muy bien soportados por todo el ecosistema React. Especialmente Enzyme no soporta todavía probar totalmente los componentes que se usan hooks.
Para eso es necesario usar una librería llamada [react-testing-library] como en el ejemplo abajo:

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

Como se dijo antes, hooks sólo se pueden usar en componentes React y custom hooks, pero una suite de test no es ninguno de los 2. Por eso, las [Reglas de hooks] se violan en este escenario.

#### Esto NO va a funcionar

```js
import React, { useState } from 'react';

define('useCounter tests', () => {
  const initialValue = 0;
  const [ value, increment ] = useCounter(initialValue);

  it('should return the initial value', () => {
    expect(value).toEqual(initialValue);
  })
});
```

#### Cómo probar un custom hook

Para se probar custom hooks es necesario una otra librería llamada [react-hooks-testing-library], como en el ejemplo abajo:

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

## Otros Hooks

### useContext

Con este hook se puede acceder a un Context y recibir su valor default o un valor de su Provider. Ejemplo:

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

Como el nombre indica, este hook recibe una action y basado en su tipo, retorna un nuevo estado mutado. Ejemplo:

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

## Múltiples llamadas a los hooks y separación de las responsabilidades

Cuando se usan lifecycle methods, sólo se puede llamar cada método una vez. Esto lleva a funciones confusas, tratando de múltiples responsabilidades al mismo tiempo. Ejemplo:

```jsx
componentDidMount() {
  document.title = `${this.state.value} is the current value`; // concern 1

  const response = fakeService.getResponse(this.state.id); // concern 2
  this.state.response = response;
};
```

Con lo uso de hooks, se puede separar cada responsabilidad en una llamada diferent al hook. Ejemplo:

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

[plugin ESLint]: https://www.npmjs.com/package/eslint-plugin-react-hooks
[react-testing-library]: https://github.com/testing-library/react-testing-library
[react-hooks-testing-library]: https://github.com/mpeyper/react-hooks-testing-library
[Reglas de Hooks]: https://reactjs.org/docs/hooks-rules.html
