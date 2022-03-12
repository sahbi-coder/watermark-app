import Header from "./components/Header";
import Home from "./routes/Home";

import Footer from "./components/footer";
import { AppContext } from "./helpers/Context";
import { useState,useEffect } from "react";
import UserOptions from "./routes/UserOptions";
import ImageManipaulation from "./routes/ImageManipulation";
import AllImagesManipaulation from "./routes/allImagesManipulation"
import { useLocation, useNavigate ,Routes, Route} from "react-router-dom";

function App() {
  const redirectedUrls = ["/user-options","/image-manipulation","/all-images-manipulation"]
  const [imageSources, setImageSources] = useState([]);
  const location = useLocation();
 
  const navigate = useNavigate();
  

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
        files.push([fileReader.result]);
        if (files.length === e.target.files.length) setImageSources(files);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const getImagesFromDrive = (data) => {
    setImageSources([data.map(i=>i.result.webContentLink)])
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
  const paginationActivation = () => {
    switch (location.pathname) {
      case "/":
        return {
          previous: true,
          next: imageSources.length ? false : true,
        };
      case "/user-options":
        return {
          previous: false,
          next: modeSelector.modeIsSelected ? false : true,
        };
      case "/image-manipulation":
        return {
          previous: false,
          next: true,
        };
      case "/all-images-manipulation":
        return {
          previous: false,
          next: true,
        };
      default:
        return {
          previous: true,
          next: true,
        };
    }
  };
  const changeRoute = (e) => {
    switch (location.pathname) {
      case "/":
        if (
          e.target.id === "next" &&
          !paginationActivation().next &&
          imageSources.length > 1
        ) {
          navigate("/user-options", { state: "/" });
          break;
        }

        if (e.target.id === "next" && !paginationActivation().next) {
          navigate("/image-manipulation", { state: "/" });
        }
        break;
      case "/user-options":
        if (e.target.id === "next" && !paginationActivation().next&&modeSelector.isIndividual) {
          navigate("/image-manipulation", { state: "/user-options" });
          break;
        }
        if (e.target.id === "next" && !paginationActivation().next&&!modeSelector.isIndividual) {
          navigate("/all-images-manipulation", { state: "/user-options" });
          break;
        }
        if ((e.target.id === "prev", { state: "/user-options" })) {
          navigate("/");
        }
        break;
      case "/image-manipulation":
        if (e.target.id === "prev" && !paginationActivation().prev) {
          if (location.state === "/") {
            navigate("/");
            break;
          }

          if (location.state === "/user-options") {
            navigate("/user-options");
          }
        }
        break;
      case "/all-images-manipulation":
        if (e.target.id === "prev" && !paginationActivation().prev) {
          if (location.state === "/") {
            navigate("/");
            break;
          }

          if (location.state === "/user-options") {
            navigate("/user-options");
          }
        }
        break;
      default:
        break;
    }
   
   
  };

  const removeWaterMark  =()=>{

  }
  const getPreviousVersion = ()=>{
    
  }
  const getNextVersion = ()=>{

  }

 
  
  useEffect(() => {
    if (~redirectedUrls.indexOf(location.pathname) ) {
      navigate("/");
    }
  }, []);

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
          ,showLogoConfig,hideLogoConfig,logoConfigIsShown,getImagesFromDrive,paginationActivation,changeRoute
        }}
      >
        <Header />
        <main
          style={{
            marginTop: 170,
            position:'relative',
           
          }}
          className='main'
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
