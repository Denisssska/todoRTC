import {authApi, AuthDataType, AuthPayload, securityApi} from "../../API/AuthApi";

import {changeInitializedAC, changeProcessAC, loadingErrorAC, setErrAC} from "../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../components/ErrorSnackBar/HandleError";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {FieldErrorType} from "../../API/TodolistApi";
import {changeStateAC} from "../todolistList/todolist/todolistReducer";

const initialState = {
    data: {} as AuthDataType,
    isAuth: false
}
export const getDataTC = createAsyncThunk('auth/getDataTC', async (arg, thunkAPI) => {
    try {
        thunkAPI.dispatch(changeInitializedAC({initialized: true}))
        const data = await authApi.getMeAuth()

        if (data.data.resultCode === 0) {
            return {data: data.data.data as AuthDataType, isAuth: true}
        } else {
            handleServerAppError(data.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: data.data.messages})
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const loginTC = createAsyncThunk<{}, AuthPayload, { rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> } }>('auth/loginTC', async (payLoad: AuthPayload, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    try {
        const data = await authApi.loginUser(payLoad)
        if (data.data.resultCode === 0) {
            thunkAPI.dispatch(getDataTC())
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
        } else if (data.data.resultCode === 10) {
            thunkAPI.dispatch(getCaptchaTC())
        } else if (data.data.resultCode === 1) {
            handleServerAppError(data.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({errors: data.data.messages})
        }
    } catch (err) {
        // @ts-ignore
        const e: AxiosError = err

        handleServerNetworkError(err, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({errors: [e.message], fieldsErrors: undefined})
    } finally {
        thunkAPI.dispatch(changeInitializedAC({initialized: true}))
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const logOutTC = createAsyncThunk('auth/logOutTC', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    thunkAPI.dispatch(changeStateAC())
    try {
        const data = await authApi.logOut()
        if (data.data.resultCode === 0) {
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
            return {data: {login: null, email: null, id: null, captcha: null}, isAuth: false}
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const getCaptchaTC = createAsyncThunk('auth/getCaptchaTC', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    try {
        const data = await securityApi.getCaptcha()
        console.log(data)
        thunkAPI.dispatch(loadingErrorAC({loading: true}))
        thunkAPI.dispatch(setErrAC({error: 'Enter captcha please'}))
        return {data: {captcha: data.data.url}, isAuth: false}

    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDataTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuth = action.payload.isAuth
                state.data = action.payload.data
            }
        });
        builder.addCase(logOutTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuth = action.payload.isAuth
                state.data = action.payload.data
            }
        });
        builder.addCase(getCaptchaTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuth = action.payload.isAuth
                state.data.captcha = action.payload.data.captcha
            }
        });
    }
})
export const authReducer = slice.reducer

