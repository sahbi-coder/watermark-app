import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../../helpers/Context";
import { useManipulate } from "../../helpers/ManipulationContext";


const Canvas = ({ isMobile }) => {
  const canvasRef = useRef(null);
  const { imageSources, isIndividualMode } = useApp();
  const {
    state,
    ACTIONS,
    dispatch,
    startDownload,
    setStartDownload,
    setCurrentIndex,
    currentIndex,
  } = useManipulate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const canvasCopy = document.createElement("canvas");
    const copyCtx = canvasCopy.getContext("2d");
    const img = new Image();
    const makeCounter = () => {
      let count = 0;
      return () => {
        return ++count;
      };
    };
    const getCount = makeCounter();
    const downloadAndReset = () => {
      const anchor = document.createElement("a");
      anchor.href = canvasCopy.toDataURL("image/jpg");
      anchor.download = "IMAGE.jpg";
      anchor.click();
      setStartDownload(false);
    };

    const drawText = (ctx, txt, xPos, yPos, s, color, ratio) => {
      let size = parseInt(s);
      if (ratio) {
        size *= ratio;
      }
    
      const fontFamily = "Allerta Stencil";
      ctx.font = `normal ${ratio ?  600 : 100} ${size}px xyz, ${fontFamily}, Helvetica, Arial, monospace`;
   
      ctx.fillStyle = "cornflowerblue";
      ctx.strokeStyle = `${color}`;
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
      ctx.direction = "ltr";
      const x = (xPos * canvas.width) / 100;
      const y = (yPos * canvas.height) / 100;
      ctx.fillText(txt, x, y);
      if (startDownload) {
        const count = getCount();
        if (count === state.stack.length) downloadAndReset();
      }
    };
    const drawLogo = (ctx, l, xPos, yPos, s, heigthRatio, widthRatio) => {
      let size = parseInt(s);
      if(heigthRatio) size*= heigthRatio
      const logo = new Image();
      logo.onload = function () {
        logo.width = size;
        logo.height = size;
    
        let left = (xPos * canvas.width) / 100;
        let top = (yPos * canvas.height) / 100;
        if(widthRatio) left = (xPos * canvasCopy.width) / 100;
        if(heigthRatio) top = (yPos * canvasCopy.height) / 100;
     
        ctx.drawImage(logo, left, top, logo.width, logo.height);
        if (startDownload) {
          const count = getCount();

          if (count === state.stack.length) downloadAndReset();
        }
      };
   
      logo.src = l;
    };
    const draw = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      if (isMobile) {
        canvas.height = canvas.width / aspectRatio;
      } else {
        canvas.width = canvas.height * aspectRatio;
      }
      img.height = canvas.height;
      img.width = canvas.width;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      state.stack.forEach((item) => {
        if (item.hasOwnProperty("text")) {
          drawText(ctx, item.text, item.x, item.y, item.size, item.color);
          return;
        }
        drawLogo(ctx, item.logo, item.x, item.y, item.size);
      });
    };
    const download = () => {
      canvasCopy.height = img.naturalHeight;
      canvasCopy.width = img.naturalWidth;
      copyCtx.drawImage(img, 0, 0);
      const ratio = canvasCopy.height / canvas.height;
      const widthRatio = canvasCopy.width / canvas.width;

      state.stack.forEach((item) => {
        if (item.hasOwnProperty("text")) {
          drawText(
            copyCtx,
            item.text,
            item.x * ratio,
            item.y * widthRatio,
            item.size,
            item.color,
            ratio
          );

          return;
        }
        drawLogo(
          copyCtx,
          item.logo,
          item.x ,
          item.y,
          item.size,
          ratio,
          widthRatio
        );
      });
    };

    const drawImages = () => {
      
      img.onload = function () {
        if (!startDownload) {
          draw();
        }
        if (startDownload) {
          download();
        }
      };
      img.src = imageSources[currentIndex];
    };
    drawImages();
  }, [imageSources, isIndividualMode, state, startDownload, currentIndex]);

  return (
    <div className="d-flex justify-content-center mb-2 container align-items-center">
      {!!currentIndex && (
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mx-1"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex((currentIndex) => currentIndex - 1);
            }
          }}
        />
      )}

      <canvas
        width={`${isMobile ? 260 : "auto"}`}
        height={`${isMobile ? "auto" : 450}`}
        ref={canvasRef}
      />

      {currentIndex < imageSources.length - 1 && (
        <FontAwesomeIcon
          icon={faAngleRight}
          className="mx-1"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (currentIndex < imageSources.length - 1) {
              setCurrentIndex((currentIndex) => currentIndex + 1);
            }
          }}
        />
      )}
    </div>
  );
};
export default Canvas;
