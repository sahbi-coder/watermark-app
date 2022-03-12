import Canvas from "../components/allImagesManipulation/Canvas";
import { useRef, useState, useContext } from "react";
import TextEditor from "../components/allImagesManipulation/TextEditor";
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
      />
    </div>
  );
};
export default ImageManipaulation;
