import {addTodolistAC, removeTodolistAC} from "../todolistReducer";
import {PayLoadType, tasksAPI, TaskType} from "../../../../API/TasksApi";
import {AppActionsType, AppThunk, StateAppType} from "../../../../state/redux-store";
import {changeProcessAC, loadingErrorAC, setErrAC} from "../../../../app/AppReducer";
import {handleServerAppError, handleServerNetworkError} from "../../../../components/ErrorSnackBar/HandleError";
import {createSlice, Dispatch, PayloadAction} from "@reduxjs/toolkit";

const REMOVE_TASK = 'remove task';
const ADD_TASK = "add task";
const GET_TASK = "GET_TASK";
const UPDATE_TASK = 'UPDATE_TASK';

export type InitialTaskStateType = typeof initialTaskState

let initialTaskState = {tasks: [] as Array<TaskType>}
const slice = createSlice({
    name:'task',
    initialState:initialTaskState,
    reducers:{
        removeTaskAC(state,action:PayloadAction<{id:string,todolistId:string}>){
             // state.tasks.map(item=>item.id) = action.payload.id
        },
        getTaskAC(state,action:PayloadAction<{data:TaskType[]}>){
            state.tasks= action.payload.data
        }
    }
})
export type TasksActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof getTaskAC>


export const removeTaskAC = (id: string, todolistId: string) => ({type: 'remove task', id, todolistId}) as const
export const getTaskAC = (data: Array<TaskType>) => ({type: 'GET_TASK', data}) as const
export const addTaskAC = (item: TaskType, todolistId: string) => ({type: 'add task', item, todolistId}) as const
export const updateTaskAC = (taskId: string, payLoad: PayLoadType, todolistId: string) => ({
    type: "UPDATE_TASK",
    taskId,
    payLoad,
    todolistId
}) as const

export const taskReducer = (state: InitialTaskStateType = initialTaskState, action: AppActionsType): InitialTaskStateType => {
    switch (action.type) {
        case GET_TASK: {
            return {...state, tasks: [...state.tasks, ...action.data]}
        }
        case  REMOVE_TASK: {
            return {...state, tasks: state.tasks.filter((item) => item.id !== action.id)}
        }
        case ADD_TASK: {
            return {...state, tasks: [{...action.item, isDisabledTask: false}, ...state.tasks]}
        }
        case UPDATE_TASK: {
            return {
                ...state, tasks: state.tasks.map(item => item.id === action.taskId ?
                    {...item, ...action.payLoad} : item)
            }
        }
        default:
            return state
    }
}

export const getTaskTC = (todolistId: string) => (dispatch:Dispatch) => {
    dispatch(changeProcessAC({process:true}))
    tasksAPI.getTasks(todolistId)
        .then((data) => {
            if (data.data.items) {
                dispatch(getTaskAC(data.data.items))
            } else {
                alert(data.data.error)
            }

        })
        .catch((e) => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(()=>dispatch(changeProcessAC({process:false})))
}
export const addTaskTC = (title: string, todolistId: string)=> (dispatch:Dispatch) => {
    dispatch(changeProcessAC({process:true}))
    tasksAPI.createTasks(title, todolistId)
        .then((items) => {
                if (items.data.resultCode === 0) {
                    dispatch(addTaskAC(items.data.data.item, todolistId))
                    dispatch(loadingErrorAC({loading:true}))
                    dispatch(setErrAC({error:'Successfully'}))
                } else {
                    handleServerAppError(items.data, dispatch)
                }
            }
        )
        .catch(e => {
            handleServerNetworkError(e, dispatch)
        }
        )
        .finally(()=>dispatch(changeProcessAC({process:false})))
}
export const removeTaskTC = (todolistId: string, taskId: string) => (dispatch:Dispatch) => {
    dispatch(changeProcessAC({process:true}))
    dispatch(updateTaskAC(taskId, {isDisabledTask: true}, todolistId))
    tasksAPI.deleteTasks(todolistId, taskId)
        .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                    dispatch(loadingErrorAC({loading:true}))
                    dispatch(setErrAC({error:'Successfully'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(()=>dispatch(changeProcessAC({process:false})))
}

export const updateTaskTC = (taskId: string, item: PayLoadType, todolistId: string) =>
    (dispatch:Dispatch, getState: () => StateAppType) => {
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
        dispatch(updateTaskAC(taskId, {isDisabledTask: true}, todolistId))
        dispatch(changeProcessAC({process:true}))
        tasksAPI.updateTask(taskId, payLoad, todolistId)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC(taskId, payLoad, todolistId))
                    } else {
                        handleServerAppError(res.data, dispatch)
                        dispatch(updateTaskAC(taskId, {isDisabledTask: false}, todolistId))
                    }
                }
            )
            .catch(e => {
                    handleServerNetworkError(e, dispatch)
                }
            )
            .finally(()=>dispatch(changeProcessAC({process:false})))
    }
