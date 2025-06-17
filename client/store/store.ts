import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import generalInfoSlice from "@slices-my/general_info.slice"
import variousInfoSlice from "@slices-my/various_info.slice"


const store = configureStore({
  reducer: {
    general_info: generalInfoSlice,
    various_info: variousInfoSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export default store