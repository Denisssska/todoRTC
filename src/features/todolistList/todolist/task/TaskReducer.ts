import {PayLoadType, tasksAPI, TaskType} from "../../../../API/TasksApi";
import {StateAppType} from "../../../../state/redux-store";
import {changeProcessAC, loadingErrorAC, setErrAC} from "../../../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../components/ErrorSnackBar/HandleError";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


let initialTaskState = {tasks: [] as Array<TaskType>}
export const getTaskTC = createAsyncThunk('task/getTaskTC', (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    tasksAPI.getTasks(todolistId)
        .then((data) => {
            if (data.data.items) {
                thunkAPI.dispatch(getTaskAC({data: data.data.items}))
            } else {
                alert(data.data.error)
            }

        })
        .catch((e) => {
                handleServerNetworkError(e, thunkAPI.dispatch)
            }
        )
        .finally(() => thunkAPI.dispatch(changeProcessAC({process: false})))
})
export const addTaskTC = createAsyncThunk('task/addTaskTC', (arg: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    tasksAPI.createTasks(arg.title, arg.todolistId)
        .then((items) => {
                if (items.data.resultCode === 0) {
                    thunkAPI.dispatch(addTaskAC({item: items.data.data.item, todolistId: arg.todolistId}))
                    thunkAPI.dispatch(loadingErrorAC({loading: true}))
                    thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
                } else {
                    handleServerAppError(items.data, thunkAPI.dispatch)
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, thunkAPI.dispatch)
            }
        )
        .finally(() => thunkAPI.dispatch(changeProcessAC({process: false})))
})
export const removeTaskTC = createAsyncThunk('task/removeTaskTC', (arg: { todolistId: string, taskId: string }, thunkAPI) => {
    thunkAPI.dispatch(changeProcessAC({process: true}))
    thunkAPI.dispatch(updateTaskAC({taskId: arg.taskId, payLoad: {isDisabledTask: true}, todolistId: arg.todolistId}))
    tasksAPI.deleteTasks(arg.todolistId, arg.taskId)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    thunkAPI.dispatch(removeTaskAC({id: arg.taskId, todolistId: arg.todolistId}))
                    thunkAPI.dispatch(loadingErrorAC({loading: true}))
                    thunkAPI.dispatch(setErrAC({error: 'Successfully'}))
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, thunkAPI.dispatch)
            }
        )
        .finally(() => thunkAPI.dispatch(changeProcessAC({process: false})))
})
export const updateTaskTC = createAsyncThunk('task/updateTaskTC', (arg: { taskId: string, item: PayLoadType, todolistId: string }, thunkAPI) => {
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
    thunkAPI.dispatch(updateTaskAC({taskId: arg.taskId, payLoad: {isDisabledTask: true}, todolistId: arg.todolistId}))
    thunkAPI.dispatch(changeProcessAC({process: true}))
    tasksAPI.updateTask(arg.taskId, payLoad, arg.todolistId)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    thunkAPI.dispatch(updateTaskAC({taskId: arg.taskId, payLoad, todolistId: arg.todolistId}))
                } else {
                    handleServerAppError(res.data, thunkAPI.dispatch)
                    thunkAPI.dispatch(updateTaskAC({
                        taskId: arg.taskId,
                        payLoad: {isDisabledTask: false},
                        todolistId: arg.todolistId
                    }))
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, thunkAPI.dispatch)
            }
        )
        .finally(() => thunkAPI.dispatch(changeProcessAC({process: false})))
})
const slice = createSlice({
    name: 'task',
    initialState: initialTaskState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ id: string, todolistId: string }>) {
            const index = state.tasks.findIndex(item => item.id === action.payload.id)
            if (index > -1) {
                state.tasks.splice(index, 1)
            }
        },
        getTaskAC(state, action: PayloadAction<{ data: TaskType[] }>) {
            state.tasks.push(...action.payload.data)
        },
        addTaskAC(state, action: PayloadAction<{ item: TaskType, todolistId: string }>) {
            state.tasks.push(action.payload.item)
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, payLoad: PayLoadType, todolistId: string }>) {
            const index = state.tasks.findIndex(item => item.id === action.payload.taskId)
            if (index > -1) {
                state.tasks[index] = {...state.tasks[index], ...action.payload.payLoad}
            }
        }
    }
})
export const taskReducer = slice.reducer
export const {removeTaskAC, getTaskAC, addTaskAC, updateTaskAC} = slice.actions

// export const updateTaskTC = (taskId: string, item: PayLoadType, todolistId: string) =>
//     (dispatch: Dispatch, getState: () => StateAppType) => {
//         const state = getState()
//         const newTask = state.tasks.tasks.find(item => item.id === taskId)
//         if (!newTask) return
//         let payLoad = {
//             title: newTask.title,
//             status: newTask.status,
//             description: newTask.description,
//             priority: newTask.priority,
//             startDate: newTask.startDate,
//             deadline: newTask.deadline,
//             isDisabledTask: newTask.isDisabledTask, ...item
//         } as PayLoadType
//         dispatch(updateTaskAC({taskId, payLoad: {isDisabledTask: true}, todolistId}))
//         dispatch(changeProcessAC({process: true}))
//         tasksAPI.updateTask(taskId, payLoad, todolistId)
//             .then((res) => {
//                     if (res.data.resultCode === 0) {
//                         dispatch(updateTaskAC({taskId, payLoad, todolistId}))
//                     } else {
//                         handleServerAppError(res.data, dispatch)
//                         dispatch(updateTaskAC({taskId, payLoad: {isDisabledTask: false}, todolistId}))
//                     }
//                 }
//             )
//             .catch(e => {
//                     handleServerNetworkError(e, dispatch)
//                 }
//             )
//             .finally(() => dispatch(changeProcessAC({process: false})))
//     }
