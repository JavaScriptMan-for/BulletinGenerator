import { FC, useEffect, useCallback } from 'react';
import "../sass/various_page.scss"

import { useAppDispatch } from '@slices-my/store';
import { addVariousInfo } from '@slices-my/various_info.slice';

import { useSelector } from 'react-redux';
import { RootState } from '@slices-my/store';

import { useForm, FormProvider } from 'react-hook-form';
import { VariousInfo } from '@types-my/Form.type';

import FIO from '@components/form_parts/FIO';
import Fraction from '@components/form_parts/Fraction';

const Form: FC = () => {
    const dispatch = useAppDispatch();
    const isClick = useSelector((state: RootState) => state.various_info.isClick);

    const methods = useForm<VariousInfo>({ mode: 'onBlur' });
    const { handleSubmit, formState: { isValid } } = methods;

    const onSubmit = useCallback((data: VariousInfo) => {
        console.log(data);
        dispatch(addVariousInfo(Array(data)));
    }, [dispatch]); 

    useEffect(() => {
        if (isClick > 0) {
            alert(1)
            handleSubmit((data: VariousInfo) => onSubmit(data))(); 
        }
    }, [isClick, handleSubmit, onSubmit]); 
    return (
        <>
            <FormProvider {...methods}>
                <form > 
                    <h2>Информация о каждом участнике</h2>
                    <FIO />
                    <Fraction />
                </form>
            </FormProvider>
        </>
    );
};

export default Form;