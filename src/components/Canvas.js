
import { text } from "@fortawesome/fontawesome-svg-core";
import { useEffect } from "react";

const Canvas = ({ canvasRef, textToAdd,imageSources }) => {
  useEffect(() => {

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let oldTxt
    let img = new Image()
    img.onload=function(){


      
      const aspectRatio  = img.naturalWidth/img.naturalHeight
      
      canvas.height =  canvas.width/aspectRatio
      img.height= canvas.height
      img.width = canvas.width
     
      ctx.drawImage(img,0,0,img.width,img.height)
      drawText(textToAdd.text,textToAdd.left,textToAdd.top)
    }
    img.src=imageSources[0]
    const drawText = (txt,xPos,yPos)=>{
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
      
      let x = xPos*canvas.width/100
      let y = yPos*canvas.height/100
      
    
      ctx.strokeText(txt, x, y);
      oldTxt=text
      
      
      
  }
  const clearText =()=>{
    let metrics = ctx.measureText(oldTxt);
      let w = metrics.width;
      ctx.clearRect(50, 110, w, -50);
  }
 
  
    
    
    // clearText()
  
  
  
 
}, [textToAdd]);

  return (
    <div className="d-flex justify-content-center mb-2 container">
      <canvas ref={canvasRef} width='600' />
    </div>
  );
};
export default Canvas;
