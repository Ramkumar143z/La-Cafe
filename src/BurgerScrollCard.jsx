import React, { useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 240;

function BurgerScrollCard({ dish, parentProgress }) {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef(null);
  
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/burger_frames/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          if (canvasRef.current) {
            drawFrame(canvasRef.current, loadedImages[0]);
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (canvas, img) => {
    const ctx = canvas.getContext('2d');
    const hRatio = canvas.width / img.width;
    const vRatio = canvas.height / img.height;
    const ratio  = Math.max(hRatio, vRatio);
    const centerShift_x = (canvas.width - img.width * ratio) / 2;
    const centerShift_y = (canvas.height - img.height * ratio) / 2;  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height,
                       centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);  
  };

  useEffect(() => {
    targetProgressRef.current = parentProgress || 0;
  }, [parentProgress]);

  useEffect(() => {
    const renderLoop = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.08;
      
      if (images.length > 0 && canvasRef.current) {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(currentProgressRef.current * FRAME_COUNT))
        );
        
        const img = images[frameIndex];
        if (img) {
          drawFrame(canvasRef.current, img);
        }
      }
      
      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);
    
    const resizeCanvas = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        // Redraw instantly on resize if images are loaded
        if (images.length > 0) {
           const frameIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(currentProgressRef.current * FRAME_COUNT)));
           drawFrame(canvasRef.current, images[frameIndex]);
        }
      }
    };
    window.addEventListener('resize', resizeCanvas);
    setTimeout(resizeCanvas, 100);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [images]);

  return (
    <div className="dish-card">
      <canvas 
        ref={canvasRef} 
        className="dish-image"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }} 
      />
      <div className="dish-overlay">
        <h3 className="dish-name">{dish.name}</h3>
      </div>
    </div>
  );
}

export default BurgerScrollCard;
