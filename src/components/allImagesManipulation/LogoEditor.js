import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faDownload,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

const LogoEditor = ({
  logoConfigIsShown,

  hideLogoConfig,
  addLogoToStack,

  XinputRef,
  YinputRef,

  formRef,
  downloadImage,

  getLogo,
  logoSizeRef,
}) => {
  const logoRef = useRef(null);
  useEffect(() => {
    if (logoConfigIsShown) {
      Draggable.create("#logo-manipulator", {
        bounds: ".main",
      });
    }
  }, [logoConfigIsShown]);

  return (
    <>
      {logoConfigIsShown ? (
        <form
          id="logo-manipulator"
          style={{ minWidth: "20vw", position: "absolute", left: 10, top: 10 }}
          className="bg-light p-2 rounded shadow-sm "
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
              <input
                type="number"
                min="0"
                max="100"
                id="text-size"
                ref={logoSizeRef}
                
              ></input>
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
                onClick={addLogoToStack}
              >
                <FontAwesomeIcon icon={faPlus} className="mx-1" />
                add logo
              </button>
              <button
                className="btn  btn-outline-danger mx-1"
                onClick={hideLogoConfig}
              >
                <FontAwesomeIcon icon={faCircleXmark} className="mx-1" />
                close
              </button>
              <button
                className="btn  btn-outline-success mx-1"
                onClick={downloadImage}
              >
                download
                <FontAwesomeIcon icon={faDownload} className="mx-1" />
              </button>
            </div>
          </fieldset>
        </form>
      ) : null}
    </>
  );
};
export default LogoEditor;
