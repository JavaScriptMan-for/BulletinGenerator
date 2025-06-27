import { FractionAndFIO } from '@types-my/Form.type';
import { FC, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import ShareSize from "@components/form_parts/Share_size"

const FIO: FC = () => {
    const { register, formState: { errors }, watch } = useFormContext<FractionAndFIO>();

    const isR = watch('isRepresentative')
    const [isRes, setIsRes] = useState<string>('true')

    const fraction = watch('fraction')
    const [fractionState, setFractionState] = useState<'в доле' | 'га'>('в доле')

   useEffect(() => {
    console.log(isR)
  setIsRes(String(isR));
}, [isR]);

    useEffect(() => {
        setFractionState(fraction)
    }, [fraction])
    return (
        <>
            <div className='pole' id="fio">
                <div className='part'>
                    <div className="line">
                        <div>
                            <label htmlFor="fio_input">ФИО участника</label>
                            <input
                                type="text"
                                id="fio_input"
                                placeholder='Иванов Иван Иванович'
                                {...register('name', {
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
                        <div>
                            {isRes == 'true' && <label htmlFor="name_res">ФИО Представителя</label>}
                            {isRes == 'true' && <input
                                type="text"
                                id="name_res"
                                placeholder='Иванов Иван Иванович'
                                {...register('name_representative', {
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
                            }
                        </div>
                    </div>
                </div>
                {
                    errors.name &&
                    <div className="validate_errors">
                        <p className="validate_error">{errors.name.message}</p>
                    </div>
                }
            </div>
            <div className='pole' id="fraction">
                <div className='part'>
                    <div>
                        <label>Доля в праве:</label>
                        <label className='label-fraction'>
                            <input
                                type="radio"
                                value="в доле"
                                {...register("fraction")}
                                defaultChecked
                            />
                            <span className="text_radio">дробь</span>
                        </label>
                        <label id='ga_input' className='label-fraction'>
                            <input
                                type="radio"
                                value="га"
                                {...register("fraction")}
                            />
                            <span className='text_radio'>га</span>
                        </label>
                    </div>
                    <div>
                        <label style={{ marginLeft: "40px" }}>Представитель:</label>
                        <label className='label-fraction'>
                            <input
                                defaultChecked
                                type="radio"
                                value="true"
                                {...register('isRepresentative')}
                            />
                            <span className='text_radio'>есть</span>
                        </label>
                        <label className='label-fraction'>
                            <input
                                type="radio"
                                value="false"
                                {...register('isRepresentative')}
                            />
                            <span className='text_radio'>нет</span>
                        </label>
                    </div>
                </div>
                {errors.fraction && <p>{errors.fraction.message}</p>}  {/* Вывод ошибок (если required) */}
            </div>
            <ShareSize fraction={fractionState} />
        </>
    )
}

export default FIO;