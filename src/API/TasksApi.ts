import {instance} from "./TodolistApi";

export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
}

type GetTaskType = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}
export type PayLoadType = {
    title?: string
    status?: number
    description?: string
    priority?: number
    startDate?: string
    deadline?: string
    isDisabledTask?:boolean
}
export type TaskType = {
    id: string
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
    todoListId: string
    order: number
    addedDate: string
    isDisabledTask:boolean
}

export const tasksAPI = {
    createTasks(title: string, todolistId: string) {
        return instance.post<ResponseType<{item:TaskType}>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)

    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)

    },
    updateTask(taskId: string, payLoad: PayLoadType, todolistId: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`,
            {...payLoad})

    },

}