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
