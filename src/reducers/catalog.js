import a from '../actions'

export default function catalog(state = [], action = {}) {
  const { type, payload } = action
  switch (type) {
    case a.ADD_PRODUCT:
      return [...state, payload]
    default:
      return state
  }
}
