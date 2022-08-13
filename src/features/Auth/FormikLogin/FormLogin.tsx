import React from 'react';
import {useFormik} from "formik";
import {AuthPayload} from "../../../API/AuthApi";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {loginTC} from "../Auth-reducer";
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField} from "@mui/material";
import Grid from '@mui/material/Grid';
import Button from "@mui/material/Button";
import {Navigate} from "react-router-dom";

export const FormLogin = () => {
    const captcha = useAppSelector(state => state.auth.data.captcha)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const dispatch = useAppDispatch()
    console.log(captcha)
    const formik = useFormik({

        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
            captcha: ''
        },
        validate: (values) => {
            if (!values.email)
                return {
                    email: 'invalid email'
                }
            if (!values.password)
                return {
                    password: 'invalid password'
                }
            // if(!values.captcha)return {captcha:'invalid captcha'}
        },
        onSubmit: async (values: AuthPayload) => {
            await dispatch(loginTC({...values}))
            // @ts-ignore
            // formikHelpers.setFieldError('some',res.payload.errors[0])
            // @ts-ignore
            // formikErrors.setErrors(res.payload.errors[0])
            console.log(res)
            // if(loginTC.rejected.match(res)){
            //     // @ts-ignore
            //     if(res.payload?.errors?.length){
            //         // console.log(res.payload)
            //         // @ts-ignore
            //         const error1 = res.payload.errors[0];
            //         formikHelpers.setFieldError(error1,error1)
            //     }
            //
            // }
        },
    });
    console.log(isAuth)
    if (isAuth) return <Navigate to={'/'}/>
    return (
        <Grid container justifyContent={"center"}>

            <Grid item xs={4}>
                <form style={{
                    alignItems: 'center',
                    margin: '5% 22%'
                }} onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <FormGroup>
                                <TextField
                                    margin={'normal'}
                                    label={'email address'}
                                    helperText={formik.errors.email}
                                    error={!!formik.errors.email}
                                    type="email"
                                    {...formik.getFieldProps('email')}
                                />
                                <TextField
                                    margin={'normal'}
                                    label={"password"}
                                    helperText={formik.errors.password}
                                    error={!!formik.errors.password}
                                    type="password"
                                    {...formik.getFieldProps('password')}
                                />
                                {captcha && <div>
                                    <img src={captcha} alt=""/>
                                    <TextField
                                        margin={'normal'}
                                        label={'captcha'}
                                        helperText={formik.errors.captcha}
                                        // error={!!formik.errors.captcha}
                                        type="captcha"
                                        {...formik.getFieldProps('captcha')}
                                    />
                                </div>
                                }
                                <FormControlLabel
                                    label={'remember me'}
                                    control={<Checkbox {...formik.getFieldProps('rememberMe')}  />}/>
                                <Button variant={'contained'} color={'primary'} type="submit">Login</Button>
                            </FormGroup>
                        </FormLabel>
                    </FormControl>
                </form>
            </Grid>

        </Grid>

    );
}

