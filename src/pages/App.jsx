import React from 'react'
import universal from 'react-universal-component'
import { connect } from 'react-redux'

import Navbar from '../components/Navbar'

const UniversalComponent = universal(props => import(`./${props.page}`), {
  minDelay: 5000
})

const App = ({ page }) => (
  <Navbar>
    <UniversalComponent page={page} />
  </Navbar>
)

const mapState = ({ page }) => ({ page })
const mapDispatch = {}

export default connect(mapState, mapDispatch)(App)
