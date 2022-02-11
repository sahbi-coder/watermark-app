import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../helpers/Context";

const ToolsBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { imageSource,toggleMode,modeSelector } = useContext(AppContext);
  

  const paginationActivation = () => {
    switch (location.pathname) {
      case "/":
        return {
          previous: true,
          next: imageSource.length ? false : true,
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
          imageSource.length > 1
        ) {
          navigate("/user-options", { state: "/" });
          break;
        }

        if (e.target.id === "next" && !paginationActivation().next) {
          navigate("/image-manipulation", { state: "/" });
        }
        break;
      case "/user-options":
        if (e.target.id === "next" && !paginationActivation().next) {
          navigate("/image-manipulation", { state: "/user-options" });
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
      default:
        break;
    }
  };

  return (
    <div
      className={`d-flex ${
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

      
      {location.pathname === "/image-manipulation" ? (
        <div>
          <button className="btn bg-light mx-1 text-primary">ADD TEXT</button>
          <button className="btn bg-light mx-1 text-primary">ADD LOGO</button>
          <button className="btn bg-light mx-1 text-primary">
            REMOVE WATERMARK
          </button>
        </div>
      ) : null}
      {location.pathname !== "/image-manipulation" ? (
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
