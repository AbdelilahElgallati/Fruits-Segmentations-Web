import React, { useEffect, useRef } from 'react';

const ImageCanvas = ({ imageSrc, predictions, onFruitSelect }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    // Handle potential CORS issues if imageSrc is a URL from a different origin
    // For local testing or same-origin images, this is usually fine.
    // If using cross-origin images via URL input, the server hosting the image
    // needs to send appropriate CORS headers, or the image loading will fail.
    // Alternatively, a backend proxy could fetch the image.
    img.crossOrigin = "Anonymous"; // Attempt to enable CORS loading
    img.src = imageSrc;

    img.onload = () => {
      // Set canvas dimensions based on the loaded image
      canvas.width = img.naturalWidth; // Use naturalWidth/Height for original dimensions
      canvas.height = img.naturalHeight;
      
      // Clear previous drawings
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Draw predictions if available
      if (predictions && Array.isArray(predictions) && predictions.length > 0) {
        predictions.forEach((pred) => {
          // Ensure points exist and form a polygon
          if (pred.points && Array.isArray(pred.points) && pred.points.length >= 3) {
            // Draw segmentation polygon
            ctx.beginPath();
            ctx.strokeStyle = '#f97316'; // primary-500
            ctx.lineWidth = 3;
            ctx.fillStyle = 'rgba(249, 115, 22, 0.15)'; // primary-500 with opacity

            ctx.moveTo(pred.points[0].x, pred.points[0].y);
            for (let i = 1; i < pred.points.length; i++) {
              ctx.lineTo(pred.points[i].x, pred.points[i].y);
            }
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
          }

          // Draw label with confidence score
          // Ensure necessary properties exist
          if (pred.class && typeof pred.confidence === 'number' && pred.x && pred.y && pred.width && pred.height) {
            ctx.font = '600 14px Inter, system-ui, sans-serif';
            const text = `${pred.class} (${(pred.confidence * 100).toFixed(1)}%)`;
            const textMetrics = ctx.measureText(text);
            const textWidth = textMetrics.width;
            const textHeight = 20;
            
            // Calculate label position (top-left corner of the bounding box, slightly offset)
            // Roboflow segmentation often provides x, y as center, width, height
            const boxX = pred.x - pred.width / 2;
            const boxY = pred.y - pred.height / 2;
            let labelX = boxX;
            let labelY = boxY - textHeight - 5; // Position above the box

            // Adjust if label goes off-canvas (top)
            if (labelY < 0) {
              labelY = boxY + 5; // Position inside the box near the top
            }
            // Adjust if label goes off-canvas (left)
            if (labelX < 0) {
              labelX = 0;
            }
            // Adjust if label goes off-canvas (right)
            if (labelX + textWidth + 12 > canvas.width) {
              labelX = canvas.width - textWidth - 12;
            }

            // Draw label background with gradient
            const gradient = ctx.createLinearGradient(labelX, labelY, labelX, labelY + textHeight);
            gradient.addColorStop(0, 'rgba(249, 115, 22, 0.95)'); // primary-500
            gradient.addColorStop(1, 'rgba(234, 88, 12, 0.95)'); // primary-600
            
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(labelX, labelY, textWidth + 12, textHeight, 6);
            ctx.fill();

            // Draw label text
            ctx.fillStyle = 'white';
            ctx.fillText(
              text,
              labelX + 6,
              labelY + textHeight - 5
            );
          }
        });
      }
    };

    img.onerror = (error) => {
      console.error("Error loading image onto canvas:", error);
      // Optionally clear the canvas or show an error message
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '16px Inter, system-ui, sans-serif';
      ctx.fillStyle = '#ef4444'; // red-500
      ctx.textAlign = 'center';
      ctx.fillText('Error loading image. Check URL/CORS.', canvas.width / 2, canvas.height / 2);
    };

    // Cleanup function to revoke object URL if imageSrc is a blob URL
    // This might not be strictly necessary if using Data URLs from FileReader
    // but good practice if blob URLs were ever used.
    return () => {
      if (imageSrc && imageSrc.startsWith('blob:')) {
        URL.revokeObjectURL(imageSrc);
      }
    };

  }, [imageSrc, predictions]); // Rerun effect when image or predictions change

  return (
    <div className="relative rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 aspect-w-16 aspect-h-9 flex items-center justify-center group">
      <canvas 
        ref={canvasRef} 
        className="max-w-full max-h-full object-contain block transition-transform duration-300 group-hover:scale-[1.02]" 
      />
      
      {!imageSrc && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-neutral-500">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-full blur-xl" />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 relative" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
              />
            </svg>
          </div>
          <p className="text-lg font-medium">Processed image will appear here</p>
          <p className="text-sm mt-2">Upload an image or enter a URL to get started</p>
        </div>
      )}
    </div>
  );
};

export default ImageCanvas;

