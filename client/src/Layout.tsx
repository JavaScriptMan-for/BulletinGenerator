import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import NavComponent from '@components/Nav';

const Layout:FC = () => {
  return (
    <>
       <NavComponent />
       <Outlet />
    </>
  )
}

export default Layout;