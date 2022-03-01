
import { ChromePicker } from "react-color";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCircleXmark, faDownload, faPalette, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";


const TextEditor = ({
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
    XinputRef,
    YinputRef,
    position,
    formRef,
    downloadImage,
    canvasRef,
    textSizeRef
    
    
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
            <FontAwesomeIcon icon={faPalette} className='mx-1'/>{!colorPickerIsVisible ? "pick a color" : "hide color picker"}
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
          <label htmlFor="text-size" className="form-label mx-1">
            size:
          </label>
          <input
            type="number"
            ref={textSizeRef}
            min="0"
            max="100"
            id="text-size"
          ></input>
          
        </div>
        <div className=" mb-3 d-flex">
          <label htmlFor="text-left-position" className="form-label mx-1">
            x position in %:
          </label>
        <input ref={XinputRef}
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
          <button className="btn btn-outline-primary mx-1" 
          onClick={(e)=>{addtextToStak(e,textRef.current.value)}}>
            <FontAwesomeIcon icon={faPlus} className="mx-1" />
            add text</button>
          <button className="btn  btn-outline-danger mx-1"onClick={hideTextConfig}>
            <FontAwesomeIcon icon={faCircleXmark} className="mx-1" />
            close
          </button>
        </div>
          <div className=" mb-3 d-flex justify-content-start" >
        <button className="btn  btn-outline-success mx-1"onClick={(e)=>{downloadImage(e,canvasRef.current)} }>
            <FontAwesomeIcon icon={faDownload} className="mx-1" />
            download image 
          </button>
  
          </div>
      </fieldset>
    </form>:null}
  </>
  )
};
export default TextEditor;