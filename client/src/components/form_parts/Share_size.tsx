import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { Share } from '@types-my/Form.type';

interface Props {
    fraction: 'в доле' | 'га'
}

const FunctionalComponent:FC<Props> = ({ fraction }) => {
      const { register, formState: { errors }, watch } = useFormContext<Share>();
  return (
    <div id='share'>
        <div className="line">
            <label>Размер доли в праве</label>
            <input
            className='share_size'
            placeholder={fraction === 'в доле' ? '144' : '10'}
            type="number"
            {...register('share_size_ch', {
                required: "Это поле обязательное",
                min: {
                    value: 0,
                    message: "Слишком малое значение"
                }
            })} 
            />
            {   fraction === "в доле" &&
                <>
                

            <span>/</span>
            <input
            type="number" 
            className='share_size'
            placeholder='256'
            {...register('share_size_z', {
                required: "Это поле обязательное",
                min: {
                    value: 1,
                    message: "Слишком малый знаменатель"
                }
            })}
            />
         </>
        }
            <label>Размер доли с общим знаменателеи</label>
            <input
            className='share_size'
             type="text"
             placeholder='1'
             {...register('share_size_with_common_ch', {
                required: "Это поле обязательное",
                min: {
                    value: 1,
                    message: "Слишком малый числитель"
                }
             })}
             />
             <span>/</span>
            <input
            className='share_size'
             type="text"
             placeholder='2'
             {...register('share_size_with_common_z', {
                required: "Это поле обязательное",
                min: {
                    value: 1,
                    message: "Слишком малый знаменатель"
                }
             })}
             />
        </div> 
        <div className="validate_errors">
            <p className="validate_error">{errors.share_size_ch && errors.share_size_ch.message}</p>
            <p className="validate_error">{errors.share_size_z && errors.share_size_z.message}</p>
            <p className="validate_error">{errors.share_size_with_common_ch && errors.share_size_with_common_ch.message}</p>
            <p className="validate_error">{errors.share_size_with_common_z && errors.share_size_with_common_z.message}</p>
        </div>
    </div>
  )
}

export default FunctionalComponent;