import { NOT_FOUND } from 'redux-first-router'
import { pageReducer } from '../routesMap'

export default function page(state = 'HOME', action = {}) {
  const { type, payload } = action

  const components = {
    ...pageReducer,
    [NOT_FOUND]: 'NotFound'
  }

  return components[type] || state
}
