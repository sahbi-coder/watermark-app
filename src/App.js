import Header from "./components/Header";
import Home from "./routes/Home";
import Footer from "./components/footer";
import { AppContext } from "./helpers/Context";
import { useState, useEffect } from "react";
import UserOptions from "./routes/UserOptions";
import ImageManipaulation from "./routes/ImageManipulation";
import AllImagesManipaulation from "./routes/allImagesManipulation";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import useMode from "./hooks/useMode";
import useGetImages from "./hooks/useGetImages";
import useToggle from "./hooks/useToggle";

function App() {
  const redirectedUrls = [
    "/user-options",
    "/image-manipulation",
    "/all-images-manipulation",
  ];

  const { imageSources, handleUploadedImages, getImagesFromDrive } =
    useGetImages();
  const {
    showLogoConfig,
    hideLogoConfig,
    showTextConfig,
    hideTextConfig,
    textConfigIsShown,
    logoConfigIsShown,
  } = useToggle();

  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (~redirectedUrls.indexOf(location.pathname)) {
      navigate("/");
    }
  }, []);
  const [isIndividual, setIsIndividual] = useState(null);
  const { modeIsSelected, isIndividualMode } = useMode(
    isIndividual,
    imageSources
  );

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
        value={{
          handleUploadedImages,
          setIsIndividual,
          showTextConfig,
          hideTextConfig,
          showLogoConfig,
          hideLogoConfig,
          getImagesFromDrive,
          textConfigIsShown,
          logoConfigIsShown,
          modeIsSelected,
          isIndividualMode,
          imageSources,
        }}
      >
        <Header />
        <main
          style={{
            marginTop: 170,
            position: "relative",
          }}
          className="main"
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
