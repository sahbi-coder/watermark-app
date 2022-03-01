

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faDownload,
  
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const LogoEditor = ({
  logoConfigIsShown,
 
  hideLogoConfig,
  addLogoToStack,
  drag,
  dragStart,
  dragEnd,
  XinputRef,
  YinputRef,
  position,
  formRef,
  downloadImage,
  canvasRef,
  getLogo,
  logoSizeRef
}) => {
  const logoRef = useRef(null);

  return (
    <>
      {logoConfigIsShown ? (
        <form
          id="logo-manipulator"
          style={{ width: 240, position: "absolute", ...position }}
          className="bg-light p-2 rounded shadow-sm "
          draggable
          onDragStart={dragStart}
          onDrag={drag}
          onDragEnd={dragEnd}
          ref={formRef}
        >
          <fieldset>
            <div className="input-group mb-3">
              <input
                type="file"
                className="form-control"
                id="logo-input"
                onChange={getLogo}
                ref={logoRef}
              />
            
            </div>

          
            <div className=" mb-3 d-flex">
              <label htmlFor="text-size" className="form-label mx-1">
                size:
              </label>
              <input type="number" min="0" max="100" id="text-size" ref={logoSizeRef}></input>
            </div>
            <div className=" mb-3 d-flex">
              <label htmlFor="text-left-position" className="form-label mx-1">
                x position in %:
              </label>
              <input
                ref={XinputRef}
                type="number"
                min="0"
                max="100"
                id="text-left-position"
              ></input>
            </div>
            <div className=" mb-3 d-flex">
              <label htmlFor="text-top-position" className="form-label mx-1">
                y position in %:
              </label>
              <input
                ref={YinputRef}
                type="number"
                min="0"
                max="100"
                id="text-top-position"
              ></input>
            </div>
            <div className=" mb-3 d-flex justify-content-start">
              <button
                className="btn btn-outline-primary mx-1"
                onClick={
                    addLogoToStack
                }
              >
                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                add text
              </button>
              <button
                className="btn  btn-outline-danger mx-1"
                onClick={hideLogoConfig}
              >
                <FontAwesomeIcon icon={faCircleXmark} className="mx-1" />
                close
              </button>
            </div>
            <div className=" mb-3 d-flex justify-content-start">
              <button
                className="btn  btn-outline-success mx-1"
                onClick={(e) => {
                  downloadImage(e, canvasRef.current);
                }}
              >
                <FontAwesomeIcon icon={faDownload} className="mx-1" />
                download image
              </button>
            </div>
          </fieldset>
        </form>
      ) : null}
    </>
  );
};
export default LogoEditor;
