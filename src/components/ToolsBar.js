import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../helpers/Context";

const ToolsBar = () => {
  const location = useLocation()
  const {toggleMode,showTextConfig,showLogoConfig,paginationActivation,changeRoute} = useContext(AppContext);
  


  return (
    <div
      className={`d-md-flex ${
        location.pathname === "/user-options" ? "justify-content-between" : location.pathname === "/"?"justify-content-end":"justify-content-center"
      } align-items-center  bg-white py-2`}
    >
      {location.pathname !== "/" ? (
        <button
          id="prev"
          className="btn bg-light mx-1 text-primary"
          disabled={paginationActivation().previous}
          onClick={(e)=>{changeRoute(e);toggleMode(e)}}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="color-dark mx-2" />
          PREVIOUS STEP
        </button>
      ) : null}

      
      {(location.pathname === "/image-manipulation")||(location.pathname === "/all-images-manipulation") ? (
        <div className="py-1">
          <button className="btn bg-light mx-1 text-primary" onClick={showTextConfig}>ADD TEXT</button>
          <button className="btn bg-light mx-1 text-primary" onClick={showLogoConfig}>ADD LOGO</button>
         
        </div>
      ) : null}
     
     
      {location.pathname !== "/image-manipulation"&&location.pathname!=="/all-images-manipulation" ? (
        <button
          id="next"
          className="btn bg-light mx-1 text-primary"
          disabled={paginationActivation().next}
          onClick={(e)=>{changeRoute(e);toggleMode(e)}}
        >
          NEXT STEP
          <FontAwesomeIcon icon={faArrowRight} className="color-dark mx-2" />
        </button>
      ) : null}
    </div>
  );
};
export default ToolsBar;
