import React from 'react'
import { Route, Routes} from "react-router-dom";
import {App} from "../../app/App";
import {FormLogin} from "../../features/Auth/FormikLogin/FormLogin";

export const Pages= React.memo(() =>{
    return (
        <div>
            <Routes>
                <Route path={'/'} element={<App/>}/>
                <Route path={'/login/'} element={<FormLogin/>} />
            </Routes>
        </div>
    )
})

