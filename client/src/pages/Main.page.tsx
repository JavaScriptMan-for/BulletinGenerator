import { FC } from 'react';
import '../sass/main_page.scss'
import "../sass/button.scss"


import BlockComponent from '@components/Block';

const MainPage:FC = () => {

  return (
    <>
    <main>
      <h1>Конструктор бюллетеней</h1>
      <BlockComponent width='1500px'>
        Конструктор бюллетеней - инструмент для генерации 
        большого количества бюллетеней, при этом 
        не затрачивая время на создания их вручную.
        Как пользоваться этим инструментом, смотрите ниже.
      </BlockComponent>
      <button id='main_button' type='button'>Смотреть ниже</button>     
    </main>
    <div id="info">

    </div>
      </>
  )
}

export default MainPage;