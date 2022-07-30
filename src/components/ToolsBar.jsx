import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import useActivate from "../hooks/useActivate";
import { useApp } from "../helpers/Context";
import { UserAuth } from "../helpers/AuthContext";
const ToolsBar = () => {
  const { logOut, user } = UserAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const {
    showTextConfig,
    showLogoConfig,
    modeIsSelected,
    isIndividualMode,
    imageSources,
    setImageSources
  } = useApp();
  const handleSignOut = async () => {
    try {
      await logOut();
      setImageSources([])
    } catch (error) {
      console.log(error);
    }
  };

  const { prevIsActive, nextIsActive, prevIsShown, nextIsShown } = useActivate(
    imageSources,
    modeIsSelected
  );

  const gotToNext = (e) => {
    if (location.pathname === "/") {
      if (modeIsSelected && isIndividualMode) {
        navigate("/image-manipulation");
      }
      if (modeIsSelected && !isIndividualMode) {
        navigate("/user-options");
      }
    }
    if (location.pathname === "/user-options") {
      if (modeIsSelected && isIndividualMode) {
        navigate("/image-manipulation");
      }
      if (modeIsSelected && !isIndividualMode) {
        navigate("/all-images-manipulation");
      }
    }
  };
  const gotToPrev = (e) => {
    if (location.pathname === "/user-options") {
      navigate("/");
    }
    if (location.pathname === "/all-images-manipulation") {
      navigate("/user-options");
    }
    if (location.pathname === "/image-manipulation") {
      if (imageSources.length > 1) {
        navigate("/user-options");
        return;
      }
      navigate("/");
    }
  };

  return (
    <div
      className={`d-md-flex ${
        location.pathname === "/user-options"
          ? "justify-content-between"
          : location.pathname === "/"
          ? "justify-content-end"
          : "justify-content-center"
      } align-items-center  bg-white py-2`}
    >
      {user && prevIsShown && (
        <button
          id="prev"
          className="btn bg-light mx-1 text-primary"
          disabled={!prevIsActive}
          onClick={gotToPrev}
        >
          <FontAwesomeIcon icon={faArrowLeft} className="color-dark mx-2" />
          PREVIOUS STEP
        </button>
      )}

      {(user && location.pathname === "/image-manipulation") ||
      (user && location.pathname === "/all-images-manipulation") ? (
        <div className="py-1">
          <button
            className="btn bg-light mx-1 text-primary"
            onClick={showTextConfig}
          >
            ADD TEXT
          </button>
          <button
            className="btn bg-light mx-1 text-primary"
            onClick={showLogoConfig}
          >
            ADD LOGO
          </button>
        </div>
      ) : null}

      {user && nextIsShown ? (
        <button
          id="next"
          className="btn bg-light mx-1 text-primary"
          disabled={!nextIsActive}
          onClick={gotToNext}
        >
          NEXT STEP
          <FontAwesomeIcon icon={faArrowRight} className="color-dark mx-2" />
        </button>
      ) : null}
      {user && (
        <button
          onClick={handleSignOut}
          className="btn bg-light mx-1 text-primary"
        >
          {" "}
          Logout
        </button>
      )}
    </div>
  );
};
export default ToolsBar;
