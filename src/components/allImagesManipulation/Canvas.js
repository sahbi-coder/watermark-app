import { text } from "@fortawesome/fontawesome-svg-core";

import { useEffect } from "react";

const Canvas = ({
  canvasRef,
  textToAdd,
  imageSources,
  currentImageIndex,
  getNextImage,
  logoToAdd,
  startDownload,
  stopDownload,
}) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let oldTxt;
    const img = new Image();

    img.onload = function () {
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      canvas.width = canvas.height * aspectRatio;
      img.height = canvas.height;
      img.width = canvas.width;
      const logo = new Image();
      logo.onload = function () {
        logo.width = logoToAdd.size;
        logo.height = logoToAdd.size;
        const left = (logoToAdd.left * img.width) / 100;
        const top = (logoToAdd.top * img.height) / 100;

        ctx.drawImage(logo, left, top, logo.width, logo.height);
        if (startDownload) {
          const anchor = document.createElement("a");
          anchor.href = canvas.toDataURL("image/png");
          anchor.download = "IMAGE.PNG";
          anchor.click();
          getNextImage();
          if (currentImageIndex === imageSources.length - 1) {
            stopDownload();
          }
        }
      };
      logo.src = logoToAdd.logo;

      ctx.drawImage(img, 0, 0, img.width, img.height);
      drawText(
        textToAdd.text,
        textToAdd.left,
        textToAdd.top,
        textToAdd.size,
        textToAdd.color
      );
     
    };
    img.src = imageSources[currentImageIndex][0];
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
      oldTxt = text;
    };
  }, [textToAdd, currentImageIndex, logoToAdd, startDownload]);

  return (
    <div className="d-flex justify-content-center mb-2 container align-items-center">
      <canvas ref={canvasRef} height="450" />
    </div>
  );
};
export default Canvas;
