import React, {useEffect} from 'react';
import './App.css';
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {PositionedSnackbar} from "../components/ErrorSnackBar/SnackBar";
import {LinearIndeterminate} from "../components/linearProgress/LinearIndeterminate";
import {SimplePaper} from "../components/Papper/SimplePaper";
import {Route, Routes} from "react-router-dom";
import {FormLogin} from "../features/Auth/FormikLogin/FormLogin";
import {ButtonAppBar} from "../components/BasicAppBar/ButtonAppBar";
import {getDataTC} from "../features/Auth/Auth-reducer";
import load from '../img/load.gif';

export const App = () => {
    const initializedApp = useAppSelector(state =>state.application.initializedApp)

    const dispatch = useAppDispatch();
    useEffect(() => {
        setTimeout(()=>{
            dispatch(getDataTC())
        },2000)
    }, [])
    const process = useAppSelector(state => state.application.process)
if(!initializedApp)return <div style={{margin:'20% 45%'}}><img src={load} alt=""/></div>
    return (
        <div style={{width: '100%'}}>
            <ButtonAppBar/>
            {process && <LinearIndeterminate/>}
            <div className="App">
                <PositionedSnackbar/>
                <Routes>
                    <Route  path={'/'} element={<SimplePaper/>}/>
                    <Route path={'/login'} element={<FormLogin/>}/>
                </Routes>
            </div>
        </div>
    );
}


