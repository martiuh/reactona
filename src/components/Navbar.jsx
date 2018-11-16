import React from 'react'
import Link from 'redux-first-router-link'

import { navbar, navbarItem } from './Navbar.scss'

export default function Navbar({ children }) {
  return (
    <React.Fragment>
      <nav className={navbar}>
        <Link to='/' className={navbarItem}>
          Home
        </Link>
        <Link to='/products' className={navbarItem}>
          Products
        </Link>
      </nav>
      {children}
    </React.Fragment>
  )
}