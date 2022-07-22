const IS_LOADING = 'IS_LOADING';
const ERROR = 'ERROR';
const IS_PROCESS = 'IS_PROCESS';
const IS_INITIALIZED='IS_INITIALIZED'
const initialState = {
    loading: false,
    error: null,
    process: true,
    initializedApp:false

}
export type errorAppType = typeof initialState

export type ErrorActionType = ReturnType<typeof loadingErrorAC>
    | ReturnType<typeof setErrAC>
    | ReturnType<typeof changeProcessAC>
    | ReturnType<typeof changeInitializedAC>

export const loadingErrorAC = (loading: boolean) => ({type: IS_LOADING, loading}) as const
export const setErrAC = (error: string | null) => ({type: ERROR, error}) as const
export const changeProcessAC = (process: boolean) => ({type: IS_PROCESS, process}) as const
export const changeInitializedAC = (initialized: boolean) => ({type: IS_INITIALIZED, initialized}) as const

export const appReducer = (state: errorAppType = initialState, action: ErrorActionType): errorAppType => {

    switch (action.type) {
        case IS_LOADING: {
            return {...state, loading: action.loading}
        }
        case ERROR: {


            return <errorAppType>{...state, error: action.error}
        }
        case IS_PROCESS:{
            return {...state,process: action.process}
        }
        case IS_INITIALIZED:{
            return {
                ...state,initializedApp:action.initialized
            }
        }
        default:
            return state
    }
}

    
