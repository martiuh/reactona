import React from 'react'
import { hot } from 'react-hot-loader'
import universal from 'react-universal-component'

const UniversalComponent = universal(props => import(`${props.page}`))

class App extends React.Component {
 state = {
   miNombre: true
 }

 changeNombre = () => {
  this.setState(p => ({
    miNombre: !p.miNombre
  }))
 }

  render() {
    const { miNombre } = this.state

    return (
      <React.Fragment>
        <div onClick={this.changeNombre}>
        {miNombre ? <UniversalComponent page='./MiNombre' /> : <UniversalComponent page='./pages/Saludador' />}
        </div>
      <h1>Esta es la mejora App del Mundo!!!</h1>
    </React.Fragment>
    )
  }
}

export default hot(module)(App)
