import Header from "./components/Header";
import Home from "./routes/Home";
import { Routes, Route, useLocation, } from "react-router-dom";
import Footer from "./components/footer";
import { AppContext } from "./helpers/Context";
import { useState } from "react";
import UserOptions from "./routes/UserOptions";
import ImageManipaulation from "./routes/ImageManipulation";

function App() {
  
  const [imageSource, setImageSource] = useState([]);
  const location = useLocation()

  const [modeSelector,setModeSelector]=useState({modeIsSelected:false,isIndividual:true})
  const handleUploadedImages = (e) => {
    let files = [];
    for (let file of e.target.files) {
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        files.push(fileReader.result);
        if (files.length === e.target.files.length) setImageSource(files);
      };
      fileReader.readAsDataURL(file);
    }
  };
  const toggleMode = (e)=>{
   
    if(e.target.id==='individual'){
      
       setModeSelector({modeIsSelected:true,isIndividual:true})
      
      return
    
    }
    if(e.target.id==='multiple'){
      
      setModeSelector({modeIsSelected:true,isIndividual:false})
      
      return
    
    }
    if(e.target.id==='next'&&location.pathname==='/user-options'){
      
      setModeSelector({modeIsSelected:true,isIndividual:modeSelector.isIndividual})
      
      return
    
    }
    if(e.target.id==='prev'&&location.pathname==='/user-options'){
      
      setModeSelector({modeIsSelected:false,isIndividual:true})
      
      return
    
    }
    if(e.target.id==='prev'&&location.pathname==='/image-manipulation'){
      
      setModeSelector({modeIsSelected:false,isIndividual:true})
      
      return
    
    }

    
   
  }
  


  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >

      <AppContext.Provider value={{imageSource,handleUploadedImages,toggleMode,modeSelector}}>

      <Header />

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/user-options" element={<UserOptions />} ></Route>
        <Route path="/image-manipulation" element={<ImageManipaulation/>}></Route>

      </Routes>
     
      < Footer />
      </AppContext.Provider>
     
    </div>
  );
}

export default App;
