import { ChromePicker } from "react-color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AppContext } from "../../helpers/Context";
import {
  faCircleXmark,
  faDeleteLeft,
  faDownload,
  faMinus,
  faPalette,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import { Modal } from "react-bootstrap";
import useText from "../../hooks/useText";
import useStack from "../../hooks/useStack";
import { useContext, useState } from "react";

const TextEditor = ({}) => {
  const { textState, dispatchText, TEXT_ACTIONS } = useText();
  const { textConfigIsShown, hideTextConfig } = useContext(AppContext);
  const [colorPicker, setColorPicker] = useState(false);
  const { state, ACTIONS, dispatch } = useStack();
  const setText = (e) => {
    e.preventDefault();
    dispatchText({ type: TEXT_ACTIONS.SET_TEXT, payload: e.target.value||'watermark' });
  };
  const setFamily = (e) => {
   
    dispatchText({ type: TEXT_ACTIONS.SET_FAMILY, payload: e.target.value });
  };
  const setSize = (e) => {
    e.preventDefault();
    dispatchText({ type: TEXT_ACTIONS.SET_SIZE, payload: e.target.value||'16px' });
  };
  const setX = (e) => {
    e.preventDefault();
    dispatchText({ type: TEXT_ACTIONS.SET_X, payload: e.target.value||10 });
  };
  const setY = (e) => {
    e.preventDefault();
    dispatchText({ type: TEXT_ACTIONS.SET_Y, payload: e.target.value||10 });
  };
  const setAngle = (e) => {
    e.preventDefault();
    dispatchText({ type: TEXT_ACTIONS.SET_ANGLE, payload: e.target.value||0 });
  };
  const setcolor = (color) => {
    dispatchText({ type: TEXT_ACTIONS.SET_COLOR, payload: color });
  };
  const addToStack = () => {
    dispatch({ type: ACTIONS.ADD_TO_STACK, payload: textState });
    console.log(state);
  };
  const clearStack = () => {
    dispatch({ type: ACTIONS.CLEAR_STACK });
  };
  const removeFromStack = () => {
    dispatch({ type: ACTIONS.REMOVE_FROM_STACK });
  };
  return (
    <>
      <Modal show={textConfigIsShown}>
        <Modal.Body>
          <div className="mb-3 d-flex">
            <label htmlFor="text-field" className="form-label mx-1">
              text:
            </label>
            <textarea
              className="form-control"
              placeholder="choose a text"
              id="text-field"
              onChange={setText}
            ></textarea>
          </div>
          <div className=" mb-3 d-flex">
            <label htmlFor="select-font" className="form-label mx-1">
              font:
            </label>
            <select
              id="select-font"
              className="form-select"
              onChange={setFamily}
            >
              <option>font 1</option>
              <option>font 2</option>
            </select>
          </div>
          <div className=" mb-3 d-flex">
            <label htmlFor="set-angle" className="form-label mx-1">
              angle:
            </label>
            <input
              type="number"
              min="0"
              max="360"
              id="set-angle"
              onChange={setAngle}
            
            />
           
          </div>

          <div className=" mb-3 d-flex" style={{ position: "relative" }}>
            <button
              className="btn btn-outline-secondary"
              onClick={() => {
                setColorPicker((colorPicker) => !colorPicker);
              }}
            >
              <FontAwesomeIcon icon={faPalette} className="mx-1" />
              {!colorPicker ? "pick a color" : "hide color picker"}
            </button>
            {colorPicker ? (
              <div
                style={{ position: "absolute", left: "100%", top: "-100px" }}
              >
                <ChromePicker onChange={setcolor} color={textState.color}/>
              </div>
            ) : null}
          </div>
          <div className=" mb-3 d-flex">
            <label htmlFor="text-size" className="form-label mx-1">
              size:
            </label>
            <input type="number" min="0" max="100" id="text-size" onChange={setSize}/>
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
              <FontAwesomeIcon icon={faDeleteLeft} className="mx-1" />
              clear All
            </button>
          </div>
          <div className=" mb-3 d-flex justify-content-start">
            <button className="btn  btn-outline-danger mx-1"   onClick={hideTextConfig}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="mx-1"
              
              />
              close
            </button>
            <button className="btn  btn-outline-success mx-1">
              download
              <FontAwesomeIcon icon={faDownload} className="mx-1" />
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TextEditor;
