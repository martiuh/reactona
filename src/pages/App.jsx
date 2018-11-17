import React from 'react'
import universal from 'react-universal-component'
import { connect } from 'react-redux'

import Navbar from '../components/Navbar'

const universalOptions = {}

const UniversalComponent = universal(props => import(`./${props.page}`), universalOptions)

const App = ({ page }) => (
  <Navbar>
    <UniversalComponent page={page} />
  </Navbar>
)

const mapState = ({ page }) => ({ page })

export default connect(mapState)(App)
