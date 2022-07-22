import React from 'react';
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import { todolistReducer} from "../features/todolistList/todolist/todolistReducer";
import {taskReducer} from "../features/todolistList/todolist/task/TaskReducer";
import {v1} from "uuid";
import {TaskType} from "../API/TasksApi";
import {TodolistsType} from "../API/TodolistApi";

export const todolistId1 = v1()
const rootReducer = combineReducers({
    todolists:todolistReducer,
    tasks:taskReducer
})

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all',addedDate:'12 02',order:12}
    ] as TodolistsType[],
    tasks: [
        {
            id: 'one', title: 'task1', description: 'a',
            status: 1, priority: 2, startDate: '12',
            deadline: '14', todoListId: todolistId1, order: 5, addedDate: '55'
        },
        {
            id: 'two', title: 'task2', description: 'a',
            status: 2, priority: 2, startDate: '12',
            deadline: '14', todoListId:todolistId1, order: 5, addedDate: '55'
        }
    ] as Array<TaskType>
}
export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as any)
export const ReduxStoreProviderDecorator = (storyFn:()=>React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
};

