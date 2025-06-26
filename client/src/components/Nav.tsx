import { FC } from 'react';
import "../sass/nav.scss"
import logo from '/img/favicon_2.ico'
import { NavLink } from 'react-router-dom';

import { Links } from "@enums/Links.enum"
import { useWindow } from '../hooks/useWindow.hook';

const NavComponent: FC = () => {

  const window_size = useWindow();

  return (
    <nav>
      <NavLink id='logo' to={Links.MAIN_PAGE}><img src={logo} alt="logo" /></NavLink>
      <div id="a">
        <NavLink to={Links.MAIN_PAGE}>Главная</NavLink>
        <NavLink to={Links.REDACT}>{window_size.width > 458 ? 'Конструктор бюллетеней' : 'Конструктор'}</NavLink>
      </div>
    </nav>
  )
}

export default NavComponent;