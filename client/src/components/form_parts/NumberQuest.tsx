import { FC, useEffect } from 'react';
import "../../sass/redactor_page.scss"
import "../../sass/button.scss"

import { useFormContext } from 'react-hook-form';
import { NumberQuestionPartType } from "@types-my/Form.type"

const NumberQuest:FC = () => {
  const { register, formState: { errors } } = useFormContext<NumberQuestionPartType>();

  return (
    <div id='number_quest'>
       <div className="part_row_inputs">
        <label htmlFor="number_quest">Количество вопросов дня</label>
      <input
      id='number_quest'
      placeholder='1'
       type="number"
       {...register('number_quest', {
        required: "Это поле обязательное",
        min: {
          value: 1,
          message: "Минимальное количество вопросов для - 1"
        },
        max: {
          value: 15,
          message: "Максимальное количество вопросов дня - 15"
        }
       })}
       />
       </div>
       <div className="validate_errors">
        
       </div>
    </div>
  )
}

export default NumberQuest;