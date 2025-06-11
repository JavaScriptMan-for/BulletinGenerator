import { type FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'

import MainPage from '@pages/Main.page'
import SettingsPage from '@pages/Settings.page'

const App:FC = () => {


  return (
    <>
        <Routes>
           <Route path='/' element={<Layout />}>
              <Route index path='/' element={<MainPage />}/>
              <Route path='settings' element={<SettingsPage />}/>
           </Route>

           
        </Routes>
    </>
  )
}

export default App
