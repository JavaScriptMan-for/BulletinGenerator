import { FC, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Layout from './Layout'


import MainPage from '@pages/Main.page'
import ResultPage from '@pages/Result.page'
import RedactorPage from '@pages/Redactor.page'
import VariousPage from '@pages/Various.page'
import NotFoundPage from '@pages/NotFound.page'

const App:FC = () => {

  const location = useLocation();

  useEffect(()=> {
    const l = location.pathname;

    if(l === '/') document.title = "Главная страница"
    if(l === '/redact') document.title = "Общая информация"
    if(l === '/various') document.title = "Информация для всех участников"
    if(l === '/result') document.title = 'Результат'
  }, 
  [location.pathname])

  return (
    <>
        <Routes>
           <Route path='/' element={<Layout />}>
              <Route index path='/' element={<MainPage />}/>
              <Route path='result' element={<ResultPage />}/>
              <Route path='redact' element={<RedactorPage />}/>
              <Route path='various' element={<VariousPage />} />
              <Route path='*' element={<NotFoundPage />} />
           </Route>

           
        </Routes>
    </>
  )
}

export default App
