import Canvas from "../components/Canvas";
import { useRef, useState, useContext } from "react";
import ImageManipaulationTools from "../components/imageManipulationTools";

import { AppContext } from "../helpers/Context";

const ImageManipaulation = () => {
  const [color, setColor] = useState("#fff");
  const [mousePositionInsideForm, setMousePositionInsideForm] = useState({
    left: 0,
    top: 0,
  });
  const [colorPickerIsVisible, setColorPickerIsVisible] = useState(false);
  const { textConfigIsShown, hideTextConfig } = useContext(AppContext);
  const formRef = useRef(null);
  const XinputRef = useRef(null);
  const YinputRef = useRef(null);
  const { imageSources } = useContext(AppContext);

  const setColorVisibility = (e) => {
    e.preventDefault();
    setColorPickerIsVisible(!colorPickerIsVisible);
  };
  const [textToAdd, setTextsToAdd] = useState({ text: "", top: 0, left: 0 });
  const [position, setPosition] = useState({ top: 10, left: 10 });
  const setNewPosition = (left, top) => {
    setPosition({ left: left, top: top });
  };
  const canvasRef = useRef(null);
  function downloadImage(e,canvas) {
    e.preventDefault()
    const anchor = document.createElement("a");
anchor.href = canvas.toDataURL("image/png");
anchor.download = "IMAGE.PNG";
anchor.click();
    
   
  }
  const addtextToStak = (e, text) => {
    e.preventDefault();

    setTextsToAdd({
      text: text,
      left: XinputRef.current.value,
      top: YinputRef.current.value,
    });
  };

  const dragStart = (e) => {
    if (e.target.id === "text-manipulator") {
      const dx = e.clientX - e.target.offsetLeft;
      const dy = e.clientY - e.target.offsetTop - 170;
      setMousePositionInsideForm({ left: dx, top: dy });
    }
  };
  const drag = (e) => {
    setNewPosition(e.clientX, e.clientY - 170);
    formRef.current.classList.add("dragging");
  };
  const dragEnd = (e) => {
    setNewPosition(
      e.clientX - mousePositionInsideForm.left,
      e.clientY - 170 - mousePositionInsideForm.top
    );
    formRef.current.classList.remove("dragging");
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <Canvas
        canvasRef={canvasRef}
        textToAdd={textToAdd}
        imageSources={imageSources}
      />
      <ImageManipaulationTools
        addtextToStak={addtextToStak}
        textConfigIsShown={textConfigIsShown}
        setColorVisibility={setColorVisibility}
        colorPickerIsVisible={colorPickerIsVisible}
        color={color}
        setColor={setColor}
        hideTextConfig={hideTextConfig}
        XinputRef={XinputRef}
        YinputRef={YinputRef}
        drag={drag}
        dragStart={dragStart}
        dragEnd={dragEnd}
        position={position}
        formRef={formRef}
        canvasRef={canvasRef}
        downloadImage={downloadImage}
      />
    </div>
  );
};
export default ImageManipaulation;
