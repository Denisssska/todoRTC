import React from 'react';
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {Todolist} from "./Todolist";
import {ReduxStoreProviderDecorator} from "../../../state/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist',
    components: Todolist,
    decorators:[ReduxStoreProviderDecorator]
} as ComponentMeta<typeof Todolist>

const addTaskCallback = action('Task want to added')
const changeFilterCallback = action('Task want to change filter')
const changeTaskStatusCallback = action('Task want to change status')
const changeTodolistTitleCallback = action('Todolist want to change title')
const changeTodolistTextCallback = action('todolist want to change text')
const removeTaskCallback = action('Task want to remove')
const removeTodolistCallback = action('Todolist want to remove')

export const TodolistExample: ComponentStory<typeof Todolist> = () => <div>
    <Todolist filter={'active'} title={'todolist'} todolistId={'todolistId1'} isDisabled={false}/>
    </div>
;
