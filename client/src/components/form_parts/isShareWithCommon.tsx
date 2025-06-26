import { isShareWithCommonPartType } from '@types-my/Form.type';
import { FC, useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';


const IsShareWithCommon:FC = () => {
    const { register, formState: { errors }, watch } = useFormContext<isShareWithCommonPartType>();



    return (
        <div className='part_row_inputs minus'>
         <label>Нужна ли доля с общим знаменателем?</label>
                <label className='label-fraction'>
                    <input
                        className='no'
                        type="radio"
                        value="true"
                        {...register('isShareWithCommon')}
                    />
                    да
                </label>

                <label className='label-fraction'>
                    <input
                    className='no'
                        type="radio"
                        value="false"
                        {...register('isShareWithCommon')}
                    />
                    нет
                </label>
        </div>
    )
}

export default IsShareWithCommon