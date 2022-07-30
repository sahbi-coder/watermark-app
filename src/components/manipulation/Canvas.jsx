import { useEffect, useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { useApp } from "../../helpers/Context";
import { useManipulate } from "../../helpers/ManipulationContext";

const Canvas = ({}) => {
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
    const img = new Image();

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
          drawLogo(item.logo, item.x, item.y, item.size);
        });
      };

      img.src = imageSources[currentIndex];
    };
    drawImages();

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
    const downloadImages = () => {
      const anchor = document.createElement("a");
      anchor.href = canvas.toDataURL("image/png");
      anchor.download = "IMAGE.PNG";
      anchor.click();
      setStartDownload(false);
    };
    if (startDownload) {
      downloadImages();
    }
  }, [imageSources, isIndividualMode, state, startDownload, currentIndex]);

  return (
    <div className="d-flex justify-content-center mb-2 container align-items-center">
      {!!currentIndex&& (
        <FontAwesomeIcon
          icon={faAngleLeft}
          className="mx-1"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (currentIndex > 0) {
              setCurrentIndex(currentIndex => currentIndex - 1);
            }
          }}
        />
      )}
      <canvas height="450" ref={canvasRef} />
      {currentIndex<imageSources.length-1 &&(
        <FontAwesomeIcon
          icon={faAngleRight}
          className="mx-1"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (currentIndex < imageSources.length - 1) {
              setCurrentIndex(currentIndex => currentIndex + 1);
            }
          }}
        />
      )}
    </div>
  );
};
export default Canvas;
