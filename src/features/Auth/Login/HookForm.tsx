import React from 'react';
// import {SubmitHandler, useForm} from "react-hook-form";
// import {Navigate} from "react-router-dom";
// import c from './HookForm.module.css';
// import {AuthPayload} from "../../../API/AuthApi";
// import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
// import {loginTC} from "../Auth-reducer";
// import {PATH} from "../../../components/Header/Pages";
//
// export const HookForm = React.memo(() => {
//     const dispatch = useAppDispatch()
//     const state = useAppSelector((state) => state.auth.isAuth)
//
//     const {register, handleSubmit, reset, formState: {errors, isSubmitSuccessful,isValid}} = useForm<AuthPayload>({
//         mode: 'onBlur'
//     })
//     const onSubmit: SubmitHandler<AuthPayload> = (data) => {
//         dispatch(loginTC({...data}))
//         reset()
//     }
//
//     if (state) {
//         return <Navigate to={PATH.TODOLIST}/>
//     }
//     return (
//
//         <form className={c.form} onSubmit={handleSubmit(onSubmit)}>
//             <div>
//                 <input {...(register('password', {
//                     required: 'Enter password please',
//                     minLength: {
//                         value: 8,
//                         message: '5 symbols minimal'
//                     }
//                 }))} placeholder='password'/>
//                 {!state && errors.password && <span style={{color: "red"}}>{errors?.password.message || 'Error!'}</span>}
//             </div>
//             <div>
//                 <input {...(register('email', {
//                     validate: undefined,
//                     required: 'Enter email please'
//                 }))} placeholder="email"/>
//                 {errors.email && <span style={{color: "red"}}>{errors.email.message}</span>}
//             </div>
//             <div>
//                 <input type="checkbox"{...register("rememberMe", {required: 'checked me please'})}/>
//                 {errors.rememberMe && <div style={{color: "red"}}>{errors.rememberMe.message}</div>}
//                 <input type="submit" disabled={!isValid}/>
//                 {isSubmitSuccessful && <div style={{color: "yellowgreen"}}> successfully</div>}
//             </div>
//
//         </form>
//
//     );
// })
//
