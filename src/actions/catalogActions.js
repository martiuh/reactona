export const ADD_PRODUCTS = 'ADD_PRODUCTS'

export default function addProducts(prds) {
  return function (dispatch, getState) {
    const { products } = getState()
    return dispatch({
      type: ADD_PRODUCTS,
      payload: prds
    })
  }
}
