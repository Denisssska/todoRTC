import {todolistReducer, TodolistsActionType} from "../features/todolistList/todolist/todolistReducer";
import {taskReducer, TasksActionsType} from "../features/todolistList/todolist/task/TaskReducer";
import { combineReducers} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer} from "../app/AppReducer";
import {/*ActionsAuthType,*/ authReducer} from "../features/Auth/Auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

export type StateAppType = ReturnType<typeof reducersBox>
const reducersBox = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
    application:appReducer,
    auth:authReducer
})
const store =configureStore({
    reducer:reducersBox,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})
export default store
export type AppActionsType = TodolistsActionType | TasksActionsType
export type AppDispatch = ThunkDispatch<RootState,
    unknown,
    AppActionsType>

export type RootState = ReturnType<typeof reducersBox>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    AppActionsType>