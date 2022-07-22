import React, {useCallback} from 'react';
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {
    removeTaskTC, updateTaskTC
} from "./TaskReducer";
import {TaskType} from "../../../../API/TasksApi";
import {useAppDispatch} from "../../../../hooks/hooks";
import Button from "@mui/material/Button";


type TaskPropsType = {
    todolistId: string
    task: TaskType

}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useAppDispatch();

    const removeTask = useCallback(() => {
        dispatch(removeTaskTC(props.todolistId, props.task.id))
    }, [props.todolistId, props.task.id]);

    let status: number;
    props.task.status === 0 ? status = 1 : status = 0

    const changeStatus = useCallback(() => {
        dispatch(updateTaskTC(props.task.id, {status}, props.todolistId))
    }, [props.task.id, props.task.status, props.todolistId]);

    const onChangeText = useCallback((title: string) => {

        dispatch(updateTaskTC(props.task.id, {title}, props.todolistId))

    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === 1 ? "is-done" : ""}>

        <input disabled={props.task.isDisabledTask} type='checkbox' onChange={changeStatus}
               checked={!!props.task.status}
        />
        <EditableSpan title={props.task.title} onChange={(title) => onChangeText(title)}/>
         <Button disabled={props.task.isDisabledTask} onClick={removeTask}>delete</Button>
    </div>
});

