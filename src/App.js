import Home from "./routes/Home";
import { useEffect } from "react";
import UserOptions from "./routes/UserOptions";
import ImageManipaulation from "./routes/ImageManipulation";
import AllImagesManipaulation from "./routes/allImagesManipulation";
import { Routes, Route } from "react-router-dom";
import { AppContextProvider } from "./helpers/Context";
import Protected from "./components/Protected";
import { AuthContextProvider } from "./helpers/AuthContext";
import SignIn from "./routes/SignIn";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectedUrls = [
    "/user-options",
    "/image-manipulation",
    "/all-images-manipulation",
  ];
  useEffect(() => {
    if (~redirectedUrls.indexOf(location.pathname)) {
      navigate("/home");
    }
  }, []);

  return (
    <div
      style={{
        height:"100vh",
        width:"100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <AuthContextProvider>
        <AppContextProvider>
          <Routes>
            
            <Route
              path="/"
              exact
              element={
                <Protected>
                  <Home />
                </Protected>
              }
            ></Route>
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="/user-options"
              element={
                <Protected>
                  <UserOptions />
                </Protected>
              }
            ></Route>
            <Route
              path="/image-manipulation"
              element={
                <Protected>
                  <ImageManipaulation />
                </Protected>
              }
            ></Route>
            <Route
              path="/all-images-manipulation"
              element={
                <Protected>
                  <AllImagesManipaulation />
                </Protected>
              }
            ></Route>
          </Routes>
        </AppContextProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
