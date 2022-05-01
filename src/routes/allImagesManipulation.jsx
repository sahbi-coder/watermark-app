import Canvas from "../components/manipulation/Canvas";

import TextEditor from "../components/manipulation/textEditor";
import LogoEditor from "../components/manipulation/LogoEditor";

import { ManipulationContext } from "../helpers/ManipulationContext";
import useStack from "../hooks/useStack";
const ImageManipaulation = () => {
  
  const { state, dispatch,ACTIONS } = useStack();

  return (
    <div>
      <ManipulationContext.Provider value={{state,dispatch,ACTIONS}}>
        <Canvas />
        <TextEditor />
        <LogoEditor />
      </ManipulationContext.Provider>
    </div>
  );
};
export default ImageManipaulation;
