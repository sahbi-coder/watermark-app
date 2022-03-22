import Canvas from "../components/imageManipulation/Canvas";
import { useRef, useState, useContext } from "react";
import TextEditor from "../components/imageManipulation/textEditor";
import LogoEditor from "../components/imageManipulation/LogoEditor";

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

  const getNextImage = (e) => {
    e.preventDefault();
    if (currentImageIndex < imageSources.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };
  const getPrevtImage = (e) => {
    e.preventDefault();
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const setColorVisibility = (e) => {
    e.preventDefault();
    setColorPickerIsVisible(!colorPickerIsVisible);
  };

  function downloadImage(e, canvas) {
    e.preventDefault();
    const anchor = document.createElement("a");
    anchor.href = canvas.toDataURL("image/png");
    anchor.download = "IMAGE.PNG";
    anchor.click();
  }
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
  const getLogo = (e) => {
    let file = e.target.files[0];

    const fileReader = new FileReader();
    fileReader.onloadend = function () {
      

      setLogoSource(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };
  const removeLogofromStak = (e) => {
    e.preventDefault();
    const temp = [...logoToAdd];
    temp.pop();

    setLogosToAdd(temp)
  };
  const clearLogoStak = (e) => {
    e.preventDefault();
    setLogosToAdd([])
  };

  return (
    <div>
      <Canvas
        getNextImage={getNextImage}
        getPrevtImage={getPrevtImage}
        canvasRef={canvasRef}
        textToAdd={textToAdd}
        logoToAdd={logoToAdd}
        imageSources={imageSources}
        currentImageIndex={currentImageIndex}
      />
      <TextEditor
        addtextToStak={addtextToStak}
        setColorVisibility={setColorVisibility}
        setColor={setColor}
        downloadImage={downloadImage}
        textConfigIsShown={textConfigIsShown}
        colorPickerIsVisible={colorPickerIsVisible}
        color={color}
        hideTextConfig={hideTextConfig}
        XinputRef={textXinputRef}
        YinputRef={textYinputRef}
        formRef={textFormRef}
        canvasRef={canvasRef}
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
        canvasRef={canvasRef}
        logoSizeRef={logoSizeRef}
        removeLogofromStak={removeLogofromStak}
        clearLogoStak={clearLogoStak}
      />
    </div>
  );
};
export default ImageManipaulation;
