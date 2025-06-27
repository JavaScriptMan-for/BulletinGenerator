import { FC, useEffect } from 'react';
import "../sass/nav.scss"
import logo from '/img/favicon_2.ico'
import { NavLink, useLocation } from 'react-router-dom';

import { Links } from "@enums/Links.enum"
import { useWindow } from '../hooks/useWindow.hook';

const NavComponent: FC = () => {
  const location = useLocation();
  const window_size = useWindow();

  useEffect(() => {
      if(location.pathname === Links.REDACT || location.pathname === Links.VARIOUS || location.pathname === Links.RESULT) {
        document.querySelector('#constructor_href')?.classList.add('active')
      }
  }, [location.pathname])

  return (
    <nav>
      <NavLink id='logo' to={Links.MAIN_PAGE}><img src={logo} alt="logo" /></NavLink>
      <div id="a">
        <NavLink to={Links.MAIN_PAGE}>Главная</NavLink>
        <NavLink id='constructor_href' to={Links.REDACT}>{window_size.width > 458 ? 'Конструктор бюллетеней' : 'Конструктор'}</NavLink>
      </div>
    </nav>
  )
}

export default NavComponent;