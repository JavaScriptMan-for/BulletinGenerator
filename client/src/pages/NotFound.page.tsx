import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Links } from '@enums/Links.enum';

import "../sass/not-found.scss";

const NotFoundPage:FC = () => {
  return (
    <div id='not-found'>
       <h1 id='code_error'>404</h1>
       <code>Не удалось найти данную страницу</code>
       <Link to={Links.MAIN_PAGE}>Вернуться на главную</Link>
    </div>
  )
}

export default NotFoundPage;