import React, { useEffect, useRef, useState } from 'react';
import './ScrollHero.css';

const FRAME_COUNT = 300;

function ScrollHero() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  
  // We keep scrollProgress in state for React renders (text overlays)
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Refs for smooth inertia animation
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const animationFrameId = useRef(null);
  
  // Preload images
  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const paddedIndex = i.toString().padStart(3, '0');
      img.src = `/frames/ezgif-frame-${paddedIndex}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          // Draw first frame once loaded
          if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            const hRatio = canvasRef.current.width / loadedImages[0].width;
            const vRatio = canvasRef.current.height / loadedImages[0].height;
            const ratio  = Math.max(hRatio, vRatio);
            const centerShift_x = (canvasRef.current.width - loadedImages[0].width * ratio) / 2;
            const centerShift_y = (canvasRef.current.height - loadedImages[0].height * ratio) / 2;  
            ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
            ctx.drawImage(loadedImages[0], 0,0, loadedImages[0].width, loadedImages[0].height,
                               centerShift_x,centerShift_y,loadedImages[0].width*ratio, loadedImages[0].height*ratio);  
          }
        }
      };
      loadedImages.push(img);
    }
  }, []);

  // Handle scroll with inertia
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
    
    // Animation loop for inertia (Lerp)
    const renderLoop = () => {
      // Interpolate current towards target by a small factor for smoothness
      currentProgressRef.current += (targetProgressRef.current - currentProgressRef.current) * 0.08;
      
      // Only trigger state updates if the difference is noticeable to avoid excessive re-renders
      if (Math.abs(currentProgressRef.current - targetProgressRef.current) > 0.0001 || targetProgressRef.current === 0 || targetProgressRef.current === 1) {
        setScrollProgress(currentProgressRef.current);
      }
      
      if (images.length > 0 && canvasRef.current) {
        const frameIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(currentProgressRef.current * FRAME_COUNT))
        );
        
        const ctx = canvasRef.current.getContext('2d');
        const img = images[frameIndex];
        if (img) {
          const canvas = canvasRef.current;
          const hRatio = canvas.width / img.width;
          const vRatio = canvas.height / img.height;
          const ratio  = Math.max(hRatio, vRatio);
          const centerShift_x = (canvas.width - img.width * ratio) / 2;
          const centerShift_y = (canvas.height - img.height * ratio) / 2;  
          ctx.clearRect(0,0,canvas.width, canvas.height);
          ctx.drawImage(img, 0,0, img.width, img.height,
                             centerShift_x,centerShift_y,img.width*ratio, img.height*ratio);  
        }
      }
      
      animationFrameId.current = requestAnimationFrame(renderLoop);
    };

    animationFrameId.current = requestAnimationFrame(renderLoop);
    
    // Initial size
    const resizeCanvas = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        handleScroll(); // Trigger a position recalculation
      }
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [images]);

  return (
    <div className="scroll-hero-container" ref={containerRef}>
      <div className="sticky-wrapper">
        <canvas ref={canvasRef} className="hero-canvas" />
        
        <div className="canvas-overlay"></div>

        <nav className="navbar scroll-navbar">
          <a href="/" className="logo">La Cafe</a>
          <ul className="nav-links">
            <li><a href="#menu">Menu</a></li>
            <li><a href="#signature">Signature Dishes</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#moments">Moments</a></li>
          </ul>
          <button className="btn-primary">Make a Reservation</button>
        </nav>

        <main className="main-content scroll-content" style={{ opacity: scrollProgress < 0.3 ? 1 - (scrollProgress / 0.3) : 0, transform: `translateY(${scrollProgress * 200}px)`, transition: 'opacity 0.1s ease, transform 0.1s ease' }}>
          <div className="hero-text">
            <h1 className="hero-title">
              <span>More Espresso</span>
              <span>Less Depresso</span>
            </h1>
          </div>
          
          <div className="hero-info">
            <p className="hero-description">
              Nestled in a cosy corner, this inviting space offers carefully brewed coffee and a tranquil, unhurried atmosphere. It encourages you to slow down, unwind and savour the quiet charm of each sip.
            </p>
            <div className="hero-actions">
              <button className="btn-primary">Make a Reservation</button>
              <div className="instant-access-container">
                <span className="instant-access-badge">Get Instant Access ↘</span>
                <button className="btn-secondary">View menu</button>
              </div>
            </div>
          </div>
        </main>

        <div className="middle-content" style={{ 
          opacity: scrollProgress > 0.35 && scrollProgress < 0.85 ? Math.sin(((scrollProgress - 0.35) / 0.5) * Math.PI) : 0, 
          transform: `translate(-50%, calc(-50% + ${(0.6 - scrollProgress) * 100}px))` 
        }}>
          <h2 className="hero-title" style={{ fontSize: '4rem', textAlign: 'center' }}>
            <span>Crafted with Passion.</span><br/>
            <span>Served with Love.</span>
          </h2>
        </div>

      </div>
    </div>
  );
}

export default ScrollHero;
