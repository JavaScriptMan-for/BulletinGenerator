import { FC, useEffect } from 'react';
import "../../sass/redactor_page.scss"
import "../../sass/button.scss"

import { useFormContext } from 'react-hook-form';
import { AreaPartType } from "@types-my/Form.type"


const Area:FC = () => {
const { register, watch, setValue, formState: { errors } } = useFormContext<AreaPartType>();
const ls = localStorage.getItem('area') || ''
    const area_value = watch('area');
    
    useEffect(()=> {
        if(area_value && String(area_value).length > 9) {
             const count = Number(area_value.toString().slice(0, -1))
            setValue('area', count)
        }
    }, [setValue, area_value])

  return (
    <div id='area'>
       <div className="part_row_inputs">
        <label htmlFor="area_input">Площадь</label>
        <input
        defaultValue={ls}
        id='area_input'
        placeholder='10000'
        type="number"
        {...register('area', {
            required: "Это поле обязательное",
            min: {
                value: 1,
                message: "Некорректная площадь"
            },
            max: {
              value: 9999999999,
              message: "Некорректная площадь"
            }
        })}
        />
        <p id='unit'>кв. м</p>
       </div>
       <div className="validate_errors">
        <p className="validate_error">{errors.area && errors.area.message}</p>
       </div>
    </div>
  )
}

export default Area;