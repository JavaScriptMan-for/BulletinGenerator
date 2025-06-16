import { FC } from 'react';
import "../sass/redactor_page.scss"
import "../sass/button.scss"

import { useAppDispatch } from '@slices-my/store';

import { useForm, FormProvider } from 'react-hook-form'; 
import { GeneralInfo, GeneralInfoToServer } from '@types-my/Form.type';

import DateComponent from "@components/form_parts/Date" 
import CadastralNumber from '@components/form_parts/CadastralNumber';
import Area from '@components/form_parts/Area';
import Address from '@components/form_parts/Address';
import NumberQuest from '@components/form_parts/NumberQuest';

import { setGeneralInfo } from '@slices-my/general_info.slice';
import { Links } from "@enums/Links.enum"
import { useNavigate } from 'react-router-dom';

const RedactorPage: FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const methods = useForm<GeneralInfo>({ mode: 'onBlur' });
    const { handleSubmit, formState: {isValid} } = methods;

    const onSubmit = (data: GeneralInfo) => {
        console.log(data);
        const date_izn: string = `${data.day} ${data.mouth} ${data.year} года`
        const cadastral_number_izn: string = `${data.cadastral_number_1}:${data.cadastral_number_2}:${data.cadastral_number_3}:${data.cadastral_number_y}`
        const area_izn: string = `${data.area} ${data.unit_of_measurement}`

        const generalInfo: GeneralInfoToServer = {
          date: date_izn,
          cadastral_number: cadastral_number_izn,
          area: area_izn,
          address: data.address,
          number_questions: data.number_questions
        }
        dispatch(setGeneralInfo(generalInfo))

        navigation(Links.VARIOUS)
      }

    return (
        <>
            <h1>Конструктор</h1>
            <FormProvider {...methods}> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Введите общую для всех информацию</h2>
                    <DateComponent />
                    <CadastralNumber />
                    <Area />
                    <Address />
                    <NumberQuest />
                    <button disabled={!isValid} className='next' type="submit">Далее</button>
                </form>
            </FormProvider>
        </>
    )
}

export default RedactorPage;