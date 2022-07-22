 import {addTodolistAC, todolistReducer} from "../features/todolistList/todolist/todolistReducer";
// import {taskReducer} from "./TaskReducer";
// import {TaskType} from "../API/TasksApi";
//
//
// test('add todolist when task is added', () => {
//     const startTodolistState = {
//         todolists: [] as Array<TodolistsType>}
//     const startState ={tasks: [] as Array<TaskType>}
//     const action = addTodolistAC('new','tasks','www',12);
//     const endState = taskReducer(startState, action);
//     const endTodolistsState = todolistReducer(startTodolistState, action);
//     const keys = Object.keys(endState.tasks);
//
//     const idFromTask = keys[0];
//     const idFromTodolists = endTodolistsState.todolists[0].id;
//     expect(keys.length).toBe(0);
//     expect(idFromTask).toBe(action.id);
//     expect(idFromTodolists).toBe(action.id);
//     expect(endState).not.toBe(startState);
//     expect(endTodolistsState).not.toBe(startTodolistState);
// })
