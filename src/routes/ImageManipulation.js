import Canvas from "../components/imageManipulation/Canvas";
import { useRef, useState, useContext } from "react";
import TextEditor from "../components/imageManipulation/TextEditor";
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
  const [currentImageIndex, setCurrentImageInsex] = useState(0);
  const [textToAdd, setTextsToAdd] = useState({
    text: "",
    top: 0,
    left: 0,
    size: 24,
    color: "#fff",
  });
  const [logoToAdd, setLogosToAdd] = useState({
    logo: "",
    top: 0,
    left: 0,
    size: 0,
  });

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
      setCurrentImageInsex(currentImageIndex + 1);
    }
  };
  const getPrevtImage = (e) => {
    e.preventDefault();
    if (currentImageIndex > 0) {
      setCurrentImageInsex(currentImageIndex - 1);
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

    setTextsToAdd({
      text: text,
      left: textXinputRef.current.value,
      top: textYinputRef.current.value,
      size: textSizeRef.current.value,
      color: color,
    });
  };
  const addLogoToStack = (e) => {
    e.preventDefault();

    setLogosToAdd({
      logo: logoSource,
      left: logoXinputRef.current.value,
      top: logoYinputRef.current.value,
      size: logoSizeRef.current.value,
    });
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
      />
    </div>
  );
};
export default ImageManipaulation;
