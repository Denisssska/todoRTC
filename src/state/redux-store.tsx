import {todolistReducer} from "../features/todolistList/todolist/todolistReducer";
import {taskReducer} from "../features/todolistList/todolist/task/TaskReducer";
import {combineReducers} from "redux";
import thunk from "redux-thunk";
import {appReducer} from "../app/AppReducer";
import {authReducer} from "../features/Auth/Auth-reducer";
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

export type AppDispatch = typeof store.dispatch

export default store