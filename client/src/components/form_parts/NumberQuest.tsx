import { FC, useEffect } from 'react';
import "../../sass/redactor_page.scss"
import "../../sass/button.scss"

import { useFormContext } from 'react-hook-form';
import { NumberQuestionPartType } from "@types-my/Form.type"

const NumberQuest:FC = () => {
  const { register, formState: { errors } } = useFormContext<NumberQuestionPartType>();
  const ls = localStorage.getItem('number_quest') || ''
  return (
    <div id='number_quest'>
       <div className="part_row_inputs minus">
        <label className='number_quest_text' htmlFor="number_quest">Число вопросов повестки дня</label>
      <input
      id='number_quest_input'
      placeholder='1'
       type="number"
       defaultValue={ls}
       {...register('number_questions', {
        required: "Это поле обязательное",
        min: {
          value: 1,
          message: "Минимальное число вопросов для - 1"
        },
        max: {
          value: 15,
          message: "Максимальное число вопросов дня - 15"
        }
       })}
       />
       </div>
       <div className="validate_errors">
          <p className="validate_error number_quest_text">{errors.number_questions && errors.number_questions.message}</p>
       </div>
    </div>
  )
}

export default NumberQuest;