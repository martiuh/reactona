import axios from 'axios'

import { fetchPics } from '../actions'

export default async function HomeThunk(dispatch, getState) {
  const { pictures } = getState()
  if (pictures.length > 0) {
    const { data } = await axios.get('http://localost:3000/api/photos')
    dispatch(fetchPics(data))
  }
}
