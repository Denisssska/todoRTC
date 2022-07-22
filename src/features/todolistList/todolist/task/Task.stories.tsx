import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {useSelector} from "react-redux";
import {StateAppType} from "../../../../state/redux-store";

import {ReduxStoreProviderDecorator, todolistId1} from "../../../../state/ReduxStoreProviderDecorator";
import {TaskType} from "../../../../API/TasksApi";

export default {
    title: 'Task',
    components: Task,
    args: {
        status:1,
        taskId:'2',
        todolistId: todolistId1,
        changeTaskStatus: action('Task want to changed status'),
        onChangeText: action('Task want to changed text'),
        removeTask: action('Task want to delete')
    },
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Task>

const TaskWithDispatch = (args:{todolistId:string}) => {
    const task = useSelector<StateAppType>(state => state.tasks.tasks) as TaskType
    return <Task todolistId={args.todolistId}   task={task}/>
}

export const Template: ComponentStory<typeof Task> = (args) => <TaskWithDispatch {...args}/>

//  export const Primary = Template.bind({})
// export const Primary= {args : {
//     changeTaskStatus: action('Task want to changed status'),
//     onChangeText: action('Task want to changed text'),
//     removeTask: action('Task want to delete'),
// }}