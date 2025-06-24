import { FC, ReactNode, useState, useEffect, useCallback } from 'react';
import Form from '@components/Form';
import "../sass/various_page.scss"
import { useNavigate } from 'react-router-dom';
import { Links } from '@enums/Links.enum';

import { useSelector } from 'react-redux';
import { RootState } from '@slices-my/store';
import { useAppDispatch } from '@slices-my/store';
import { setIsClick } from '@slices-my/various_info.slice';

const Various_page: FC = () => {

  const [isValidForms, setIsValidForms] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const general_info = useSelector((state: RootState) => state.general_info.general_info)
  const isValid = useSelector((state: RootState) => state.various_info.isValid)

  const [forms, setForms] = useState<FormProps[]>([]);
  const [yesLimit, setYesLimit] = useState<boolean>(true);

  interface FormProps {
    id: number,
  }

  const deleteForm = useCallback((id: number) => {
    setForms(prevForms => prevForms.filter((form) => form.id !== id));
  }, []);

  useEffect(() => {
    const change_limit = general_info.number_questions * forms.length;

    if(change_limit > 300) {
      setYesLimit(false)
    } else {
      setYesLimit(true)
    }
  }, [forms.length])

  useEffect(() => {
    const defaultForms = () => {
      const newForms: FormProps[] = [];
      for (let i = 1; i < 6; i++) {
        newForms.push({ id: i });
      }
      setForms(newForms);
    }
    defaultForms()
  }, [])

  useEffect(() => {
    if (isValid.length > 0) {
      const allFormsValid = isValid.every(item => item === true);
      setIsValidForms(allFormsValid);
    } else {
      setIsValidForms(false); 
    }
  }, [isValid]);


  const addForm = () => {
    const newId = forms.length + 1; // Генерируем уникальный id для новой формы
    setForms(prevForms => [...prevForms, { id: newId }]);
  }




  return (
    <>
      <h2>Информация о каждом участнике</h2>

      {
        forms.map((form, index) =>
          <Form key={form.id} id={form.id} num={index + 1} onDelete={deleteForm} />
        )
      }
      <div className="center">
        <button className='send_various' onClick={() => navigate(Links.REDACT)}>Назад</button>
        <button disabled={!yesLimit} onClick={addForm} className='send_various'>+ участник</button>
        <button className='send_various next' type="button" onClick={(e) => {
          e.preventDefault();
          dispatch(setIsClick());
        }}>Далее</button>
      </div>
    </>
  )
}

export default Various_page;