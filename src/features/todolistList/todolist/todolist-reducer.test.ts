 import {v1} from "uuid";
//
// import {
//     addTodolistAC, changeTodolistFilterAC,
//     changeTodolistTitleAC, FilterValuesType,
//     removeTodolistAC,
//     todolistReducer, TodolistsType
// } from "./todolistReducer";
//
// let todolistId1 = v1();
// let todolistId2 = v1();
// const startState ={todolists: [
//     {id: todolistId1, title: 'What to learn', filter: 'all',addedDate:'15',order:1},
//     {id: todolistId2, title: 'What to buy', filter: 'all',addedDate:'13',order:2},
// ] as Array<TodolistsType>}
// test('remove todolist', () => {
//     const endState = todolistReducer(startState, removeTodolistAC(todolistId1))
//     expect(endState.todolists.length).toBe(1)
//     expect(endState.todolists[0].id).toBe(todolistId2)
//     expect(endState).not.toBe(startState)
//
// })
//
// test('add todolist', () => {
//     const newTitle = 'newTodolistTitle'
//     const serverId= '1';
//     const addedDate= '2';
//       const  order= 3;
//     const endState = todolistReducer(startState,addTodolistAC(newTitle,serverId, addedDate, order))
//     expect(endState.todolists.length).toBe(3)
//     expect(endState.todolists[0].title).toBe(newTitle)
//     expect(endState.todolists[2].filter).toBe('all')
//     expect(endState).not.toBe(startState)
//
// })
// test('change todolist title', () => {
//     const newTitle = 'newTodolistTitle'
//     const endState = todolistReducer(startState,changeTodolistTitleAC(todolistId1,newTitle))
//     expect(endState.todolists[0].title).toBe('newTodolistTitle')
//     expect(endState).not.toBe(startState)
// })
// test('changed filter of todolist', () => {
//     const newFilter: FilterValuesType = "completed"
//     const endState = todolistReducer(startState,changeTodolistFilterAC(newFilter,todolistId2))
//     expect(endState.todolists[0].filter).toBe('all')
//     expect(endState.todolists[1].filter).toBe(newFilter)
//     expect(endState).not.toBe(startState)
//
// })