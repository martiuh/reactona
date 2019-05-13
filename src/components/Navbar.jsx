import React from 'react';
import Link, { NavLink } from 'redux-first-router-link';

import { navbar, navbarItem, isActive } from './Navbar.scss';

const NavAnchor = props => (
  <NavLink {...props} className={navbarItem} activeClassName={isActive} exact />
);

export default function Navbar({ children }) {
  return (
    <React.Fragment>
      <nav className={navbar}>
        <Link to="/" className={navbarItem}>
          Inicio
        </Link>
        <NavAnchor to="/productos">
          Productos
        </NavAnchor>
        <NavAnchor to="/about">
          About
        </NavAnchor>
      </nav>
      {children}
    </React.Fragment>
  );
}
