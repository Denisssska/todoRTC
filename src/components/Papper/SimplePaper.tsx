import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Todolist} from "../../features/todolistList/todolist/Todolist";

import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {useCallback, useEffect} from "react";
import {addTodolistsTC, getTodolistsTC} from "../../features/todolistList/todolist/todolistReducer";
import {Navigate} from "react-router-dom";
import {AddFormItem} from "../AddItemForm/AddFormItem";


export const SimplePaper = React.memo(() => {
    const dispatch = useAppDispatch();
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const TodolistState = useAppSelector(state => state.todolist.todolists)
    console.log(isAuth)
    useEffect(() => {
        if (!isAuth) {
            return;
        }
        dispatch(getTodolistsTC())

    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title));
    }, []);
    if (!isAuth) return <Navigate to={'/login'}/>
    return (
        <Box
            sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                    m: 1,

                },
            }}
        >
            <div className="FormItem">
                <AddFormItem addItem={addTodolist}/>
            </div>
            {
                TodolistState.map((item) => {
                        return <Paper key={item.id} elevation={3}>
                            <Todolist title={item.title}
                                      filter={item.filter}
                                      todolistId={item.id}
                                      isDisabled={item.isDisabled}
                                      key={item.id}
                            />
                        </Paper>
                    }
                )
            }
        </Box>
    );
})
