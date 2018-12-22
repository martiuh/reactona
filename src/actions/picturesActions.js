export const FETCH_PICS = 'FETCH_PICS'

export const fetchPics = pics => dispatch => dispatch({
  type: FETCH_PICS,
  payload: pics
})
