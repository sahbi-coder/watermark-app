import Canvas from "../components/manipulation/AllCanvas";
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
          state,
          dispatch,
          ACTIONS,
          startDownload,
          setStartDownload,
          currentIndex,
          setCurrentIndex,
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
