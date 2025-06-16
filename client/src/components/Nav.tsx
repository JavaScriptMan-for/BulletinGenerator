import { FC } from 'react';
import "../sass/nav.scss"
import logo from '/img/favicon_2.ico'
import { NavLink } from 'react-router-dom';

import { Links } from "@enums/Links.enum"

const NavComponent: FC = () => {
  return (
    <nav>
      <NavLink id='logo' to={Links.MAIN_PAGE}><img src={logo} alt="logo" /></NavLink>
      <div id="a">
        <NavLink to={Links.MAIN_PAGE}>Главная</NavLink>
        <NavLink to={Links.REDACT}>Конструктор бюллетеней</NavLink>
      </div>
    </nav>
  )
}

export default NavComponent;