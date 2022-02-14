
import { text } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";
const Canvas = ({ canvasRef, textToAdd }) => {
  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let oldTxt
    const drawText = (txt)=>{
      // normal, italic, bold
      // px pt cm in rem em
      // any installed or imported font
      // let oldTxt
      let fontFamily = 'Allerta Stencil';
      ctx.font = `normal 40px xyz, ${fontFamily}, Helvetica, Arial, monospace`;
      ctx.fillStyle = 'cornflowerblue';
      ctx.strokeStyle = '#bada55';
      //textAlign center, left, right, end, start
      ctx.textAlign = 'start';
      //textBaseline top, hanging, middle, bottom,ideographic, alphabetic
      ctx.textBaseline = 'alphabetic';
      //direction ltr, rtl, inherit
      ctx.direction = 'ltr';
      
      
      
    
      ctx.strokeText(txt, 50, 100);
      oldTxt=text
      
      
      
  }
  const clearText =()=>{
    let metrics = ctx.measureText(oldTxt);
      let w = metrics.width;
      ctx.clearRect(50, 110, w, -50);
  }
  
    drawText(textToAdd)
    
    // clearText()
  
  
  
 
}, [textToAdd]);

  return (
    <div className="d-flex justify-content-center mb-2 container">
      <canvas ref={canvasRef} style={{ width: "80%" }} />
    </div>
  );
};
export default Canvas;
