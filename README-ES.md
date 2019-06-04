# React Hooks - Visión general

## Qué son los React Hooks

React hooks son una nueva manera de acceder al state y a los lifecycle methods.

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

=====

### useEffect

Este es un hook muy poderoso. `useEffect` es un sustituto directo para tres de los lifecycle methods viejos, `componentDidMount`, `componentDidUpdate`, y `componentWillUnmount`.

#### Uso básico

En este ejemplo, el component va a renderizar con el título conteniendo el valor de 0 y va a actualizar cada vez que hagamos click en el buton.

=====

#### Sólo ejecuta cuando variables específicas se cambian

Sólo va a ejecutar cuando la variable `value`se cambia.

=====

#### Sólo ejecuta en componentDidMount

Al pasar un array vacío, el hook no se ejecuta cuando el componente se renderizar otras veces.

=====

#### Ejecutando cuando el componente desmontase

Al retornar una función, ella vá a ser llamada cuando el componente desmontarse y el hook actuará de manera similar al lifecycle method `componentWillUnmount`;

=====

## Custom Hooks

Para compartir una misma lógica entre diferentes componentes, se puede crear un custom hook.
Ellos son funciones comunes, pero su nombre __DEBE__ empezar con `use`
Custom hooks pueden usar otros hooks, así como otros custom hooks.
Las mismas reglas de [Reglas de Hooks] se aplican a los custom hooks.

### Custom hook

Este custom hook va a setear el título con el valor de 0 y actualizarlo toda vez que se chama la función increment.

=====

### Component 1

=====

### Component 2

=====

## Probando Hooks

### Componentes con hooks

Por ahora, React hooks no son muy bien soportados por todo el ecosistema React. Especialmente Enzyme no soporta todavía probar totalmente los componentes que se usan hooks.
Para eso es necesario usar una librería llamada [react-testing-library] como en el ejemplo abajo:

=====
### Custom Hooks

Como se dijo antes, hooks sólo se pueden usar en componentes React y custom hooks, pero una suite de test no es ninguno de los 2. Por eso, las [Reglas de hooks] se violan en este escenario.

#### Esto NO va a funcionar

=====
#### Cómo probar un custom hook

Para se probar custom hooks es necesario una otra librería llamada [react-hooks-testing-library], como en el ejemplo abajo:

=====
## Otros Hooks

### useContext

Con este hook se puede acceder a un Context y recibir su valor default o un valor de su Provider. Ejemplo:

#### Context

=====
#### Component

=====
### useReducer

Como el nombre indica, este hook recibe una action y basado en su tipo, retorna un nuevo estado mutado. Ejemplo:

#### Action types

=====
#### Actions

=====
#### Reducer

=====
#### Component

=====
## Múltiples llamadas a los hooks y separación de las responsabilidades

Cuando se usan lifecycle methods, sólo se puede llamar cada método una vez. Esto lleva a funciones confusas, tratando de múltiples responsabilidades al mismo tiempo. Ejemplo:

=====

Con lo uso de hooks, se puede separar cada responsabilidad en una llamada diferent al hook. Ejemplo:

=====

[plugin ESLint]: https://www.npmjs.com/package/eslint-plugin-react-hooks
[react-testing-library]: https://github.com/testing-library/react-testing-library
[react-hooks-testing-library]: https://github.com/mpeyper/react-hooks-testing-library
[Reglas de Hooks]: https://reactjs.org/docs/hooks-rules.html
