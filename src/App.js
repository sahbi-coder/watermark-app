import Header from "./components/generalsComponents/Header";
import Home from "./routes/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import Footer from "./components/generalsComponents/footer";
import { AppContext } from "./helpers/Context";
import { useState } from "react";
import UserOptions from "./routes/UserOptions";
import ImageManipaulation from "./routes/ImageManipulation";
import AllImagesManipaulation from "./routes/allImagesManipulation"

function App() {
  const [imageSources, setImageSources] = useState([]);
  const location = useLocation();
  

  const [modeSelector, setModeSelector] = useState({
    modeIsSelected: false,
    isIndividual: true,
  });
  const [textConfigIsShown,setTextConfigIsShown]=useState(false)
  const showTextConfig=(e)=>{
    
    setTextConfigIsShown(true)
  }
  const hideTextConfig = (e)=>{
   
    setTextConfigIsShown(false)
  }
  const [logoConfigIsShown,setLogoConfigIsShown]=useState(false)
  const showLogoConfig=(e)=>{
    
    setLogoConfigIsShown(true)
  }
  const hideLogoConfig = (e)=>{
   
    setLogoConfigIsShown(false)
  }
  
  const handleUploadedImages = (e) => {
    let files = [];
    for (let file of e.target.files) {
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        files.push(fileReader.result);
        if (files.length === e.target.files.length) setImageSources(files);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const getImagesFromDrive = (data) => {
    setImageSources(data.map(i=>i.result.webContentLink))
  }
  
  const toggleMode = (e) => {
    if (e.target.id === "individual") {
      setModeSelector({ modeIsSelected: true, isIndividual: true });

      return;
    }
    if (e.target.id === "multiple") {
      setModeSelector({ modeIsSelected: true, isIndividual: false });

      return;
    }
    if (e.target.id === "next" && location.pathname === "/user-options") {
      setModeSelector({
        modeIsSelected: true,
        isIndividual: modeSelector.isIndividual,
      });

      return;
    }
    if (e.target.id === "prev" && location.pathname === "/user-options") {
      setModeSelector({ modeIsSelected: false, isIndividual: true });

      return;
    }
    if (e.target.id === "prev" && location.pathname === "/image-manipulation") {
      setModeSelector({ modeIsSelected: false, isIndividual: true });

      return;
    }
  };

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        
      }}
    >
      <AppContext.Provider
        value={{ imageSources, handleUploadedImages, toggleMode, modeSelector 
          ,showTextConfig,hideTextConfig,textConfigIsShown
          ,showLogoConfig,hideLogoConfig,logoConfigIsShown,getImagesFromDrive
        }}
      >
        <Header />
        <main
          style={{
            marginTop: 170,
            position:'relative',
           
          }}
        >
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/user-options" element={<UserOptions />}></Route>
            <Route
              path="/image-manipulation"
              element={<ImageManipaulation />}
            ></Route>
            <Route
              path="/all-images-manipulation"
              element={<AllImagesManipaulation />}
            ></Route>
          </Routes>
        </main>

        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
