import Canvas from "../components/manipulation/AllCanvas";
import TextEditor from "../components/manipulation/textEditor";
import LogoEditor from "../components/manipulation/LogoEditor";
import { ManipulationContextProvider } from "../helpers/ManipulationContext";
import Header from "../components/Header";
import Footer from "../components/footer";
import { useState,useEffect } from "react";

const ImageManipaulation = () => {
  const [isMobile,setIsMobile]=useState(false)
  useEffect(()=>{
  if (window.matchMedia("(max-width: 280px)").matches) {
      return  setIsMobile(true);
    }
  },[])
  return (
    <>
      <ManipulationContextProvider>
      <Header />
        <Canvas isMobile= {isMobile}/>
        <TextEditor />
        <LogoEditor />
      <Footer />
      </ManipulationContextProvider>
    </>
  );
};
export default ImageManipaulation;
