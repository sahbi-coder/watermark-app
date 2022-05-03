import Canvas from "../components/manipulation/Canvas";
import TextEditor from "../components/manipulation/textEditor";
import LogoEditor from "../components/manipulation/LogoEditor";
import { ManipulationContext } from "../helpers/ManipulationContext";
import useStack from "../hooks/useStack";
import { useState } from "react";
const ImageManipaulation = () => {
  const { state, dispatch, ACTIONS } = useStack();
  const [startDownload, setStartDownload] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <ManipulationContext.Provider
        value={{
          dispatch,
          setStartDownload,
          setCurrentIndex,
          state,
          ACTIONS,
          startDownload,
          currentIndex,
        }}
      >
        <Canvas />
        <TextEditor />
        <LogoEditor />
      </ManipulationContext.Provider>
    </div>
  );
};
export default ImageManipaulation;
