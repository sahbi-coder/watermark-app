import { useEffect, useRef, useState } from "react";
import { useManipulate } from "../../helpers/ManipulationContext";
import { useApp } from "../../helpers/Context";

const Canvas = ({ isMobile }) => {
  const canvasRef = useRef([]);

  const [canvasCopys, setCanvasCopys] = useState([]);
  const [ctxs, setCtxs] = useState([]);
  const [ctxsCopys, setCopys] = useState([]);
  const [imgs, setImgs] = useState([]);
  const canvases = canvasRef.current;

  const setResfs = (el) => {
    if (canvases.length < imageSources.length) {
      canvasRef.current.push(el);

      const ctxs = canvases.map((canves) => {
        return canves.getContext("2d");
      }, []);
      setCtxs(ctxs);

      const canvasCopys = canvases.map((el) => {
        return document.createElement("canvas");
      }, []);
      setCanvasCopys(canvasCopys);

      const ctxsCopys = canvasCopys.map((copy) => {
        return copy.getContext("2d");
      }, []);
      setCopys(ctxsCopys);

      const imgs = canvases.map(() => {
        return new Image();
      });
      setImgs(imgs);
    }
  };

  const { imageSources, isIndividualMode } = useApp();
  const { state, startDownload, setStartDownload, currentIndex } =
    useManipulate();

  useEffect(() => {
    const makeCounter = () => {
      let count = 0;
      return () => {
        return ++count;
      };
    };

    const counter = makeCounter();

    const downloadAndReset = (count) => {
      if (count === state.stack.length * canvasCopys.length) {
        canvasCopys.forEach((copy, index) => {
          const anchor = document.createElement("a");
          anchor.href = copy.toDataURL("image/jpg");
          anchor.download = `IMAGE-${index}ff.jpg`;
          anchor.click();
        });

        setStartDownload(false);
      }
    };

    const drawText = (canvas, ctx, txt, xPos, yPos, s, color, ratio,widthRatio) => {
      let size = parseInt(s);
      let  x = (xPos * canvas.width) / 100;
      let y = (yPos * canvas.height) / 100;
      if (ratio) {
        size *= ratio;
        x/=widthRatio;
        y/=ratio
      }

      const fontFamily = "Allerta Stencil";
      ctx.font = `normal ${
        ratio ? 600 : 100
      } ${size}px xyz, ${fontFamily}, Helvetica, Arial, monospace`;

      ctx.fillStyle = "cornflowerblue";
      ctx.strokeStyle = `${color}`;
      ctx.textAlign = "start";
      ctx.textBaseline = "alphabetic";
      ctx.direction = "ltr";
      
      ctx.fillText(txt, x, y);
    };
    const drawLogo = (
      ctx,

      img,
      l,
      xPos,
      yPos,
      s,
      heigthRatio,
      widthRatio
    ) => {
      const size = parseInt(s);
      const logo = new Image();
      logo.onload = function () {
        logo.width = size;
        logo.height = size;
        if (heigthRatio) logo.height = 10 * heigthRatio;
        if (widthRatio) logo.width = 10 * widthRatio;
        const left = (xPos * img.width) / 100;
        const top = (yPos * img.height) / 100;
        ctx.drawImage(logo, left, top, logo.width, logo.height);
      };

      logo.src = l;
    };
    const drawLogoForDownload = (
      ctx,
      index,
      img,
      l,
      xPos,
      yPos,
      s,
      heigthRatio,
      widthRatio
    ) => {
      const size = parseInt(s);
      const logo = new Image();
      logo.onload = function () {
        logo.width = size;
        logo.height = size;
        if (heigthRatio) logo.height = s * heigthRatio;
        if (widthRatio) logo.width = s* widthRatio;
        const left = (xPos * img.width) / 100;
        const top = (yPos * img.height) / 100;
        ctx.drawImage(logo, left, top, logo.width, logo.height);
        const count = counter();
        
        downloadAndReset(count);
      };

      logo.src = l;
    };
    const draw = (canvas, ctx, img) => {
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
          drawText(
            canvas,
            ctx,
            item.text,
            item.x,
            item.y,
            item.size,
            item.color
          );
          return;
        }

        drawLogo(ctx, img, item.logo, item.x, item.y, item.size);
      });
    };
    const download = (canvasCopy, copyCtx, img, canvas, index) => {
      canvasCopy.height = img.naturalHeight;
      canvasCopy.width = img.naturalWidth;
      copyCtx.drawImage(img, 0, 0);
      const ratio = canvasCopy.height / canvas.height;
      const widthRatio = canvasCopy.width / canvas.width;

      state.stack.forEach((item) => {
        if (item.hasOwnProperty("text")) {
          drawText(
            canvasCopy,
            copyCtx,
            item.text,
            item.x * ratio,
            item.y * widthRatio,
            item.size,
            item.color,
            ratio,
            widthRatio
          );
          const count = counter();
          downloadAndReset(count);

          return;
        }
        drawLogoForDownload(
          copyCtx,
          index,
          img,
          item.logo,
          item.x * widthRatio,
          item.y * ratio,
          item.size,
          ratio,
          widthRatio
        );
      });
    };

    const drawImages = (img, src, canvas, copy, ctx, copyCtx, index) => {
      img.onload = function () {
        if (!startDownload) {
          draw(canvas, ctx, img, index);
        }
        if (startDownload) {
          download(copy, copyCtx, img, canvas, index);
        }
      };
      img.src = src;
    };

    imgs.forEach((img, index) => {
      drawImages(
        img,
        imageSources[index],
        canvases[index],
        canvasCopys[index],
        ctxs[index],
        ctxsCopys[index],
        index
      );
    });
  }, [
    imageSources,
    isIndividualMode,
    state,
    startDownload,
    currentIndex,
    imgs,
  ]);

  return (
    <div className="d-flex-wrap justify-content-center mb-2 container align-items-center">
      {imageSources.map((image, index) => {
        return (
          <canvas
            width={`${isMobile ? 260 : "auto"}`}
            height={`${isMobile ? "auto" : 450}`}
            ref={(el) => setResfs(el)}
            key={index}
          />
        );
      })}
    </div>
  );
};
export default Canvas;
