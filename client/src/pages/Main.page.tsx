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
        Конструктор бюллетеней - ваш верный помощник в создании бюллетеней для голосования на общих собраниях. <br />
        P.S. Ни в коем случае не пользуйтесь им, если Вы не цените свое время!
      </BlockComponent>
      <button id='main_button' type='button'>Смотреть ниже</button>     
    </main>
    <div id="info">

    </div>
      </>
  )
}

export default MainPage;