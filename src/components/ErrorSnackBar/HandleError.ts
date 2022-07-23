// generic function

import {ResponseType} from "../../API/TodolistApi";
import {loadingErrorAC, setErrAC} from "../../app/AppReducer";
import {Dispatch} from "@reduxjs/toolkit";


export const handleServerAppError = (data: ResponseType, dispatch: Dispatch) => {
    console.dir(data.messages[0])
    if (data.messages.length) {
        dispatch(loadingErrorAC({loading: true}))
        dispatch(setErrAC({error: data.messages[0]}))
    }
    dispatch(setErrAC({error: data.messages[0]}))
}


export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    console.dir(error)
    dispatch(loadingErrorAC({loading: true}))
    dispatch(setErrAC({error: error.message ? error.message : 'error some'}))
}
