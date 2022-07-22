import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

import {useCallback} from "react";
import { NavLink} from "react-router-dom";
import c from "../Header/header.module.css";
import {logOutTC} from "../../features/Auth/Auth-reducer";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";


export const BurgerMenu = React.memo(() => {
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }, []);
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);
    const logOutHandler = useCallback(() => {
        dispatch(logOutTC())
        handleClose()
    }, [])
    return (
        <div>
            <Button
                style={{color: "white"}}
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >

                {isAuth?<MenuItem onClick={logOutHandler}>Logout</MenuItem>:
                    <MenuItem onClick={handleClose}><NavLink className={c.navLink} to='/login'>Login</NavLink></MenuItem>
                }
            </Menu>
        </div>
    );
})
