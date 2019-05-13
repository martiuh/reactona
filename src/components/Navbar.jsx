import React from 'react';
import Link from 'redux-first-router-link';

import { navbar, navbarItem } from './Navbar.scss';

export default function Navbar({ children }) {
  return (
    <React.Fragment>
      <nav className={navbar}>
        <Link to="/" className={navbarItem}>
          Inicio
        </Link>
        <Link to="/pictures" className={navbarItem}>
          Productos
        </Link>
        <Link to="/about" className={navbarItem}>
          About
        </Link>
      </nav>
      {children}
    </React.Fragment>
  );
}
