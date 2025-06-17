import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

interface FractionProps {}

const Fraction: FC<FractionProps> = () => {
    const { register, formState: { errors } } = useFormContext<{ fraction: "в доле" | 'га', isRepresentative: boolean }>();

    return (
        <div className='pole' id="fio">
            <div className='part'>
                <label>Доля в праве:</label>
                <label className='label-fraction'>
                    <input
                        type="radio"
                        value="в доле"
                        {...register("fraction")}
                    />
                    в доле
                </label>

                <label className='label-fraction'>
                    <input
                        type="radio"
                        value="га"
                        {...register("fraction")}
                    />
                    га
                </label>
                     <label style={{marginLeft:"40px"}}>Представитель:</label>
                <label className='label-fraction'>
                    <input
                        
                        type="radio"
                        value="true"
                        {...register('isRepresentative')}
                    />
                    есть
                </label>

                <label className='label-fraction'>
                    <input
                        type="radio"
                        value="false"
                        {...register('isRepresentative')}
                    />
                    нет
                </label>
            </div>
            {errors.fraction && <p>{errors.fraction.message}</p>}  {/* Вывод ошибок (если required) */}
        </div>
    )
}

export default Fraction;