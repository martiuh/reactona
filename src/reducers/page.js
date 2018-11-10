import { NOT_FOUND } from 'redux-first-router'

export default function page(state = 'HOME', action = {}) {
  const { type, payload } = action

  const components = {
    'HOME': 'Home',
    'PRODUCTS': 'Products',
    [NOT_FOUND]: 'NotFound'
  }

  return components[type] || state
}