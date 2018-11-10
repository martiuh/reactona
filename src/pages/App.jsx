import React from 'react'
import universal from 'react-universal-component'
import { connect } from 'react-redux'

const UniversalComponent = universal(props => import(`./${props.page}`), {
  minDelay: 5000
})

const App = ({ page }) => <UniversalComponent page={page} />

const mapState = ({ page }) => ({ page })
const mapDispatch = {}

export default connect(mapState, mapDispatch)(App)
