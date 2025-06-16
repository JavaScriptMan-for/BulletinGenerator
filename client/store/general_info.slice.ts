import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GeneralInfoToServer } from '@types-my/Form.type';
import { GeneralInfoState } from '@types-my/Redux.type';


const initialState: GeneralInfoState = {
    general_info: {
        date: '',
        cadastral_number: '',
        area: '',
        address: '',
        number_questions: 1
    }
};

const generalInfoSlice = createSlice({
    name: 'general_info',
    initialState,
    reducers: {
        setGeneralInfo(state: GeneralInfoState, action: PayloadAction<GeneralInfoToServer>) {
            state.general_info = action.payload
        }
    },
});

export const { setGeneralInfo } = generalInfoSlice.actions;

export default generalInfoSlice.reducer;

