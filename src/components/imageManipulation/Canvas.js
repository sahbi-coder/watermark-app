import { text } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Canvas = ({
  canvasRef,
  textToAdd,
  imageSources,
  currentImageIndex,
  getNextImage,
  getPrevtImage,
  logoToAdd,
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const img = new Image();

    img.onload = function () {
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      canvas.width = canvas.height * aspectRatio;
      img.height = canvas.height;
      img.width = canvas.width;
     

      ctx.drawImage(img, 0, 0, img.width, img.height);
      

        textToAdd.forEach((text,i) => {
          
          drawText(
            text.text,
            text.left,
            text.top,
            text.size,
            text.color
          );
        });
       
        logoToAdd.forEach(logo=>{
          drawLogo(logo)
        })
      
    };
  

      img.src = imageSources[currentImageIndex];
      
    const drawText = (txt, xPos, yPos, size, color) => {
      const fontFamily = "Allerta Stencil";
      ctx.font = `normal ${size}px xyz, ${fontFamily}, Helvetica, Arial, monospace`;
      ctx.fillStyle = "cornflowerblue";

      ctx.strokeStyle = `${color.hex}`;

      ctx.textAlign = "start";

      ctx.textBaseline = "alphabetic";

      ctx.direction = "ltr";

      const x = (xPos * canvas.width) / 100;
      const y = (yPos * canvas.height) / 100;

      ctx.strokeText(txt, x, y);
      
    };
    const drawLogo= (l)=>{
      const logo = new Image();
      logo.onload = function () {
        logo.width = l.size;
        logo.height = l.size;
        const x = (l.left * canvas.width) / 100;
      const y = (l.top * canvas.height) / 100;

        ctx.drawImage(
          logo,
          x,
          y,
          logo.width,
          logo.height
        );
      };
      logo.src =l.logo;
    }
   
  }, [textToAdd, currentImageIndex, logoToAdd]);

  return (
    <div className="d-flex justify-content-center mb-2 container align-items-center">
      {currentImageIndex > 0 ? (
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mx-2"
          onClick={getPrevtImage}
        />
      ) : null}

      <canvas ref={canvasRef} height="450" />
      {currentImageIndex < imageSources.length - 1 ? (
        <FontAwesomeIcon
          icon={faAngleRight}
          className="mx-2"
          onClick={getNextImage}
        />
      ) : null}
    </div>
  );
};
export default Canvas;
