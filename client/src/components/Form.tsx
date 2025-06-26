import { FC, useEffect, useCallback } from 'react';
import "../sass/various_page.scss"

import { useAppDispatch } from '@slices-my/store';
import { addVariousInfo, addIsValid } from '@slices-my/various_info.slice';

import { useSelector } from 'react-redux';
import { RootState } from '@slices-my/store';

import { useNavigate } from 'react-router-dom';

import { useForm, FormProvider } from 'react-hook-form';
import { VariousInfo } from '@types-my/Form.type';
import { Links } from '@enums/Links.enum';

import FIO from '@components/form_parts/FIO';
import deleteIcon from '/img/delete.png'


interface Props {
    id: number,
    onDelete: (id: number) => void,
    num: number
}

const Form: FC<Props> = ({ id, onDelete, num }) => {

    const navigate = useNavigate()

    const general_info = useSelector((state: RootState) => state.general_info.general_info)
    const dispatch = useAppDispatch();
    const isClick = useSelector((state: RootState) => state.various_info.isClick);

    const methods = useForm<VariousInfo>({ mode: 'onBlur' });
    const { handleSubmit, formState: { isValid } } = methods;

    const onSubmit = useCallback((data: VariousInfo) => {
        dispatch(addVariousInfo(Array(data)));
        navigate(Links.RESULT)
    }, [dispatch]);



    useEffect(() => {
        if (isClick > 0) {
            dispatch(addIsValid(isValid))
            handleSubmit((data: VariousInfo) => onSubmit(data))();
        }
    }, [isClick, handleSubmit, onSubmit]);






    return (
        <>
            <span className='number_form'>
                #{num}
                <img onClick={() => onDelete(id)} className='delete_icon' width={36} src={deleteIcon} alt="Удалить участника" />
            </span>
            <FormProvider {...methods}>
                <form className='various'>
                    <FIO />
                </form>
            </FormProvider>
        </>
    );
};

export default Form;