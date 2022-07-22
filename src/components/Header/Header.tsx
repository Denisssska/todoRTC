import React from 'react'
import {NavLink} from "react-router-dom";
import c from './header.module.css';

export const Header= React.memo(() =>{
    return (
            <div >
                <div><NavLink className={c.navLink}  to='/*'>Todolist</NavLink></div>
                <div><NavLink className={c.navLink}  to='/login'>Login</NavLink></div>

            </div>
    )
})
