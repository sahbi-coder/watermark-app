import { useReducer,  useEffect, useContext, useState } from "react";
import {  useLocation } from "react-router-dom";

const intitialState = {
  modeIsSelected: false,
  isIndividualMode: true,
};
const TYPES = {
  SET_IS_SELECTED: "set is selected",
  SET_IS_INDIVIDUAL: "set is individual",
  RESET_IS_SELECTED: "reset is selected",
  RESET_IS_INDIVIDUAL: "reset is individual",
};
const reducer = (state, { type }) => {
  switch (type) {
    case TYPES.SET_IS_INDIVIDUAL:
      return {
        ...state,
        isIndividualMode: true,
      };
    case TYPES.SET_IS_SELECTED:
      return {
        ...state,
        modeIsSelected: true,
      };

    case TYPES.RESET_IS_INDIVIDUAL:
      return {
        ...state,
        isIndividualMode: false,
      };
    case TYPES.RESET_IS_SELECTED:
      return {
        ...state,
        modeIsSelected: false,
      };

    default:
      return state;
  }
};
function useMode(isIndividual = null,imageSources =[]) {

  const [state, dispatch] = useReducer(reducer, intitialState);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      if (imageSources.length === 1) {
        dispatch({ type: TYPES.SET_IS_INDIVIDUAL });
        dispatch({ type: TYPES.SET_IS_SELECTED });
      }
      if (imageSources.length > 1) {
        dispatch({ type: TYPES.RESET_IS_INDIVIDUAL });
        dispatch({ type: TYPES.SET_IS_SELECTED });
      }
      return;
    }
    if (location.pathname === "/user-options") {
      
      if(isIndividual===null){

        dispatch({ type: TYPES.RESET_IS_SELECTED });
        return
      }
      
      if (isIndividual) {
        dispatch({ type: TYPES.SET_IS_INDIVIDUAL });
        dispatch({ type: TYPES.SET_IS_SELECTED });
        return;
      }
      dispatch({ type: TYPES.RESET_IS_INDIVIDUAL });
      dispatch({ type: TYPES.SET_IS_SELECTED });
    }
  }, [location, isIndividual,imageSources]);
  

  return state;
}

export default useMode;
