import axios from "axios";

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
    addedDate: string
    order: number
    isDisabled: boolean
}
export type PayLoadTodolistType = {
    title?: string
    isDisabled?: boolean
    filter?: FilterValuesType
}
export type ResponseType<D = {}> = {
    data: D
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<string>
}
export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    headers: {
        "API-KEY": '4ecfeb70-7dff-4183-b8c3-af65f71d42cf'
    }
});


export const todolistAPI = {
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistsType }>>(`todo-lists`, {title: title})
            .then((res) => res)
    },
    getTodolists() {
        return instance.get<Array<TodolistsType>>(`todo-lists`)

    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
        // .then((res) => res.data)
    },
    updateTodolist(todolistId: string, payLoad: PayLoadTodolistType) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {...payLoad})
    }
}