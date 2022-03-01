import Canvas from "../components/allImagesManipulation/Canvas";
import { useRef, useState, useContext } from "react";
import TextEditor from "../components/allImagesManipulation/textEditor";
import LogoEditor from '../components/allImagesManipulation/LogoEditor'

import { AppContext } from "../helpers/Context";

const ImageManipaulation = () => {
  const [color, setColor] = useState("#fff");
  const [mousePositionInsideForm, setMousePositionInsideForm] = useState({
    left: 0,
    top: 0,
  });
  const [mousePositionInsideLogoForm, setMousePositionInsideLogoForm] = useState({
    left: 0,
    top: 0,
  });
  const [colorPickerIsVisible, setColorPickerIsVisible] = useState(false);
  const { textConfigIsShown, hideTextConfig,hideLogoConfig,logoConfigIsShown } = useContext(AppContext);
  const { imageSources } = useContext(AppContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textToAdd, setTextsToAdd] = useState({ text: "", top: 0, left: 0 ,size:24,color:"#fff"});
  const [logoToAdd, setLogosToAdd] = useState({ logo: "", top: 0, left: 0 ,size:0});
  const [textFormPosition, setTextFormPosition] = useState({ top: 10, left: 10 });
  const [startDownload,setStartDownload]=useState(false)
  const [logoFormPosition, setLogoFormPosition] = useState({ top: 10, left: 10 });
  const [logoSource,setLogoSource]=useState('')
  const textFormRef = useRef(null);
  const textXinputRef = useRef(null);
  const textYinputRef = useRef(null);
  const logoFormRef = useRef(null);
  const logoXinputRef = useRef(null);
  const logoYinputRef = useRef(null);
  const canvasRef = useRef(null);
  const textSizeRef =useRef(null)
  const logoSizeRef =useRef(null)

  const getNextImage = () => {
  
    if (currentImageIndex < imageSources.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const getPrevtImage = (e) => {
   
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const setColorVisibility = (e) => {
    e.preventDefault();
    setColorPickerIsVisible(!colorPickerIsVisible);
  };
  const setNewTextFormPosition = (left, top) => {
    setTextFormPosition({ left: left, top: top });
  };
  const setNewLogoFormPosition = (left, top) => {
    setLogoFormPosition({ left: left, top: top });
  };
  const  downloadImage=(e)=> {
    e.preventDefault();
    setStartDownload(true)
   
  }
  const stopDownload=(e)=>{
      setStartDownload(false)
      setCurrentImageIndex(0)
  }
 
  const addtextToStak = (e, text) => {
    e.preventDefault();

    
    setTextsToAdd({
      text: text,
      left: textXinputRef.current.value,
      top: textYinputRef.current.value,
      size:textSizeRef.current.value,
      color:color
    });
  };
  const addLogoToStack = (e) => {
    e.preventDefault();
    

      setLogosToAdd({
        logo: logoSource,
        left: logoXinputRef.current.value,
        top: logoYinputRef.current.value,
        size:logoSizeRef.current.value
      });
      
    
  };
  const getLogo =(e)=>{
    let file = e.target.files[0];
    
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
       
        setLogoSource(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    

  }
  const dragStart = (e) => {
    
    if (e.target.id === "text-manipulator") {
      const dx = e.clientX - e.target.offsetLeft;
      const dy = e.clientY - e.target.offsetTop - 170;
      setMousePositionInsideForm({ left: dx, top: dy });
    }
    if (e.target.id === "logo-manipulator") {
      const dx = e.clientX - e.target.offsetLeft;
      const dy = e.clientY - e.target.offsetTop - 170;
      setMousePositionInsideLogoForm({ left: dx, top: dy });
    }
  };
  const drag = (e) => {
    if (e.target.id === "text-manipulator") {
    setNewTextFormPosition(e.clientX, e.clientY - 170);
    textFormRef.current.classList.add("dragging");
    }
    if (e.target.id === "logo-manipulator") {
    setNewLogoFormPosition(e.clientX, e.clientY - 170);
    logoFormRef.current.classList.add("dragging");
    }
  };
  const dragEnd = (e) => {
    if (e.target.id === "text-manipulator") {
    setNewTextFormPosition(
      e.clientX - mousePositionInsideForm.left,
      e.clientY - 170 - mousePositionInsideForm.top
    );
    textFormRef.current.classList.remove("dragging");
    }
    if (e.target.id === "logo-manipulator") {
    setNewLogoFormPosition(
      e.clientX - mousePositionInsideLogoForm.left,
      e.clientY - 170 - mousePositionInsideLogoForm.top
    );
    logoFormRef.current.classList.remove("dragging");
    }
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
      }}
    >
      <Canvas
        getNextImage={getNextImage}
        getPrevtImage={getPrevtImage}
        canvasRef={canvasRef}
        textToAdd={textToAdd}
        startDownload={startDownload}
        logoToAdd={logoToAdd}
        imageSources={imageSources}
        currentImageIndex={currentImageIndex}
        stopDownload={stopDownload}
      />
      <TextEditor
        addtextToStak={addtextToStak}
        setColorVisibility={setColorVisibility}
        drag={drag}
        setColor={setColor}
        dragStart={dragStart}
        dragEnd={dragEnd}
        canvasRef={canvasRef}
        downloadImage={downloadImage}
        textConfigIsShown={textConfigIsShown}
        colorPickerIsVisible={colorPickerIsVisible}
        color={color}
        hideTextConfig={hideTextConfig}
        XinputRef={textXinputRef}
        YinputRef={textYinputRef}
        position={textFormPosition}
        formRef={textFormRef}
        
        textSizeRef={textSizeRef}
      />
      <LogoEditor
        
        drag={drag}
        addLogoToStack={addLogoToStack}
        getLogo={getLogo}
        dragStart={dragStart}
        dragEnd={dragEnd}
        
        logoConfigIsShown={logoConfigIsShown}    
        hideLogoConfig={hideLogoConfig}
        XinputRef={logoXinputRef}
        YinputRef={logoYinputRef}
        position={logoFormPosition}
        formRef={logoFormRef}
        
        logoSizeRef={logoSizeRef}
      />
    </div>
  );
};
export default ImageManipaulation;
