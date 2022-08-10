import {appReducer, changeInitializedAC, changeProcessAC, loadingErrorAC, setErrAC} from "./AppReducer";

const startState={
    loading: false,
    error: null,
    process: true,
    initializedApp: false
}

test('loadingErrorAC', () => {
    const endState = appReducer(startState,loadingErrorAC({loading:true}));
    expect(endState.loading).toBe(true)
    expect(endState).not.toBe(startState)
})
test('setErrAC', () => {
    const endState = appReducer(startState,setErrAC({error:'some error'}));
    expect(endState.error).toBe('some error')
    expect(endState).not.toBe(startState)
})
test('changeProcessAC', () => {
    const endState = appReducer(startState,changeProcessAC({process:false}));
    expect(endState.process).toBe(false)
    expect(endState).not.toBe(startState)
})
test('changeInitializedAC', () => {
    const endState = appReducer(startState,changeInitializedAC({initialized:true}));
    expect(endState.initializedApp).toBe(true)
    expect(endState).not.toBe(startState)
})

