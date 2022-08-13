import {authReducer, getDataTC, logOutTC} from "./Auth-reducer";
import {AuthDataType} from "../../API/AuthApi";

const startState = {
    data: {} as AuthDataType,
    isAuth: false
}
const data = {
    id: 1,
    email: "test@test",
    login: 'login',
    captcha:''
}

test('change authMe', () => {
    const endState = authReducer(startState, getDataTC.fulfilled({data, isAuth: true},''));
    expect(endState.data.id).toBe(1)
    expect(endState.isAuth).toBe(true)
    expect(endState.data.login).toBe('login')
    expect(endState).not.toBe(startState)
})
test('logOut', () => {
    const endState = authReducer(startState, logOutTC.fulfilled({data: {login: null,id: null,email: null,captcha: null},isAuth: false},''));
    expect(endState.data.id).toBe(null)
    expect(endState.isAuth).toBe(false)
    expect(endState.data.login).toBe(null)
    expect(endState).not.toBe(startState)
})


