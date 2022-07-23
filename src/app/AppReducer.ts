import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    process: true,
    initializedApp: false
}
const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        loadingErrorAC(state, action: PayloadAction<{ loading: boolean }>) {
            state.loading = action.payload.loading
        },
        setErrAC(state, action: PayloadAction<{ error: string | null }>) {
            // @ts-ignore
            state.error = action.payload.error
        },
        changeProcessAC(state,action:PayloadAction<{process:boolean}>){
            state.process =action.payload.process
        },
        changeInitializedAC(state,action:PayloadAction<{initialized:boolean}>){
            state.initializedApp= action.payload.initialized
        }
    }
})
export const appReducer = slice.reducer
export const {loadingErrorAC,setErrAC,changeProcessAC,changeInitializedAC} = slice.actions

    
