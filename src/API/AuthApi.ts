import {instance, ResponseType} from "./TodolistApi";
export type AuthDataType={
    id: number |null
    email: string |null
    login: string |null
}
export type GetMeAuth ={
    resultCode: number
    messages: string[]
    data:AuthDataType
}
type DeleteMe ={
    resultCode: number
    messages: string[],
    data: {}
}

export type AuthPayload={
    email:string
    password:string
    rememberMe:boolean
    captcha?:boolean
}

export const authApi={
    loginUser(payload:AuthPayload){
       return instance.post<ResponseType<{userId?:number}>>(`auth/login`,{...payload})
    },
    getMeAuth() {
        return instance.get<ResponseType<{id:number,email:string,login:string}>>(`auth/me`)

    },
    logOut(){
        return instance.delete<DeleteMe>(`auth/login`)
    }
}