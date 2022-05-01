import { useReducer } from "react";

const LOGO_ACTIONS = {
  SET_LOGO: "set logo",
  SET_SIZE: "set size",
  SET_X: "set x",
  SET_Y: "set y",
};
const initialState = {
  logo: "",
  size: 10,
  x: 0,
  y: 0,
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case LOGO_ACTIONS.SET_LOGO:
      return { ...state, logo: payload };
    case LOGO_ACTIONS.SET_SIZE:
      return { ...state, size: payload };
    case LOGO_ACTIONS.SET_X:
      return { ...state, x: payload };
    case LOGO_ACTIONS.SET_Y:
      return { ...state, y: payload };
    default:
      return state;
  }
};

function useLogo() {
  const [logoState, dispatchLogo] = useReducer(reducer, initialState);
  return { logoState, dispatchLogo, LOGO_ACTIONS };
}

export default useLogo;
