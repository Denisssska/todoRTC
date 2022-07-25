import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import { useAppSelector} from "../../hooks/hooks";
import {loadingErrorAC} from "../../app/AppReducer";
 import {Alert} from "@mui/material";
import {useDispatch} from "react-redux";


export const PositionedSnackbar=() =>{
const dispatch = useDispatch()
    const error = useAppSelector(state=> state.application.error)
    const loading = useAppSelector(state=> state.application.loading)
    const handleClose = () => {
dispatch(loadingErrorAC({loading:false}))
    };

    return (
        <div>
            <Snackbar
                autoHideDuration={3000}
                open={loading}
                onClose={handleClose}
            >
                <Alert  onClose={handleClose} severity={error ==="Successfully"?"success":"error"} sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

        </div>
    );
}

