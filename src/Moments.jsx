import React, { useState, useEffect } from 'react';
import './Moments.css';

function Moments() {
  const baseUrl = import.meta.env.BASE_URL;
  const images = [
    `${baseUrl}bg.png`,
    `${baseUrl}gallery_1.png`,
    `${baseUrl}gallery_2.png`,
    `${baseUrl}gallery_3.png`
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="moments-section" id="moments">
      <div className="moments-header">
        <span className="badge">Inside La Cafe</span>
        <h2 className="section-title">Moments Beyond the Menu</h2>
        <p className="section-subtitle">
          A glimpse into the vibe, setting, and stories that make every visit unforgettable.
        </p>
      </div>

      <div className="gallery-container">
        <img 
          key={activeIndex}
          src={images[activeIndex]} 
          alt="Gallery Main" 
          className="gallery-main-image" 
        />
        
        <div className="gallery-thumbnails">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className={`thumbnail-wrapper ${idx === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(idx)}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="thumbnail-image" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Moments;
