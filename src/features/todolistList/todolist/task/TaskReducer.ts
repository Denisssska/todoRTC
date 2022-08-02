import {PayLoadType, tasksAPI, TaskType} from "../../../../API/TasksApi";
import {StateAppType} from "../../../../state/redux-store";
import {changeProcessAC, loadingErrorAC, setErrAC} from "../../../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../components/ErrorSnackBar/HandleError";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";


let initialTaskState = {tasks: [] as Array<TaskType>}

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

export const getTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeProcessAC({process: true}))
    tasksAPI.getTasks(todolistId)
        .then((data) => {
            if (data.data.items) {
                dispatch(getTaskAC({data: data.data.items}))
            } else {
                alert(data.data.error)
            }

        })
        .catch((e) => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(() => dispatch(changeProcessAC({process: false})))
}
export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(changeProcessAC({process: true}))
    tasksAPI.createTasks(title, todolistId)
        .then((items) => {
                if (items.data.resultCode === 0) {
                    dispatch(addTaskAC({item: items.data.data.item, todolistId}))
                    dispatch(loadingErrorAC({loading: true}))
                    dispatch(setErrAC({error: 'Successfully'}))
                } else {
                    handleServerAppError(items.data, dispatch)
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(() => dispatch(changeProcessAC({process: false})))
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(changeProcessAC({process: true}))
    dispatch(updateTaskAC({taskId, payLoad: {isDisabledTask: true}, todolistId}))
    tasksAPI.deleteTasks(todolistId, taskId)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC({id: taskId, todolistId}))
                    dispatch(loadingErrorAC({loading: true}))
                    dispatch(setErrAC({error: 'Successfully'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(() => dispatch(changeProcessAC({process: false})))
}

export const updateTaskTC = (taskId: string, item: PayLoadType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => StateAppType) => {
        const state = getState()
        const newTask = state.tasks.tasks.find(item => item.id === taskId)
        if (!newTask) return
        let payLoad = {
            title: newTask.title,
            status: newTask.status,
            description: newTask.description,
            priority: newTask.priority,
            startDate: newTask.startDate,
            deadline: newTask.deadline,
            isDisabledTask: newTask.isDisabledTask, ...item
        } as PayLoadType
        dispatch(updateTaskAC({taskId, payLoad: {isDisabledTask: true}, todolistId}))
        dispatch(changeProcessAC({process: true}))
        tasksAPI.updateTask(taskId, payLoad, todolistId)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({taskId, payLoad, todolistId}))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(updateTaskAC({taskId, payLoad: {isDisabledTask: false}, todolistId}))
                    }
                }
            )
            .catch(e => {
                    handleServerNetworkError(e, dispatch)
                }
            )
            .finally(() => dispatch(changeProcessAC({process: false})))
    }
