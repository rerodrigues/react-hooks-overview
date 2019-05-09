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
