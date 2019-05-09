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
