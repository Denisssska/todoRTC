import {v1} from "uuid";
import {TaskType} from "../../../../API/TasksApi";
import {addTaskTC, removeTaskTC, taskReducer, updateTaskTC} from "./TaskReducer";

let todolistId1 = v1();

const startState = {
    tasks: [
        {
            id: 'one', title: 'task1', description: 'a',
            status: 1, priority: 2, startDate: '12',
            deadline: '14', todoListId: 'three', order: 5,
            isDisabledTask: true, addedDate: '55'
        },
        {
            id: 'two', title: 'task2', description: 'a',
            status: 2, priority: 2, startDate: '12',
            deadline: '14', todoListId: 'four', order: 5,
            isDisabledTask: true, addedDate: '55'
        }
    ] as Array<TaskType>
};
let id = startState.tasks[0].id
test('remove task', () => {
    const endState = taskReducer(startState, removeTaskTC.fulfilled({id, todolistId: todolistId1}, '', {
        taskId: id,
        todolistId: todolistId1
    }))
    console.log(endState)
    expect(endState.tasks.length).toBe(1)
    expect(endState.tasks[0].title).toBe("task2")
    expect(endState).not.toBe(startState)
})

test('add task', () => {
    let newTitle = {
        id: 'one', title: 'task1', description: 'a',
        status: 1, priority: 2, startDate: '12',
        deadline: '14', todoListId: 'three', order: 5,
        isDisabledTask: true, addedDate: '55'
    };
    const endState = taskReducer(startState, addTaskTC.fulfilled({
        item: newTitle,
        todolistId: todolistId1
    }, 'requestId', {title: newTitle.title, todolistId: todolistId1}))
    expect(endState.tasks.length).toBe(3)
    expect(endState.tasks[2].title).toBe('task1')
    expect(endState).not.toBe(startState)
    //console.log(endState)
})
test('change task status', () => {
    let taskId = startState.tasks[1].id
    let status = 1
    const endState = taskReducer(startState, updateTaskTC.fulfilled({
        taskId,
        payLoad: {status},
        todolistId: todolistId1
    }, '', {item: {status}, todolistId: todolistId1, taskId: id}))
    expect(endState.tasks[1].status).toBe(1)
    expect(endState).not.toBe(startState)
    console.log(endState)
})
test('change task text', () => {
    let taskId = startState.tasks[1].id
    let title = 'Super'
    const endState = taskReducer(startState, updateTaskTC.fulfilled({
        taskId,
        payLoad: {title},
        todolistId: todolistId1
    },'',{item:{title},todolistId:todolistId1,taskId}))
    expect(endState.tasks[1].title).toBe('Super')
    expect(endState).not.toBe(startState)
    console.log(endState)
})
