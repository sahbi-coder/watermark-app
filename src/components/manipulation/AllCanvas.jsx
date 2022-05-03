import { AppContext } from "../../helpers/Context";
import { useEffect, useRef, useContext } from "react";
import { ManipulationContext } from "../../helpers/ManipulationContext";

const Canvas = ({}) => {
  const canvasRef = useRef(null);
  const { imageSources, isIndividualMode } = useContext(AppContext);
  const {
    state,
    ACTIONS,
    dispatch,
    startDownload,
    setStartDownload,
    currentIndex,
    setCurrentIndex,
  } = useContext(ManipulationContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    const drawRect = () => {
      canvas.width = 450;
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    const clearRect = () => {
      canvas.width = 450;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };
    const drawText = (txt, xPos, yPos, size, color) => {
      const fontFamily = "Allerta Stencil";
      ctx.font = `normal ${size}px xyz, ${fontFamily}, Helvetica, Arial, monospace`;
      ctx.fillStyle = "cornflowerblue";
      ctx.strokeStyle = `${color}`;
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
      ctx.direction = "ltr";
      const x = (xPos * canvas.width) / 100;
      const y = (yPos * canvas.height) / 100;
      ctx.strokeText(txt, x, y);
    };

    const downloadImages = () => {
      const anchor = document.createElement("a");
      anchor.href = canvas.toDataURL("image/png");
      anchor.download = "IMAGE.PNG";
      anchor.click();
    };
    drawRect();
    const drawLogo = (l, xPos, yPos, size) => {
      const logo = new Image();
      logo.onload = function () {
        logo.width = size;
        logo.height = size;
        const left = (xPos * img.width) / 100;
        const top = (yPos * img.height) / 100;
        ctx.drawImage(logo, left, top, logo.width, logo.height);
      };
      logo.src = l;
    };
    state.stack.forEach((item, index) => {
      if (item.hasOwnProperty("text")) {
        drawText(item.text, item.x, item.y, item.size, item.color);
        return;
      }
      drawLogo(item.logo, item.x, item.y, item.size);
    });

    const drawImages = () => {
      img.onload = function () {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        canvas.width = canvas.height * aspectRatio;
        img.height = canvas.height;
        img.width = canvas.width;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        state.stack.forEach((item, index) => {
          if (item.hasOwnProperty("text")) {
            drawText(item.text, item.x, item.y, item.size, item.color);
            return;
          }
          const drawLogo = (l, xPos, yPos, size) => {
            const logo = new Image();
            logo.onload = function () {
              logo.width = size;
              logo.height = size;
              const left = (xPos * img.width) / 100;
              const top = (yPos * img.height) / 100;
              ctx.drawImage(logo, left, top, logo.width, logo.height);
              setCurrentIndex((currentIndex) => currentIndex + 1);
              downloadImages();
            };
            logo.src = l;
          };
          drawLogo(item.logo, item.x, item.y, item.size);
        });
      };
      img.src = imageSources[currentIndex];
      if (currentIndex === imageSources.length) {
        setStartDownload(false);
        setCurrentIndex(0);
        return;
      }
    };
    if (startDownload) {
      drawImages();
    }
  }, [
    imageSources,
    isIndividualMode,
    state,
    startDownload,
    currentIndex,
    setCurrentIndex,
  ]);

  return (
    <div className="d-flex justify-content-center mb-2 container align-items-center">
      <canvas height="450" ref={canvasRef} />
    </div>
  );
};
export default Canvas;
