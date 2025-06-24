import { FC } from 'react';
import '../sass/main_page.scss'
import "../sass/button.scss"
import { useNavigate } from 'react-router-dom';
import { Links } from '@enums/Links.enum';

import BlockComponent from '@components/Block';

const MainPage:FC = () => {

  const navigate = useNavigate();

  return (
    <>
    <main>
      <h1 id='main_h'>Конструктор бюллетеней</h1>
      <BlockComponent width='1500px'>
        Конструктор бюллетеней - ваш верный помощник в создании бюллетеней для голосования на общих собраниях. <br />
        P.S. Ни в коем случае не пользуйтесь им, если Вы не цените свое время!
      </BlockComponent>
      <button onClick={() => navigate(Links.REDACT)} id='main_button' type='button'>Сгенерировать</button>     
    </main>
      </>
  )
}

export default MainPage;