import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainStateTypes } from '@types-my/Redux.type';


const initialState: MainStateTypes = {
   
};

const clientSlice = createSlice({
    name: 'main',
    initialState,
    reducers: {
    
    
    },
});

export const {  } = clientSlice.actions;

export default clientSlice.reducer;

