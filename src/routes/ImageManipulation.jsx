import Canvas from "../components/manipulation/Canvas";
import TextEditor from "../components/manipulation/textEditor";
import LogoEditor from "../components/manipulation/LogoEditor";
import { ManipulationContextProvider } from "../helpers/ManipulationContext";

const ImageManipaulation = () => {


  return (
    <div>
      <ManipulationContextProvider>
     
        <Canvas />
        <TextEditor />
        <LogoEditor />
        
      </ManipulationContextProvider>
    </div>
  );
};
export default ImageManipaulation;
