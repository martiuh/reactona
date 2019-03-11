import { NOT_FOUND } from 'redux-first-router';

import clientStore from '../src/clientStore';

export default async function serverStore(req, res) {
  const initialState = {};
  const options = {
    initialEntries: req.path
  };

  const { store, thunk } = clientStore(initialState, options);

  let { location } = store.getState();

  await thunk(store);
  // eslint-disable-next-line prefer-destructuring
  location = store.getState().location;

  const status = location.type === NOT_FOUND ? 404 : 200;
  res.status(status);
  return store;
}
