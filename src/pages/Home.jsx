import React from 'react';
import Helmet from 'react-helmet';
import universal from 'react-universal-component';
import { connect } from 'react-redux';

import { homeTitle } from '../css/Home';

function Home({ pictures }) {
  // Since it's highly probable to link an user to '/products', we prefetch the file
  if (!IS_SERVER) {
    universal(import('./Products')).preload();
  }

  const picLen = pictures.length;
  const picString = pictures.length === 1 ? 'picuture' : 'pictures';
  return (
    <main>
      <Helmet title="Welcome" />
      <h1 className={homeTitle}>Home.jsx!!</h1>
      <h3>{`${picLen} ${picString}`}</h3>
    </main>
  );
}

const mapState = ({ pictures }) => ({
  pictures
});

export default connect(
  mapState,
  null
)(Home);
