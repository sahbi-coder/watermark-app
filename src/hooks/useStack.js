import { useReducer } from "react";

const initialState = {
  stack: [],

};
const ACTIONS = {
  ADD_TO_STACK: "add to stack",
  REMOVE_FROM_STACK: "remove from stack",
  CLEAR_STACK: "clear stack",
  
};

const reducer = (state, { type, payload }) => {
  let temp = [];
  switch (type) {
    case ACTIONS.ADD_TO_STACK:
      temp = [...state.stack, payload];
      return { stack: temp };
    case ACTIONS.REMOVE_FROM_STACK:
      temp = state.stack.slice(0, state.stack.length - 2);
      return { stack: temp };
    case ACTIONS.CLEAR_STACK:
      return { stack: [] };
    default:
      return state;
  }
};
function useStack() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {state,ACTIONS,dispatch};
}

export default useStack;
