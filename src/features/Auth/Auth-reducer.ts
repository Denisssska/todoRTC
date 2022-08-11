import {authApi, AuthDataType, AuthPayload} from "../../API/AuthApi";

import {changeInitializedAC, changeProcessAC, loadingErrorAC, setErrAC} from "../../app/AppReducer";
import {handleServerNetworkError} from "../../components/ErrorSnackBar/HandleError";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WritableDraft} from "immer/dist/internal";

const initialState = {
    data: {} as AuthDataType,
    isAuth: false
}
export const getDataTC = createAsyncThunk('auth/getDataTC', (arg, thunkAPI) => {
    authApi.getMeAuth()
        .then(data => {
                console.log(data.data.data)
                if (data.data.resultCode === 0) {
                    thunkAPI.dispatch(getMeAuthAC({data: data.data.data, isAuth: true}))
                }
                thunkAPI.dispatch(changeInitializedAC({initialized: true}))
            }
        )
        .catch(e => {
                handleServerNetworkError(e, thunkAPI.dispatch)
            }
        )
        .finally(() => thunkAPI.dispatch(changeProcessAC({process: false})))
})
export const loginTC = createAsyncThunk('auth/loginTC', (payLoad: AuthPayload, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    authApi.loginUser(payLoad)
        .then(data => {
                if (data.data.resultCode === 0) {
                    thunkAPI.dispatch(getDataTC())
                    thunkAPI.dispatch(loadingErrorAC({loading: true}))
                    thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, thunkAPI.dispatch)
            }
        )
        .finally(() => thunkAPI.dispatch(changeProcessAC({process: false})))
})
export const logOutTC = createAsyncThunk('auth/logOutTC', (arg, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    authApi.logOut()
        .then(data => {
                if (data.data.resultCode === 0) {
                    thunkAPI.dispatch(getMeAuthAC({data: {login: null, email: null, id: null}, isAuth: false}))
                    thunkAPI.dispatch(loadingErrorAC({loading: true}))
                    thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, thunkAPI.dispatch)
            }
        )
        .finally(() => thunkAPI.dispatch(changeProcessAC({process: false})))
})
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        getMeAuthAC(state, action: PayloadAction<{ data: WritableDraft<AuthDataType>, isAuth: boolean }>) {
            state.isAuth = action.payload.isAuth
            state.data = action.payload.data
        },
        changeAuthAC(state, action: PayloadAction<{ isAuth: boolean }>) {
            state.isAuth = action.payload.isAuth
        }
    }
})
export const authReducer = slice.reducer
export const {getMeAuthAC, changeAuthAC} = slice.actions


// export const getDataTC_ = () => (dispatch: Dispatch) => {
//     authApi.getMeAuth()
//         .then(data => {
//                 console.log(data.data.data)
//                 if (data.data.resultCode === 0) {
//                     dispatch(getMeAuthAC({data: data.data.data, isAuth: true}))
//                 }
//                 dispatch(changeInitializedAC({initialized: true}))
//             }
//         )
//         .catch(e => {
//                 handleServerNetworkError(e, dispatch)
//             }
//         )
//         .finally(() => dispatch(changeProcessAC({process: false})))
// }
// export const loginTC = (payLoad: AuthPayload) => (dispatch: Dispatch) => {
//     dispatch(changeProcessAC({process: true}))
//     authApi.loginUser(payLoad)
//         .then(data => {
//                 if (data.data.resultCode === 0) {
//                     // @ts-ignore
//                     dispatch(getDataTC())
//                     dispatch(loadingErrorAC({loading: true}))
//                     dispatch(setErrAC({error: 'Successfully'}))
//                 }
//             }
//         )
//         .catch(e => {
//                 handleServerNetworkError(e, dispatch)
//             }
//         )
//         .finally(() => dispatch(changeProcessAC({process: false})))
// }
// export const logOutTC = () => (dispatch: Dispatch) => {
//     dispatch(changeProcessAC({process: true}))
//     authApi.logOut()
//         .then(data => {
//                 if (data.data.resultCode === 0) {
//                     dispatch(getMeAuthAC({data: {login: null, email: null, id: null}, isAuth: false}))
//                     dispatch(loadingErrorAC({loading: true}))
//                     dispatch(setErrAC({error: 'Successfully'}))
//                 }
//             }
//         )
//         .catch(e => {
//                 handleServerNetworkError(e, dispatch)
//             }
//         )
//         .finally(() => dispatch(changeProcessAC({process: false})))
// }