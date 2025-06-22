
import { FC, useEffect } from 'react';
import "../../sass/redactor_page.scss"
import "../../sass/button.scss"

import { useFormContext } from 'react-hook-form';
import { AddressPartType } from "@types-my/Form.type"

const Address:FC = () => {
    const { register, formState: { errors } } = useFormContext<AddressPartType>();

    const ls = localStorage.getItem('address') || ''
  return (
    <div id='address'>
       <div className="part_row_inputs">
        <label htmlFor="address">Адрес</label>
        <textarea
        defaultValue={ls}
        placeholder='Белгородская область, город Белгород, проспект Славы 31/2'
        id='address'
        {...register("address", {
            required: "Это поле обязательное",
            minLength: {
                value: 4,
                message: "Слишком короткий адрес"
            },
            maxLength: {
                value: 146,
                message: "Слишком длинный адрес"
            }
        })}
        />
       </div>
       <div className="validate_errors">
            <p className="validate_error">{errors.address && errors.address.message}</p>
       </div>
    </div>
  )
}

export default Address;