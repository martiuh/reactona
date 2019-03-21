import { FETCH_PICS } from '../actions';

export default function pictures(state = [], action = {}) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PICS:
      return [...state, payload];
    default:
      return state;
  }
}
