import React, { useEffect, useRef, useState } from 'react';
import './StepInside.css';

const FRAME_COUNT_1 = 207;
const FRAME_COUNT_2 = 240;
const TOTAL_FRAMES = FRAME_COUNT_1 + FRAME_COUNT_2;

import logoImg from './assets/logo.png';

function StepInside() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const logoRef = useRef(null);
  const [images, setImages] = useState([]);
  
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef(null);
  
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount === TOTAL_FRAMES) {
        setImages(loadedImages);
        if (canvasRef.current) {
          drawFrame(canvasRef.current, loadedImages[0]);
        }
      }
    };

    // Load Part 1
    for (let i = 1; i <= FRAME_COUNT_1; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `${import.meta.env.BASE_URL}3d_frames/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = checkAllLoaded;
      loadedImages.push(img);
    }

    // Load Part 2
    for (let i = 1; i <= FRAME_COUNT_2; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `${import.meta.env.BASE_URL}3d_frames_2/frame-${paddedIndex}.jpg`;
      img.onload = checkAllLoaded;
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
    ctx.clearRect(0,0,canvas.width, canvas.height);
    ctx.drawImage(img, 0,0, img.width, img.height,
                       centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollY = -top;
      const maxScroll = height - windowHeight;
      
      let progress = scrollY / maxScroll;
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      targetProgressRef.current = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    const renderLoop = () => {
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.08;
      
      if (images.length > 0 && canvasRef.current) {
        const frameIndex = Math.min(
          TOTAL_FRAMES - 1,
          Math.max(0, Math.floor(currentProgressRef.current * TOTAL_FRAMES))
        );
        
        const img = images[frameIndex];
        if (img) {
          drawFrame(canvasRef.current, img);
        }
      }

      const p = currentProgressRef.current;

      if (textRef.current) {
        // Text fades in from 0.85 to 0.93
        let textProgress = (p - 0.85) * 12.5;
        if (textProgress < 0) textProgress = 0;
        if (textProgress > 1) textProgress = 1;

        textRef.current.style.opacity = textProgress;
        textRef.current.style.transform = `translate(-50%, calc(-50% + ${(1 - textProgress) * 40}px))`;
      }
      
      if (logoRef.current) {
        // Logo flies in right after text: 0.93 to 1.0
        let logoProgress = (p - 0.93) * 14.28;
        if (logoProgress < 0) logoProgress = 0;
        if (logoProgress > 1) logoProgress = 1;

        const rotate = (1 - logoProgress) * 720; // Spins 2 times
        const translateX = (1 - logoProgress) * 200; // Comes from the right
        const scale = 0.2 + (logoProgress * 0.8);
        
        logoRef.current.style.opacity = logoProgress;
        logoRef.current.style.transform = `translateX(${translateX}px) rotate(${rotate}deg) scale(${scale})`;
      }
      
      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);
    
    const resizeCanvas = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const rect = canvasRef.current.parentElement.getBoundingClientRect();
        canvasRef.current.width = rect.width;
        canvasRef.current.height = rect.height;
        // redraw to prevent flicker
        if (images.length > 0) {
           const frameIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(currentProgressRef.current * TOTAL_FRAMES)));
           drawFrame(canvasRef.current, images[frameIndex]);
        }
      }
    };
    window.addEventListener('resize', resizeCanvas);
    setTimeout(resizeCanvas, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [images]);

  return (
    <div className="step-inside-scroll-container" ref={containerRef}>
      <div className="step-inside-sticky-wrapper">
        <section className="step-inside-section" id="about">
          <div className="step-inside-header">
            <h2 className="section-title">Step Inside the La Cafe</h2>
            <p className="section-subtitle">A sanctuary for coffee lovers, designed for comfort and connection.</p>
          </div>
          
          <div className="blend-image-container">
            <canvas ref={canvasRef} className="blend-canvas" />
            
            <div className="philosophy-text-container" ref={textRef}>
              <img src={logoImg} alt="La Cafe Logo" className="philosophy-logo" ref={logoRef} />
              <span className="badge">Our Essence</span>
              <h2 className="section-title">The Philosophy</h2>
              <p className="philosophy-desc">
                At La Cafe, we believe that great food takes time, and great moments shouldn't be rushed. Our kitchen is built on authenticity—using handpicked ingredients, traditional techniques, and a lot of heart.
              </p>
              <p className="philosophy-desc">
                From the slow-simmered sauces in our lasagnas to the rich, dark notes of our espresso, every detail is crafted to offer you a true taste of comfort. We don't just serve meals; we serve experiences meant to be shared, savored, and remembered.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StepInside;
