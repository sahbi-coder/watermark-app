import { useReducer, useEffect } from "react";
import { useLocation } from "react-router-dom";

const intitialState = {
  prevIsActive: false,
  nextIsActive: false,
  prevIsShown: false,
  nextIsShown: false,
  
};
const TYPES = {
  SET_NEXT_IS_ACTIVE: "next is active",
  SET_PREV_IS_ACTIVE: "prev is active",
  SET_NEXT_IS_SHOWN: "next is shown",
  SET_PREV_IS_SHOWN: "prev is shown",
  RESET_NEXT_IS_ACTIVE: "next is not active",
  RESET_PREV_IS_ACTIVE: "prev is not active",
  RESET_NEXT_IS_SHOWN: "next is not shown",
  RESET_PREV_IS_SHOWN: "prev is not shown",
};
const reducer = (state, { type }) => {
  switch (type) {
    case TYPES.SET_NEXT_IS_SHOWN:
      return {
        ...state,
        nextIsShown: true,
      };
    case TYPES.SET_NEXT_IS_ACTIVE:
      return {
        ...state,
        nextIsActive: true,
      };
    case TYPES.RESET_NEXT_IS_SHOWN:
      return {
        ...state,
        nextIsShown: false,
      };
    case TYPES.RESET_NEXT_IS_ACTIVE:
      return {
        ...state,
        nextIsActive: false,
      };
    case TYPES.SET_PREV_IS_SHOWN:
      return {
        ...state,
        prevIsShown: true,
      };
    case TYPES.SET_PREV_IS_ACTIVE:
      return {
        ...state,
        prevIsActive: true,
      };
    case TYPES.RESET_PREV_IS_SHOWN:
      return {
        ...state,
        prevIsShown: false,
      };
    case TYPES.RESET_PREV_IS_ACTIVE:
      return {
        ...state,
        prevIsActive: false,
      };

    default:
      return state;
  }
};

function useActivate(imageSouces=[],modeIsSelected) {
  const [state, dispatch] = useReducer(reducer, intitialState);
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname === "/watermark-app") {
        dispatch({ type: TYPES.RESET_PREV_IS_ACTIVE });
        dispatch({ type: TYPES.RESET_PREV_IS_SHOWN });
        dispatch({ type: TYPES.SET_NEXT_IS_SHOWN });
        dispatch({ type: TYPES.RESET_NEXT_IS_ACTIVE });
        
      if (imageSouces.length) {
        dispatch({ type: TYPES.SET_NEXT_IS_ACTIVE });
      }
      return
    }
    if (location.pathname === "/watermark-app/user-options") {
      dispatch({ type: TYPES.SET_PREV_IS_ACTIVE });
      dispatch({ type: TYPES.SET_PREV_IS_SHOWN });
      dispatch({ type: TYPES.SET_NEXT_IS_SHOWN });
      dispatch({ type: TYPES.RESET_NEXT_IS_ACTIVE });
      if (modeIsSelected) {
        dispatch({ type: TYPES.SET_NEXT_IS_ACTIVE });
      }
      return
    }
    if ((location.pathname === "/watermark-app/image-manipulation")||(location.pathname === "/watermark-app/all-images-manipulation")) {
      dispatch({ type: TYPES.SET_PREV_IS_ACTIVE });
      dispatch({ type: TYPES.SET_PREV_IS_SHOWN });
      dispatch({ type: TYPES.RESET_NEXT_IS_SHOWN });
      dispatch({ type: TYPES.RESET_NEXT_IS_ACTIVE });
     
    }
  }, [imageSouces,modeIsSelected,location]);
  return state
}

export default useActivate;
