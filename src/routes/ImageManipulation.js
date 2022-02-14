import Canvas from "../components/Canvas";
import { useRef, useState, useContext } from "react";
import ImageManipaulationTools from "../components/imageManipulationTools";

import { AppContext } from "../helpers/Context";

const ImageManipaulation = () => {
  const [color, setColor] = useState("#fff");
  const [colorPickerIsVisible, setColorPickerIsVisible] = useState(false);
  const { textConfigIsShown, hideTextConfig } = useContext(AppContext);

  const setColorVisibility = (e) => {
    e.preventDefault();
    setColorPickerIsVisible(!colorPickerIsVisible);
  };
  const [textsToAdd, setTextsToAdd] = useState([]);
  const canvasRef = useRef(null);
  const addtextToStak = (e, text) => {
    e.preventDefault();
    let temp = [...textsToAdd];
    temp.push(text);
    setTextsToAdd(temp);
    
  };
  return (
    <>
      <Canvas canvasRef={canvasRef} textsToAdd={textsToAdd}/>
      <ImageManipaulationTools
        addtextToStak={addtextToStak}
        textConfigIsShown={textConfigIsShown}
        setColorVisibility={setColorVisibility}
        colorPickerIsVisible={colorPickerIsVisible}
        color={color}
        setColor={setColor}
        hideTextConfig={hideTextConfig}
      />
    </>
  );
};
export default ImageManipaulation;
