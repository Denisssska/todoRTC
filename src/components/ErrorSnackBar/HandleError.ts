// generic function
import {loadingErrorAC, setErrAC} from "../../app/AppReducer";
import {AppDispatch} from "../../state/redux-store";
import {ResponseType} from "../../API/TodolistApi";



export const handleServerAppError = (data: ResponseType, dispatch:AppDispatch) => {
    console.dir(data.messages[0])
    if (data.messages.length) {
        dispatch(loadingErrorAC(true))
        dispatch(setErrAC(data.messages[0]))
    }
    dispatch(setErrAC(data.messages[0]))
}


export const handleServerNetworkError = (error: {message: string},dispatch: AppDispatch) => {
    console.dir(error)
    dispatch(loadingErrorAC(true))
    dispatch(setErrAC(error.message?error.message:'error some'))
}
