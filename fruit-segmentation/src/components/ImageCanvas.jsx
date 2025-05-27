import React, { useEffect, useRef } from 'react';

const ImageCanvas = ({ imageSrc, predictions }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (predictions && predictions.length > 0) {
        predictions.forEach((pred) => {
          // Draw segmentation polygon
          ctx.beginPath();
          ctx.strokeStyle = 'var(--primary-orange)';
          ctx.lineWidth = 2;

          if (pred.points && pred.points.length > 0) {
            ctx.moveTo(pred.points[0].x, pred.points[0].y);
            for (let i = 1; i < pred.points.length; i++) {
              ctx.lineTo(pred.points[i].x, pred.points[i].y);
            }
            ctx.closePath();
            ctx.stroke();
          }

          // Draw label
          ctx.font = 'bold 14px Arial';
          const text = `${pred.class} (${(pred.confidence * 100).toFixed(1)}%)`;
          const textWidth = ctx.measureText(text).width;
          const textHeight = 18;
          
          const labelX = pred.x - pred.width / 2;
          const labelY = pred.y - pred.height / 2 - textHeight - 5;

          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(
            labelX,
            labelY,
            textWidth + 8,
            textHeight
          );

          ctx.fillStyle = 'white';
          ctx.fillText(
            text,
            labelX + 4,
            labelY + textHeight - 4
          );
        });
      }
    };
  }, [imageSrc, predictions]);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} className="max-w-full h-auto" />
    </div>
  );
};

export default ImageCanvas;