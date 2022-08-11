import { createContext, useContext, useState } from "react";
import useStack from '../hooks/useStack'
const ManipulationContext = createContext();

export const ManipulationContextProvider = ({ children }) => {
  const { state, dispatch, ACTIONS } = useStack();
  const [startDownload, setStartDownload] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <>
      <ManipulationContext.Provider  value={{
          dispatch,
          setStartDownload,
          setCurrentIndex,
          state,
          ACTIONS,
          startDownload,
          currentIndex,
        }}>
            {children}

      </ManipulationContext.Provider>
    </>
  );
};
export const useManipulate = ()=>{
    return useContext(ManipulationContext)
}
