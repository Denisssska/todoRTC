import {instance, ResponseType} from "./TodolistApi";

export type AuthDataType = {
    id: number | null
    email: string | null
    login: string | null
    captcha: string | null
}
export type GetMeAuth = {
    resultCode: number
    messages: string[]
    data: AuthDataType
}

export type AuthPayload = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authApi = {
    loginUser(payload: AuthPayload) {
        return instance.post<ResponseType<{ userId?: number }>>(`auth/login`, {...payload})
    },
    getMeAuth() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)

    },
    logOut() {
        return instance.delete<ResponseType>(`auth/login`)
    }
}
export const securityApi = {
    getCaptcha() {
        return instance.get(`/security/get-captcha-url`)
    }
}