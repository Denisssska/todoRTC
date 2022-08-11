import {authReducer, changeAuthAC, getMeAuthAC} from "./Auth-reducer";
import {AuthDataType} from "../../API/AuthApi";

const startState = {
    data: {} as AuthDataType,
    isAuth: false
}
const data = {
    id: 1,
    email: "test@test",
    login: 'login'
}

test('change authMe', () => {
    const endState = authReducer(startState, getMeAuthAC({data, isAuth: true}));
    expect(endState.data.id).toBe(1)
    expect(endState.isAuth).toBe(true)
    expect(endState.data.login).toBe('login')
    expect(endState).not.toBe(startState)
})
test('change auth', () => {
    const endState = authReducer(startState, changeAuthAC({isAuth: true}));
    expect(endState.isAuth).toBe(true)
    expect(endState).not.toBe(startState)
})

