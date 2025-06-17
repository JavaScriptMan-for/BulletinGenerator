
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

const FIO:FC = () => {
    const { register, formState: { errors } } = useFormContext<{fio: string}>();


  return (
    <div className='pole' id="fio">
    <div className='part'>
    <label htmlFor="fio_input">ФИО</label>
    <input
    
    type="text"
    id="fio_input"
    placeholder='Иванов Иван Иванович'
    {...register('fio', {
        required: "Это поле обязательное",
        maxLength: {
            value: 60,
            message: "Слишком длинное ФИО"
        },
        minLength: {
            value: 2,
            message: "Слишком короткое ФИО"
        } 
    })}
     />
    </div>
    {
        errors.fio &&
    <div className="validate_errors">
     <p className="validate_error">{errors.fio.message}</p>
    </div>
    }
     </div>
  )
}

export default FIO;