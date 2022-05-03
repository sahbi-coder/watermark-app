import {useReducer} from 'react'


const TEXT_ACTIONS = {
    SET_TEXT:'set text',
    SET_FAMILY:'set family',
    SET_SIZE:'set size',
    SET_X:'set x',
    SET_Y:'set y',
    SET_COLOR:'set color',
    SET_ANGLE:'set angle'
}
const initialState = {
    text:'watermark',
    size:10,
    family:'serif',
    x:10,
    y:10,
    color:'#000000',
    angle:0,
}
const reducer = (state,{type,payload})=>{
    switch(type){
        case TEXT_ACTIONS.SET_TEXT:
            return {...state,text:payload}
        case TEXT_ACTIONS.SET_FAMILY:
            return {...state,family:payload}
        case TEXT_ACTIONS.SET_SIZE:
            return {...state,size:payload}
        case TEXT_ACTIONS.SET_X:
            return {...state,x:payload}
        case TEXT_ACTIONS.SET_Y:
            return {...state,y:payload}
        case TEXT_ACTIONS.SET_COLOR:
            return {...state,color:payload}
        case TEXT_ACTIONS.SET_ANGLE:
            return {...state,angle:payload}

        default:
        return state
    }
}

function useText() {
    const [textState,dispatchText]=useReducer(reducer,initialState)
    

 return {textState,dispatchText,TEXT_ACTIONS}
}

export default useText