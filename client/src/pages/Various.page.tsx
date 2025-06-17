import { FC } from 'react';
import Form from '@components/Form';

import { useSelector } from 'react-redux';
import { RootState } from '@slices-my/store';
import { useAppDispatch } from '@slices-my/store';
import { setIsClick } from '@slices-my/various_info.slice';

const Various_page:FC = () => {
    const dispatch = useAppDispatch()
    const general_info = useSelector((state: RootState) => state.general_info.general_info)

  return (
    <>
       <Form />
       <button type="button" onClick={(e) => {
  e.preventDefault();
  dispatch(setIsClick());
}}>Кнопка</button>
    </>
  )
}

export default Various_page;