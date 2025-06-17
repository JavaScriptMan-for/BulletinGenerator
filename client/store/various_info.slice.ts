import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VariousInfoState } from '@types-my/Redux.type';
import { VariousInfo } from '@types-my/Form.type';

const initialState: VariousInfoState = {
    isClick: 0,
    various_info: [],
};

const clientSlice = createSlice({
    name: 'various_info',
    initialState,
    reducers: {
    addVariousInfo(state, action: PayloadAction<VariousInfo[]>) {
        state.various_info.push(...action.payload)
    },
    setIsClick(state: VariousInfoState) {
            state.isClick += 1
    }   
    },
});

export const { addVariousInfo, setIsClick } = clientSlice.actions;

export default clientSlice.reducer;

