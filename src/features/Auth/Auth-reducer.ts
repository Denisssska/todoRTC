import {authApi, AuthDataType, AuthPayload} from "../../API/AuthApi";
import {AppThunk} from "../../state/redux-store";
import {changeInitializedAC, changeProcessAC, loadingErrorAC, setErrAC} from "../../app/AppReducer";
import { handleServerNetworkError} from "../../components/ErrorSnackBar/HandleError";




export type ActionsAuthType = ReturnType<typeof getMeAuthAC> | ReturnType<typeof changeAuthAC>

type InitialDataStateType = typeof initialState
const GET_DATA = 'GET_DATA';
const CHANGE_AUTH = 'CHANGE_AUTH'
const initialState = {
    data: {} as AuthDataType,
    isAuth: false
}
const getMeAuthAC = (data: AuthDataType, isAuth: boolean) => ({type: 'GET_DATA', data, isAuth}) as const
export const changeAuthAC = (isAuth: boolean) => ({type: 'CHANGE_AUTH', isAuth}) as const
export const authReducer = (state: InitialDataStateType = initialState, action: ActionsAuthType): InitialDataStateType => {
    switch (action.type) {
        case GET_DATA: {
            return {
                ...state, data:{...action.data}, isAuth: action.isAuth
            }
        }
        case CHANGE_AUTH: {
            return {
                ...state, isAuth: action.isAuth
            }
        }
        default:
            return state
    }
}
export const getDataTC = (): AppThunk => (dispatch) => {
    authApi.getMeAuth()
        .then(data => {
                console.log(data.data.data)
                if (data.data.resultCode === 0) {
                    dispatch(getMeAuthAC(data.data.data, true))
                }
            dispatch(changeInitializedAC(true))
            }
        )
        .catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(()=>dispatch(changeProcessAC(false)))
}
export const loginTC = (payLoad: AuthPayload): AppThunk => (dispatch) => {
    dispatch(changeProcessAC(true))
    authApi.loginUser(payLoad)
        .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(getDataTC())
                    dispatch(loadingErrorAC(true))
                    dispatch(setErrAC('Successfully'))
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(()=>dispatch(changeProcessAC(false)))
}
export const logOutTC = (): AppThunk => (dispatch) => {
    dispatch(changeProcessAC(true))
    authApi.logOut()
        .then(data => {
                if (data.data.resultCode === 0) {
                    dispatch(getMeAuthAC({login: null, email: null, id: null}, false))
                    dispatch(loadingErrorAC(true))
                    dispatch(setErrAC('Successfully'))
                }
            }
        )
        .catch(e => {
                handleServerNetworkError(e, dispatch)
            }
        )
        .finally(()=>dispatch(changeProcessAC(false)))
}