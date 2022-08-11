import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import useActivate from "../hooks/useActivate";
import { useApp } from "../helpers/Context";
import { UserAuth } from "../helpers/AuthContext";
import { useEffect } from "react";
import { useState } from "react";
const ToolsBar = () => {
  const { logOut, user } = UserAuth();
  const [isMobileBelow360,setIsMobileBelow360]= useState(false)
  const location = useLocation();
  const navigate = useNavigate();
  const {
    showTextConfig,
    showLogoConfig,
    modeIsSelected,
    isIndividualMode,
    imageSources,
    setImageSources,
  } = useApp();
  const handleSignOut = async () => {
    try {
      await logOut();
      setImageSources([]);
    } catch (error) {
      console.log(error);
    }
  };

  const { prevIsActive, nextIsActive, prevIsShown, nextIsShown } = useActivate(
    imageSources,
    modeIsSelected
  );

  const gotToNext = (e) => {
    if (location.pathname === "/watermark-app") {
      if (modeIsSelected && isIndividualMode) {
        navigate("/watermark-app/image-manipulation");
      }
      if (modeIsSelected && !isIndividualMode) {
        navigate("/watermark-app/user-options");
      }
    }
    if (location.pathname === "/watermark-app/user-options") {
      if (modeIsSelected && isIndividualMode) {
        navigate("/watermark-app/image-manipulation");
      }
      if (modeIsSelected && !isIndividualMode) {
        navigate("/watermark-app/all-images-manipulation");
      }
    }
  };
  const gotToPrev = (e) => {
    if (location.pathname === "/watermark-app/user-options") {
      navigate("/watermark-app");
    }
    if (location.pathname === "/watermark-app/all-images-manipulation") {
      navigate("/watermark-app/user-options");
    }
    if (location.pathname === "/watermark-app/image-manipulation") {
      if (imageSources.length > 1) {
        navigate("/watermark-app/user-options");
        return;
      }
      navigate("/watermark-app");
    }
  };
  useEffect(()=>{
    if(window.matchMedia("(max-width: 360px)").matches){
      return setIsMobileBelow360(true)
    }
    setIsMobileBelow360(false)
  },[])

  return (
    <div
      className={`d-flex ${
        location.pathname === "/watermark-app/user-options"
          ? "justify-content-between"
          : location.pathname === "/watermark-app"
          ? "justify-content-end"
          : "justify-content-center"
      } align-items-center  bg-white py-2`}
    >
      {user && prevIsShown && (
        <button
          id="prev"
          className="btn bg-light mx-1 text-primary tools-bar-btn"
          disabled={!prevIsActive}
          onClick={gotToPrev}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="color-dark mx-2" />
          {isMobileBelow360?'PREV':'PREVIOUS STEP'}
        </button>
      )}

      {(user && location.pathname === "/watermark-app/image-manipulation") ||
      (user && location.pathname === "/watermark-app/all-images-manipulation") ? (
        <div className="py-1">
          <button
            className="btn bg-light m-1 text-primary tools-bar-btn"
            onClick={showTextConfig}
          >
            {isMobileBelow360?"TEXT":"ADD TEXT"}
           
          </button>
          <button
            className="btn bg-light m-1 text-primary tools-bar-btn"
            onClick={showLogoConfig}
          >
            {isMobileBelow360?"LOGO":"ADD LOGO"}
          </button>
        </div>
      ) : null}

      {user && (
        <button
          onClick={handleSignOut}
          className="btn bg-light mx-1 text-primary tools-bar-btn"
        >
          {" "}
          Logout
        </button>
      )}
      {user && nextIsShown ? (
        <button
          id="next"
          className="btn bg-light mx-1 text-primary tools-bar-btn"
          disabled={!nextIsActive}

          onClick={gotToNext}
        >
          {isMobileBelow360?'NEXT':'NEXT STEP'}
          <FontAwesomeIcon icon={faArrowRight} className="color-dark mx-2 tools-bar-btn" />
        </button>
      ) : null}
    </div>
  );
};
export default ToolsBar;
