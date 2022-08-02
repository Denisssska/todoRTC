import {PayLoadTodolistType, todolistAPI, TodolistsType} from "../../../API/TodolistApi";
import {StateAppType} from "../../../state/redux-store";
import {changeProcessAC, loadingErrorAC, setErrAC} from "../../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../components/ErrorSnackBar/HandleError";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    todolists: [] as Array<TodolistsType>
}
const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        getTodolistAC(state, action: PayloadAction<{ data: Array<TodolistsType> }>) {
            state.todolists.push(...action.payload.data)
        },
        addTodolistAC(state, action: PayloadAction<{ todolist: TodolistsType }>) {
            state.todolists.push(action.payload.todolist)
        },
        updateTodolistAC(state, action: PayloadAction<{ todolistId: string, payLoad: PayLoadTodolistType }>) {
            const index = state.todolists.findIndex(item => item.id === action.payload.todolistId)
            if (index > -1) {
                state.todolists[index] = {...state.todolists[index], ...action.payload.payLoad}
            }
        },
        removeTodolistAC(state, action: PayloadAction<{ todolistId: string }>) {
            const index = state.todolists.findIndex(item => item.id === action.payload.todolistId)
            if (index > -1) {
                state.todolists.splice(index, 1)
            }
        }
    }
})

export const todolistReducer = slice.reducer
export const {getTodolistAC, removeTodolistAC, updateTodolistAC, addTodolistAC} = slice.actions


export const getTodolistsTC = () => (dispatch: Dispatch) => {
    dispatch(changeProcessAC({process: true}))
    todolistAPI.getTodolists()
        .then((data) => {
                if (data.data) {
                    dispatch(getTodolistAC({data: data.data}))
                    dispatch(loadingErrorAC({loading: true}))
                    dispatch(setErrAC({error: 'Successfully'}))
                } else {
                    dispatch(loadingErrorAC({loading: true}))
                    dispatch(setErrAC(data.request.error))
                }
            }
        )
        .catch((e) => {
                dispatch(loadingErrorAC({loading: true}))
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(() => dispatch(changeProcessAC({process: false})))
}
export const addTodolistsTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(changeProcessAC({process: true}))
    todolistAPI.createTodolist(title)
        .then((data) => {
                console.log(data)
                if (data.data.resultCode === 0) {
                    data.data.data.item && dispatch(addTodolistAC({todolist: data.data.data.item}))
                    dispatch(loadingErrorAC({loading: true}))
                    dispatch(setErrAC({error: 'Successfully'}))
                } else {
                    handleServerAppError(data.data, dispatch)
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(() => dispatch(changeProcessAC({process: false})))
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeProcessAC({process: true}))
    dispatch(updateTodolistAC({todolistId, payLoad: {isDisabled: true}}))
    todolistAPI.deleteTodolist(todolistId)
        .then((data) => {
                if (data.data.resultCode === 0) {
                    dispatch(removeTodolistAC({todolistId}))
                    dispatch(loadingErrorAC({loading: true}))
                    dispatch(setErrAC({error: 'Successfully'}))
                } else {
                    handleServerAppError(data.data, dispatch)
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(() => dispatch(changeProcessAC({process: false})))
}
export const updateTodolistTC = (todolistId: string, item: PayLoadTodolistType) =>
    (dispatch: Dispatch, getState: () => StateAppType) => {
        const state = getState()
        const newTodolist = state.todolist.todolists.find(item => item.id === todolistId)
        if (!newTodolist) return
        let payLoad = {
            title: newTodolist.title,
            isDisabledTask: newTodolist.isDisabled,
            filter: newTodolist.filter, ...item
        } as PayLoadTodolistType
        dispatch(changeProcessAC({process: true}))
        todolistAPI.updateTodolist(todolistId, payLoad).then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(updateTodolistAC({todolistId, payLoad}))
                    dispatch(loadingErrorAC({loading: true}))
                    dispatch(setErrAC({error: 'Successfully'}))
                } else {
                    handleServerAppError(data.data, dispatch)
                }
            }
        ).catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
            .finally(() => dispatch(changeProcessAC({process: false})))
    }

