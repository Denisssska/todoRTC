import {FilterValuesType, PayLoadTodolistType, todolistAPI, TodolistsType} from "../../../API/TodolistApi";
import {StateAppType} from "../../../state/redux-store";
import {changeProcessAC, loadingErrorAC, setErrAC} from "../../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../components/ErrorSnackBar/HandleError";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState = {
    todolists: [] as Array<TodolistsType>
}
export const getTodolistsTC = createAsyncThunk('todolist/getTodolistTC', async (arg, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    thunkAPI.dispatch(changeStateAC())
    try {
        const data = await todolistAPI.getTodolists()
        if (data.data) {
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
            return {data: data.data}
        } else {
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC(data.request.error))
        }
    } catch (e) {
        thunkAPI.dispatch(loadingErrorAC({loading: true}))
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const removeTodolistTC = createAsyncThunk('todolist/removeTodolistTC', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    thunkAPI.dispatch(updateTodolistTC.fulfilled({todolistId, payLoad: {isDisabled: true}}, '', {
        todolistId,
        item: {isDisabled: true}
    }))
    try {
        const data = await todolistAPI.deleteTodolist(todolistId)
        if (data.data.resultCode === 0) {
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
            return {todolistId}
        } else {
            handleServerAppError(data.data, thunkAPI.dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const addTodolistsTC = createAsyncThunk('todolist/addTodolistsTC', async (title: string, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    try {
        const data = await todolistAPI.createTodolist(title)
        if (data.data.resultCode === 0) {
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
            return {todolist: data.data.data.item}
        } else {
            handleServerAppError(data.data, thunkAPI.dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const updateTodolistTC = createAsyncThunk('todolist/updateTodolistTC', async (arg: { todolistId: string, item: PayLoadTodolistType }, thunkAPI) => {
    const state = thunkAPI.getState() as StateAppType
    const newTodolist = state.todolist.todolists.find(item => item.id === arg.todolistId)
    if (!newTodolist) return
    let payLoad = {
        title: newTodolist.title,
        isDisabledTask: newTodolist.isDisabled,
        filter: newTodolist.filter as FilterValuesType, ...arg.item
    } as PayLoadTodolistType
    thunkAPI.dispatch(changeProcessAC({process: true}))
    try {
        const data = await todolistAPI.updateTodolist(arg.todolistId, payLoad)
        if (data.data.resultCode === 0) {
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
            return {todolistId: arg.todolistId, payLoad: arg.item}
        } else {
            handleServerAppError(data.data, thunkAPI.dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})

const slice = createSlice({
    name: 'todolist',
    initialState: initialState,
    reducers: {
        changeStateAC(state) {
            state.todolists = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodolistsTC.fulfilled, (state, action) => {
            action.payload && state.todolists.push(...action.payload.data)
        });
        builder.addCase(addTodolistsTC.fulfilled, (state, action) => {
            action.payload && state.todolists.push(action.payload.todolist)
        });
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.todolists.findIndex(item => action.payload && item.id === action.payload.todolistId)
            if (index > -1) {
                state.todolists.splice(index, 1)
            }
        });
        builder.addCase(updateTodolistTC.fulfilled, (state, action) => {
            const index = state.todolists.findIndex(item => action.payload && item.id === action.payload.todolistId)
            if (index > -1) {
                state.todolists[index] = {...state.todolists[index], ...action.payload && action.payload.payLoad}
            }
        });
    }
})
export const {changeStateAC} = slice.actions
export const todolistReducer = slice.reducer

