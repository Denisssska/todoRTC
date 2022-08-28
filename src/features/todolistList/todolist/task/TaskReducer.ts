import {PayLoadType, tasksAPI, TaskType} from "../../../../API/TasksApi";
import {StateAppType} from "../../../../state/redux-store";
import {changeProcessAC, loadingErrorAC, setErrAC} from "../../../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../components/ErrorSnackBar/HandleError";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getTaskTC = createAsyncThunk('task/getTaskTC', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    try {
        const data = await tasksAPI.getTasks(todolistId)
        if (data.data.items) {
            return {data: data.data.items}
        } else {
            alert(data.data.error)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const addTaskTC = createAsyncThunk('task/addTaskTC', async (arg: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    try {
        const res = await tasksAPI.createTasks(arg.title, arg.todolistId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
            return {item: res.data.data.item, todolistId: arg.todolistId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const removeTaskTC = createAsyncThunk('task/removeTaskTC', async (arg: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    thunkAPI.dispatch(updateTaskTC.fulfilled({
        taskId: arg.taskId,
        payLoad: {isDisabledTask: true},
        todolistId: arg.todolistId
    }, '', {
        taskId: arg.taskId,
        item: {isDisabledTask: true},
        todolistId: arg.todolistId
    }))
    try {
        const res = await tasksAPI.deleteTasks(arg.todolistId, arg.taskId)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(loadingErrorAC({loading: true}))
            thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
            return {id: arg.taskId, todolistId: arg.todolistId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
export const updateTaskTC = createAsyncThunk('task/updateTaskTC', async (arg: { taskId: string, item: PayLoadType, todolistId: string }, thunkAPI) => {
    const state = thunkAPI.getState() as StateAppType
    const newTask = state.tasks.tasks.find(item => item.id === arg.taskId)
    if (!newTask) return
    let payLoad = {
        title: newTask.title,
        status: newTask.status,
        description: newTask.description,
        priority: newTask.priority,
        startDate: newTask.startDate,
        deadline: newTask.deadline,
        isDisabledTask: newTask.isDisabledTask, ...arg.item
    } as PayLoadType
    thunkAPI.dispatch(updateTaskTC.fulfilled({
        taskId: arg.taskId,
        payLoad: {isDisabledTask: true},
        todolistId: arg.todolistId
    }, '', {taskId: arg.taskId, todolistId: arg.todolistId, item: {isDisabledTask: true}}))
    thunkAPI.dispatch(changeProcessAC({process: true}))
    try {
        const res = await tasksAPI.updateTask(arg.taskId, payLoad, arg.todolistId)
        if (res.data.resultCode === 0) {
            return {taskId: arg.taskId, payLoad, todolistId: arg.todolistId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            thunkAPI.dispatch(updateTaskTC.fulfilled({
                taskId: arg.taskId,
                payLoad: {isDisabledTask: false},
                todolistId: arg.todolistId
            }, '', {taskId: arg.taskId, item: {isDisabledTask: false}, todolistId: arg.todolistId}))
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch)
    } finally {
        thunkAPI.dispatch(changeProcessAC({process: false}))
    }
})
const slice = createSlice({
    name: 'task',
    initialState: {tasks: [] as Array<TaskType>},
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTaskTC.fulfilled, (state, action) => {
            action.payload && state.tasks.push(...action.payload.data)
        });
        builder.addCase(changeProcessAC, (state) => {
            state.tasks = []
        });
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            action.payload && state.tasks.push(action.payload.item)
        });
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const index = state.tasks.findIndex(item => action.payload && item.id === action.payload.id)
            if (index > -1) {
                state.tasks.splice(index, 1)
            }
        });
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const index = state.tasks.findIndex(item => action.payload && item.id === action.payload.taskId)
            if (index > -1) {
                state.tasks[index] = {...state.tasks[index], ...action.payload && action.payload.payLoad}
            }
        });
    }
})
export const taskReducer = slice.reducer
