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
