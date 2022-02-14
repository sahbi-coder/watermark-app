import Canvas from "../components/Canvas";
import { useRef, useState, useContext } from "react";
import ImageManipaulationTools from "../components/imageManipulationTools";

import { AppContext } from "../helpers/Context";

const ImageManipaulation = () => {
  const [color, setColor] = useState("#fff");
  const [mousePositionInsideForm,setMousePositionInsideForm]=useState({left:0,top:0})
  const [colorPickerIsVisible, setColorPickerIsVisible] = useState(false);
  const { textConfigIsShown, hideTextConfig } = useContext(AppContext);
  const formRef = useRef(null)

  const setColorVisibility = (e) => {
    e.preventDefault();
    setColorPickerIsVisible(!colorPickerIsVisible);
  };
  const [textToAdd, setTextsToAdd] = useState('');
  const [position,setPosition]=useState({top:10,left:10})
  const setNewPosition=(left,top)=>{
       setPosition({left:left,top:top})
  }
  const canvasRef = useRef(null);
  const addtextToStak = (e, text) => {
    e.preventDefault();
   
    
    setTextsToAdd(text);
  };
 
  const dragStart = (e) => {

    if(e.target.id==='text-manipulator'){

      const dx = e.clientX- e.target.offsetLeft
      const dy = e.clientY- e.target.offsetTop-170
      setMousePositionInsideForm({left:dx,top:dy})
    }
   

   
  };
  const drag = (e) => {
    
    

    setNewPosition(e.clientX,e.clientY-170)
    formRef.current.classList.add('dragging')
  };
  const dragEnd = (e) => {
  
    setNewPosition(e.clientX-mousePositionInsideForm.left,e.clientY-170-mousePositionInsideForm.top)
    formRef.current.classList.remove('dragging')
  };
 
  

  return (
    <div onDragOver={(e)=>{e.preventDefault()}}>
      <Canvas canvasRef={canvasRef} textToAdd={textToAdd} />
      <ImageManipaulationTools
        addtextToStak={addtextToStak}
        textConfigIsShown={textConfigIsShown}
        setColorVisibility={setColorVisibility}
        colorPickerIsVisible={colorPickerIsVisible}
        color={color}
        setColor={setColor}
        hideTextConfig={hideTextConfig}
        
        drag={drag}
        dragStart={dragStart}
        dragEnd={dragEnd}
        position={position}
        formRef={formRef}
        
      />
    </div>
  );
};
export default ImageManipaulation;
