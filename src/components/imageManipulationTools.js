
import { ChromePicker } from "react-color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const ImageManipaulationTools = ({
    textConfigIsShown,
    setColorVisibility,
    colorPickerIsVisible,
    color,
    setColor,
    hideTextConfig,
    addtextToStak,
    drag,
    dragStart,
    dragEnd,
  
    position,
    formRef
}) => {
    const textRef = useRef(null)
    

  
  return (<>
    {textConfigIsShown?
    <form id='text-manipulator'style={{ width: 240,position:'absolute',...position}} className='bg-light p-2 rounded shadow-sm ' draggable onDragStart={dragStart} onDrag={drag} onDragEnd={dragEnd} ref={formRef}>
      <fieldset>
        <div className="mb-3 d-flex">
          <label htmlFor="text-field" className="form-label mx-1">
            text:
          </label>
          <textarea
            className="form-control"
            placeholder="choose a text"
            id="text-field"
            ref ={textRef}
           
          ></textarea>
        </div>
        <div className=" mb-3 d-flex">
          <label htmlFor="select-font" className="form-label mx-1">
            font:
          </label>
          <select id="select-font" className="form-select">
            <option>font 1</option>
            <option>font 2</option>
          </select>
        </div>

        <div className=" mb-3 d-flex" style={{ position: "relative" }}>
          <button
            className="btn btn-outline-secondary"
            onClick={setColorVisibility}
          >
            {!colorPickerIsVisible ? "pick a color" : "hide color picker"}
          </button>
          {colorPickerIsVisible ? (
            <div style={{ position: "absolute", left: "100%" ,top:'-100px'}}>
              <ChromePicker
                color={color}
                onChange={(color) => setColor(color)}
              />
            </div>
          ) : null}
        </div>
        <div className=" mb-3 d-flex">
          <label htmlFor="text-size-range" className="form-label mx-1">
            size:
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="5"
            id="text-size-range"
          ></input>
        </div>
        <div className=" mb-3 d-flex justify-content-end">
          <button className="btn btn-outline-primary mx-1" onClick={(e)=>{addtextToStak(e,textRef.current.value)}}>add text</button>
          <button className="btn  btn-outline-danger mx-1"onClick={hideTextConfig}>
            <FontAwesomeIcon icon={faCircleXmark} className="mx-1" />
            close
          </button>
        </div>
      </fieldset>
    </form>:null}
  </>
  )
};
export default ImageManipaulationTools;