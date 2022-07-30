import { createContext } from "react";
import { useState,useContext } from "react";
import useMode from "../hooks/useMode";
import useGetImages from "../hooks/useGetImages";
import useToggle from "../hooks/useToggle";
const AppContext = createContext();
export const AppContextProvider = ({ children }) => {
    const { imageSources, handleUploadedImages, getImagesFromDrive,setImageSources } =
    useGetImages();
  const {
    showLogoConfig,
    hideLogoConfig,
    showTextConfig,
    hideTextConfig,
    textConfigIsShown,
    logoConfigIsShown,
  } = useToggle();

  
  const [isIndividual, setIsIndividual] = useState(null);
  const { modeIsSelected, isIndividualMode } = useMode(
    isIndividual,
    imageSources
  );
 

  return (
    <AppContext.Provider    value={{
        handleUploadedImages,
        setIsIndividual,
        showTextConfig,
        hideTextConfig,
        showLogoConfig,
        hideLogoConfig,
        getImagesFromDrive,
        setImageSources,
        textConfigIsShown,
        logoConfigIsShown,
        modeIsSelected,
        isIndividualMode,
        imageSources,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};