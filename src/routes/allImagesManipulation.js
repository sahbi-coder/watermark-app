import Canvas from "../components/allImagesManipulation/Canvas";
import { useRef, useState, useContext } from "react";
import TextEditor from "../components/allImagesManipulation/textEditor";
import LogoEditor from "../components/allImagesManipulation/LogoEditor";

import { AppContext } from "../helpers/Context";

const ImageManipaulation = () => {
  const [color, setColor] = useState("#fff");

  const [colorPickerIsVisible, setColorPickerIsVisible] = useState(false);
  const {
    textConfigIsShown,
    hideTextConfig,
    hideLogoConfig,
    logoConfigIsShown,
  } = useContext(AppContext);
  const { imageSources } = useContext(AppContext);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textToAdd, setTextsToAdd] = useState([]);
  const [logoToAdd, setLogosToAdd] = useState([]);

  const [startDownload, setStartDownload] = useState(false);

  const [logoSource, setLogoSource] = useState("");
  const textFormRef = useRef(null);
  const textXinputRef = useRef(null);
  const textYinputRef = useRef(null);
  const logoFormRef = useRef(null);
  const logoXinputRef = useRef(null);
  const logoYinputRef = useRef(null);
  const canvasRef = useRef(null);
  const textSizeRef = useRef(null);
  const logoSizeRef = useRef(null);

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

  const downloadImage = (e) => {
    e.preventDefault();
    setStartDownload(true);
  };
  const stopDownload = (e) => {
    setStartDownload(false);
    setCurrentImageIndex(0);
  };

  const addtextToStak = (e, text) => {
    e.preventDefault();
    const temp = [...textToAdd];
    if (
      text &&
      textXinputRef.current.value &&
      textYinputRef.current.value &&
      textSizeRef.current.value &&
      color
    ) {
      temp.push({
        text: text,
        left: textXinputRef.current.value,
        top: textYinputRef.current.value,
        size: textSizeRef.current.value,
        color: color,
      });
      setTextsToAdd(temp);
    } else {
      alert("you must fill inputs in order to add text");
    }
  };
  const removetextfromStak = (e) => {
    e.preventDefault();
    const temp = [...textToAdd];
    temp.pop();

    setTextsToAdd(temp);
  };
  const clearStak = (e) => {
    e.preventDefault();
    setTextsToAdd([]);
  };
  const addLogoToStack = (e) => {
    e.preventDefault();
    const temp = [...logoToAdd,{
      logo: logoSource,
      left: logoXinputRef.current.value,
      top: logoYinputRef.current.value,
      size: logoSizeRef.current.value,
    }]
    setLogosToAdd(temp);
  };
  const removeLogofromStak = (e) => {
    e.preventDefault();
    const temp = [...logoToAdd];
    temp.pop();

    setLogosToAdd(temp)
  };
  const clearLogostack = (e) => {
    e.preventDefault();
    setLogosToAdd([])
  };
  const getLogo = (e) => {
    
    let file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      setLogoSource(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div>
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
        setColor={setColor}
        canvasRef={canvasRef}
        downloadImage={downloadImage}
        textConfigIsShown={textConfigIsShown}
        colorPickerIsVisible={colorPickerIsVisible}
        color={color}
        hideTextConfig={hideTextConfig}
        XinputRef={textXinputRef}
        YinputRef={textYinputRef}
        formRef={textFormRef}
        textSizeRef={textSizeRef}
        clearStak={clearStak}
        removetextfromStak={removetextfromStak}
      />
      <LogoEditor
        addLogoToStack={addLogoToStack}
        getLogo={getLogo}
        downloadImage={downloadImage}
        logoConfigIsShown={logoConfigIsShown}
        hideLogoConfig={hideLogoConfig}
        XinputRef={logoXinputRef}
        YinputRef={logoYinputRef}
        formRef={logoFormRef}
        logoSizeRef={logoSizeRef}
        removeLogofromStak={removeLogofromStak}
        clearLogostack={clearLogostack}
        
      />
    </div>
  );
};
export default ImageManipaulation;
