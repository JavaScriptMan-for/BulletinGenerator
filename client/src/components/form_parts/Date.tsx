import { FC, useEffect } from 'react';
import "../../sass/redactor_page.scss"
import "../../sass/button.scss"

import { useFormContext } from 'react-hook-form';
import { DatePartType } from "@types-my/Form.type"

import OptionsMouthComponent from '@components/OptionsMouth';

const Date:FC = () => {

  const { register, watch, setValue, formState: { errors } } = useFormContext<DatePartType>();

  
  const day_value = watch('day');
  const year_value = watch('year');

  useEffect(()=> {
    if(day_value && String(day_value).length > 2) {
      const count = Number(day_value.toString().slice(0,2))
      setValue('day', count, {shouldValidate: false})
    }
    if(day_value && day_value > 31) {
      const count = Number(day_value.toString().slice(0, -1))
      setValue('day', count, {shouldValidate: false})
    }
      if(year_value && String(year_value).length > 4) {
      const count = Number(year_value.toString().slice(0,4))
      setValue('year', count, {shouldValidate: false})
    }
  }, [day_value, year_value, setValue])

  return (

      <div id="date">
        <div className="part_row_inputs">
        <label htmlFor="day_input">Число</label>
      <input 
        placeholder='1'
        id='day_input'
        type="number"
        {...register('day', {
         required: "Это поле обязательное",
          max: {
            value: 31,
            message: "Максимальное число дней в месяце - 31"
          },
          min: {
            value: 1, 
            message: "Минимальное число дней в месяце - 1"
          }
        })}
       />
       <label htmlFor="mouth_input">Месяц</label>
       <select id='mouth_input' {...register('mouth', {
          required: "Это поле обязательное",
       })}>
        <OptionsMouthComponent />
       </select>
       <label htmlFor="year_input">Год</label>  
       <input
       placeholder='2020'
       id='year_input'
       type="number" 
        {...register('year', {
       required: "Это поле обязательное",
          pattern: {
            value: /^\d{4}$/,
            message: "В году должно быть 4 цифры"
          }
        })}
       />
       </div>
       <div className='validate_errors'>
            <p className="validate_error">{errors.day && errors.day.message}</p>
            <p className="validate_error">{errors.mouth && errors.mouth.message}</p>
         <p className="validate_error">{errors.year && errors.year.message}</p>
       </div>
     </div>
  )
}

export default Date;