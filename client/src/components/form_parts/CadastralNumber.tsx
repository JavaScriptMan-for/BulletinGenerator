import { FC, useEffect } from 'react';
import "../../sass/redactor_page.scss"
import "../../sass/button.scss"

import { useFormContext } from 'react-hook-form';
import { CadastralNumberPartType } from "@types-my/Form.type"


const CadastralNumber:FC = () => {
 const { register, watch, setValue, formState: { errors } } = useFormContext<CadastralNumberPartType>();

const c_1 = watch('cadastral_number_1');
const c_2 = watch('cadastral_number_2');
const c_3 = watch('cadastral_number_3');
const c_y = watch('cadastral_number_y');

useEffect(()=> {
    if(c_1 && String(c_1).length > 2) {
        const count = Number(c_1.toString().slice(0,2))
        setValue('cadastral_number_1', count)
    }
       if(c_2 && String(c_2).length > 2) {
        const count = Number(c_2.toString().slice(0,2))
        setValue('cadastral_number_2', count)
    }
        if(c_3 && String(c_3).length > 7) {
        const count = Number(c_3.toString().slice(0,7))
        setValue('cadastral_number_3', count)
    }
        if(c_y && String(c_y).length > 5) {
        const count = Number(c_y.toString().slice(0,5))
        setValue('cadastral_number_y', count)
    }
}, [c_1, c_2, c_3, c_y, setValue])
 
  return (
    <div id='cadastral_number'>
       <div className="part_row_inputs">
        <label>Кадастровый номер</label>
            <input
            placeholder='XX'
            id='c_1'
            type="number"
            {...register('cadastral_number_1', {
              required: "Это поле обязательное",
                min: {
                    value: 10,
                    message: "Некорректное значение первого поля"
                }
            })}
             />
            <span className='double_t'>:</span> 


            <input
            id='c_2'
            placeholder='XX'
            type="number" 
            {...register('cadastral_number_2', {
                    required: "Это поле обязательное",
                  min: {
                    value: 10,
                    message: "Некорректное значение второго поля"
                }
            })}
              />
            <span className='double_t'>:</span>


            <input
            placeholder='XXXXXXX'
            id="c_3"
            type="number"
            {...register('cadastral_number_3', {
                required: "Это поле обязательное",
                  min: {
                    value: 0,
                    message: "Некорректное значение третьего поля"
                }
            })}
            />
             <span className='double_t'>:</span>


            <input
            placeholder='X'
            id='c_y'
            type="number"
            {...register('cadastral_number_y', {
                 required: "Это поле обязательное",
                  min: {
                    value: 1,
                    message: "Некорректное значение последнего поля"
                }
            })}
            />
       </div>
       <div className="validate_errors">
            <p className='validate_error'>{errors.cadastral_number_1 && errors.cadastral_number_1.message}</p>
            <p className='validate_error'>{errors.cadastral_number_2 && errors.cadastral_number_2.message}</p>
            <p className='validate_error'>{errors.cadastral_number_3 && errors.cadastral_number_3.message}</p>
            <p className='validate_error'>{errors.cadastral_number_y && errors.cadastral_number_y.message}</p>
       </div>
    </div>
  )
}

export default CadastralNumber;