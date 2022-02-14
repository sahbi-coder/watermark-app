import { useEffect } from "react";
const Canvas = ({ canvasRef, textsToAdd }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#000000";
    context.fillRect(0,0,canvas.width,canvas.height)
    textsToAdd.forEach((text, index) => {
      context.fillText(text, 200, 55 * index);
    });
}, [textsToAdd]);

  return (
    <div className="d-flex justify-content-center mb-2 container">
      <canvas ref={canvasRef} style={{ width: "80%" }} />
    </div>
  );
};
export default Canvas;
