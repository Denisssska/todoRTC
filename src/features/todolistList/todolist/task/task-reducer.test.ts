import {v1} from "uuid";
//
// import {
//     removeTaskAC,
//     addTaskAC,
//
//     taskReducer
// } from "./TaskReducer";
//
// import {TaskType} from "../API/TasksApi";
//
//
// let todolistId1 = v1();
//
// const startState = {
//     tasks: [
//         {
//             id: 'one', title: 'task1', description: 'a',
//             status: 1, priority: 2, startDate: '12',
//             deadline: '14', todoListId: 'three', order: 5, addedDate: '55'
//         },
//         {
//             id: 'two', title: 'task2', description: 'a',
//             status: 2, priority: 2, startDate: '12',
//             deadline: '14', todoListId: 'four', order: 5, addedDate: '55'
//         }
//     ] as Array<TaskType>
// };
// let id = startState.tasks[0].id
// test('remove task', () => {
//     const endState = taskReducer(startState, removeTaskAC(id, todolistId1))
//     console.log(endState)
//     expect(endState.tasks.length).toBe(1)
//     expect(endState.tasks[0].title).toBe("task2")
//     expect(endState).not.toBe(startState)
// })
//
// test('add task', () => {
//     let newTitle = {
//         id: 'one', title: 'task1', description: 'a',
//         status: 1, priority: 2, startDate: '12',
//         deadline: '14', todoListId: 'three', order: 5, addedDate: '55'
//     };
//     const endState = taskReducer(startState, addTaskAC(newTitle, todolistId1))
//     expect(endState.tasks.length).toBe(3)
//     expect(endState.tasks[1].title).toBe('task1')
//     expect(endState).not.toBe(startState)
//     console.log(endState)
// })
// test('change task status', () => {
//     let id = startState.tasks[1].id
//     let status = 1
//     const endState = taskReducer(startState, changeTaskStatusAC(id, status, todolistId1))
//     expect(endState.tasks[1].status).toBe(1)
//     expect(endState).not.toBe(startState)
//     console.log(endState)
// })
// test('change task text', () => {
//     let id = startState.tasks[1].id
//     let title = 'Super'
//     const endState = taskReducer(startState, changeTaskTextAC(id, title, todolistId1))
//     expect(endState.tasks[1].title).toBe('Super')
//     expect(endState).not.toBe(startState)
//     console.log(endState)
// })
//
//
// // test('property with todolistId should be deleted', () => {
// //
// //     const action = removeTodolistAC(todolistId1);
// //     const endState = taskReducer(startState, action)
// //     const keys = Object.keys(endState)
// //
// //     expect(keys.length).toBe(1)
// //     expect(endState.tasks[0].todoListId).toBeUndefined()
// //     expect(endState).not.toBe(startState)
// //
// // })