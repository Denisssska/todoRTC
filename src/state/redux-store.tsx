import {todolistReducer, TodolistsActionType} from "../features/todolistList/todolist/todolistReducer";
import {taskReducer, TasksActionsType} from "../features/todolistList/todolist/task/TaskReducer";
import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {appReducer, ErrorActionType} from "../app/AppReducer";
import {ActionsAuthType, authReducer} from "../features/Auth/Auth-reducer";

export type StateAppType = ReturnType<typeof reducersBox>
const reducersBox = combineReducers({
    todolist: todolistReducer,
    tasks: taskReducer,
    application:appReducer,
    auth:authReducer
})
let store = legacy_createStore(reducersBox, applyMiddleware(thunk))
// export type StoreType = typeof store;


export default store
export type AppActionsType = TodolistsActionType | TasksActionsType|ErrorActionType|ActionsAuthType
export type ThunkType = ThunkAction<void, StateAppType, unknown, AppActionsType>
// export type AppDispatch = typeof  store.dispatch
export type AppDispatch = ThunkDispatch<RootState,
    unknown,
    AppActionsType>

export type RootState = ReturnType<typeof reducersBox>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    AppActionsType>