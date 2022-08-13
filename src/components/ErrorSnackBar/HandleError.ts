// generic function

import {ResponseType} from "../../API/TodolistApi";
import {loadingErrorAC, setErrAC} from "../../app/AppReducer";
import {Dispatch} from "redux";


export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch) => {
    console.dir(data.messages[0])
    if (data.messages.length) {
        dispatch(loadingErrorAC({loading: true}))
        dispatch(setErrAC({error: data.messages[0]}))
    }
    dispatch(setErrAC({error: data.messages[0]}))
}


export const handleServerNetworkError = (error: any, dispatch: Dispatch) => {
    console.dir(error)
    dispatch(loadingErrorAC({loading: true}))
    dispatch(setErrAC({error: error.message ? error.message : 'error some'}))
}
