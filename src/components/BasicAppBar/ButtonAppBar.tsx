import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {BurgerMenu} from "../BurgerMenu/BurgerMenu";


export const ButtonAppBar=React.memo(()=> {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <BurgerMenu/>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Todolist
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
})
