import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faDownload,
  faPlus,
  faMinus,
  faDeleteLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import useLogo from "../../hooks/useLogo";
import { useContext } from "react";
import { AppContext } from "../../helpers/Context";
import { ManipulationContext } from "../../helpers/ManipulationContext";

const LogoEditor = ({}) => {
  const { logoState, dispatchLogo, LOGO_ACTIONS } = useLogo();
  const { logoConfigIsShown, hideLogoConfig } = useContext(AppContext);
  const { state, ACTIONS, dispatch ,setStartDownload} = useContext(ManipulationContext);
  const setLogo = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    if (file.type.slice(0, 5) === "image") {
      const fileReader = new FileReader();
      fileReader.onloadend = function () {
        if (fileReader.result.slice(0, 10) === "data:image") {
          dispatchLogo({
            type: LOGO_ACTIONS.SET_LOGO,
            payload: fileReader.result,
          });
          return;
        }
        alert("file must be an image");
      };
      fileReader.readAsDataURL(file);
      return;
    }
    alert("file must be an image");
  };

  const setSize = (e) => {
    e.preventDefault();
    dispatchLogo({ type: LOGO_ACTIONS.SET_SIZE, payload: e.target.value });
  };
  const setX = (e) => {
    e.preventDefault();
    dispatchLogo({ type: LOGO_ACTIONS.SET_X, payload: e.target.value });
  };
  const setY = (e) => {
    e.preventDefault();
    dispatchLogo({ type: LOGO_ACTIONS.SET_Y, payload: e.target.value });
  };

  const addToStack = () => {
    if (!logoState.logo) {
      alert("you must provide a logo");
      return;
    }
    dispatch({ type: ACTIONS.ADD_TO_STACK, payload: logoState });
   
  };
  const clearStack = () => {
    dispatch({ type: ACTIONS.CLEAR_STACK });
  };
  const removeFromStack = () => {
    dispatch({ type: ACTIONS.REMOVE_FROM_STACK });
  };
  return (
    <>
      <Modal show={logoConfigIsShown}>
        <Modal.Body>
          <div className="input-group mb-3">
            <input
              type="file"
              className="form-control"
              id="logo-input"
              onChange={setLogo}
            />
          </div>

          <div className=" mb-3 d-flex">
            <label htmlFor="text-size" className="form-label mx-1">
              size:
            </label>
            <input
              type="number"
              min="0"
              max="100"
              id="text-size"
              onChange={setSize}
            />
          </div>
          <div className=" mb-3 d-flex">
            <label htmlFor="text-left-position" className="form-label mx-1">
              x position in %:
            </label>
            <input
              type="number"
              min="0"
              max="100"
              id="text-left-position"
              onChange={setX}
            />
          </div>
          <div className=" mb-3 d-flex">
            <label htmlFor="text-top-position" className="form-label mx-1">
              y position in %:
            </label>
            <input
              type="number"
              min="0"
              max="100"
              id="text-top-position"
              onChange={setY}
            />
          </div>

          <div className=" mb-3 d-flex justify-content-start">
            <button
              className="btn btn-outline-primary mx-1"
              onClick={addToStack}
            >
              <FontAwesomeIcon icon={faPlus} className="mx-1" />
              add
            </button>
            <button
              className="btn  btn-outline-warning mx-1"
              onClick={removeFromStack}
            >
              <FontAwesomeIcon icon={faMinus} className="mx-1" />
              remove
            </button>
            <button
              className="btn  btn-outline-danger mx-1"
              onClick={clearStack}
            >
              clear all
              <FontAwesomeIcon icon={faDeleteLeft} className="mx-1" />
            </button>
          </div>
          <div className=" mb-3 d-flex justify-content-start">
            <button
              className="btn  btn-outline-danger mx-1"
              onClick={hideLogoConfig}
            >
              <FontAwesomeIcon icon={faCircleXmark} className="mx-1" />
              close
            </button>
            <button className="btn  btn-outline-success mx-1" onClick={()=>{setStartDownload(true)}}>
              download
              <FontAwesomeIcon icon={faDownload} className="mx-1" />
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default LogoEditor;
