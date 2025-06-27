import { FC, useMemo } from 'react';
import "../sass/redactor_page.scss"
import "../sass/button.scss"

import { useAppDispatch } from '@slices-my/store';

import { useForm, FormProvider } from 'react-hook-form'; 
import { GeneralInfo, GeneralInfoToServer } from '@types-my/Form.type';

import DateComponent from "@components/form_parts/Date" 
import CadastralNumber from '@components/form_parts/CadastralNumber';
import Area from '@components/form_parts/Area';
import Address from '@components/form_parts/Address';
import IsShareWithCommon from '@components/form_parts/isShareWithCommon';
import NumberQuest from '@components/form_parts/NumberQuest';

import { setGeneralInfo } from '@slices-my/general_info.slice';
import { Links } from "@enums/Links.enum"
import { useNavigate } from 'react-router-dom';
import { useUnloadWarning } from '../hooks/useAlertUpload.hook';

const RedactorPage: FC = () => {
    useUnloadWarning(true)

    const dispatch = useAppDispatch();
    const navigation = useNavigate();

  const ls = localStorage.getItem('isShareWithCommon') || 'false'

    const methods = useForm<GeneralInfo>({ mode: 'onBlur', defaultValues: {
      isShareWithCommon: ls
    } });
    const { handleSubmit, reset, formState: {isValid}, watch } = methods;

    const save = (data: GeneralInfo) => {
        localStorage.setItem('day', String(data.day))
        localStorage.setItem('mouth', String(data.mouth))
        localStorage.setItem('year', String(data.year))
        localStorage.setItem('c_1', String(data.cadastral_number_1))
        localStorage.setItem('c_2', String(data.cadastral_number_2))
        localStorage.setItem('c_3', String(data.cadastral_number_3))
        localStorage.setItem('c_y', String(data.cadastral_number_y))
        localStorage.setItem('area', String(data.area))
        localStorage.setItem('address', String(data.address));
        localStorage.setItem('isShareWithCommon', String(data.isShareWithCommon))
        localStorage.setItem('number_quest', String(data.number_questions))
    }

    
  const watchedValues = watch(); // Получаем значения всех полей

  const isFormEmpty = useMemo(() => {
    // Проверяем, являются ли все значения полей пустыми
    return Object.values(watchedValues).every(value => !value);
  }, [watchedValues]);

    const onSubmit = (data: GeneralInfo) => {
        console.log(data);

        save(data)

        console.log(data.isShareWithCommon)

        const date_izn: string = `${data.day} ${data.mouth} ${data.year} года`
        const cadastral_number_izn: string = `${data.cadastral_number_1}:${data.cadastral_number_2}:${data.cadastral_number_3}:${data.cadastral_number_y}`
        const area_izn: string = `${data.area} кв. м`
        const n_q_izn: number | '____' = data.number_questions;
        const is_share_size_with_common_izn: boolean | string = data.isShareWithCommon

        const generalInfo: GeneralInfoToServer = {
          date: date_izn,
          cadastral_number: cadastral_number_izn,
          area: area_izn,
          address: data.address,
          number_questions: n_q_izn,
          isShareWithCommon: is_share_size_with_common_izn
        }
        console.log(generalInfo)
        dispatch(setGeneralInfo(generalInfo))

        navigation(Links.VARIOUS)
      }

      const ResetValues = () => {
        reset();
        localStorage.removeItem('day');
        localStorage.removeItem('mouth');
        localStorage.removeItem('year');
        localStorage.removeItem('c_1');
        localStorage.removeItem('c_2');
        localStorage.removeItem('c_3');
        localStorage.removeItem('c_y');
        localStorage.removeItem('area');
        localStorage.removeItem('address');
        localStorage.removeItem('isShareWithCommon')
        localStorage.removeItem('number_quest');
      }

    return (
        <>
            <h1>Конструктор</h1>
            <FormProvider {...methods}> 
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h2>Информация об общем собрании</h2>
                    <DateComponent />
                    <CadastralNumber />
                    <Area />
                    <Address />
                    <IsShareWithCommon />
                    <NumberQuest />
                    <div className="line">
                    <button className='general_butt' onClick={ResetValues} disabled={isFormEmpty} >Сбросить все поля</button>
                    <button disabled={!isValid} className='next general_butt' type="submit">Далее</button>
                    </div>

                </form>
            </FormProvider>
        </>
    )
}

export default RedactorPage;