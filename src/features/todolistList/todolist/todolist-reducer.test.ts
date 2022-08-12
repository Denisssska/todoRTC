import {v1} from "uuid";
import {TodolistsType} from "../../../API/TodolistApi";
import {addTodolistsTC, removeTodolistTC, todolistReducer, updateTodolistTC} from "./todolistReducer";


let todolistId1 = v1();
let todolistId2 = v1();
const startState = {
    todolists: [
        {id: todolistId1, title: 'learn', filter: 'all', addedDate: '15', order: 1, isDisabled: true},
        {id: todolistId2, title: 'buy', filter: 'all', addedDate: '13', order: 2, isDisabled: false},
    ] as Array<TodolistsType>
}
test('remove todolist', () => {
    const endState = todolistReducer(startState, removeTodolistTC.fulfilled({todolistId: todolistId1}, '', todolistId1))
    expect(endState.todolists.length).toBe(1)
    expect(endState.todolists[0].id).toBe(todolistId2)
    expect(endState).not.toBe(startState)
})

test('add todolist', () => {
    const newTodolist = {
        id: '12',
        title: 'empty',
        filter: "active",
        addedDate: '1',
        order: 3,
        isDisabled: false
    } as TodolistsType
    const endState = todolistReducer(startState, addTodolistsTC.fulfilled({todolist: newTodolist}, '', newTodolist.title));
    expect(endState.todolists.length).toBe(3)
    expect(endState.todolists[2].title).toBe("empty")
    expect(endState.todolists[2].filter).toBe('active')
    expect(endState).not.toBe(startState)

})
test('update todolist title', () => {
    const newTitle = 'newTodolistTitle'
    const endState = todolistReducer(startState, updateTodolistTC.fulfilled({
        todolistId: todolistId1,
        payLoad: {title: newTitle}
    }, '', {item: {title: newTitle}, todolistId: todolistId1}))
    expect(endState.todolists[0].title).toBe('newTodolistTitle')
    expect(endState).not.toBe(startState)
})
