import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VariousInfoState } from '@types-my/Redux.type';
import { VariousInfo, VariousInfoToServer } from '@types-my/Form.type';

const initialState: VariousInfoState = {
    various_info_to_server: [],
    isClick: 0,
    various_info: [],
    isValid: []
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
    },
    addIsValid(state: VariousInfoState, action: PayloadAction<boolean>) {
        state.isValid.push(action.payload)
    },
    addVariousInfoToServer(state: VariousInfoState, action: PayloadAction<VariousInfoToServer[]>) {
        // state.various_info_to_server.push(...action.payload)
        state.various_info_to_server = action.payload
    }
    },
});

export const { addVariousInfo, setIsClick, addIsValid, addVariousInfoToServer } = clientSlice.actions;

export default clientSlice.reducer;

