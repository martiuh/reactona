import React from 'react';
import universal from 'react-universal-component';
import { connect } from 'react-redux';

import '../css/normalize';
import Navbar from '../components/Navbar';
import Loading from '../components/Loading';

const universalOptions = {
  minDelay: 600,
  loading: Loading
};

const UniversalComponent = universal(
  props => import(`./${props.page}`),
  universalOptions
);

const App = ({ page }) => (
  <Navbar>
    <UniversalComponent page={page} />
  </Navbar>
);

const mapState = ({ page }) => ({ page });

export default connect(mapState)(App);
