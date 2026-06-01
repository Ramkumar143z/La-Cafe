import React, { useRef, useEffect, useState } from 'react';
import './SignatureDishes.css';
import BurgerScrollCard from './BurgerScrollCard';

const dishes = [
  {
    id: 1,
    name: 'Death by Chocolate',
    image: '/deathbuchocolatenew.webp'
  },
  {
    id: 2,
    name: 'Big Bang',
    image: '/bigbangnew.webp'
  },
  {
    id: 3,
    name: 'Artisan Pizza',
    image: '/artisanpizzanew.webp'
  }
];

function SignatureDishes() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="signature-scroll-container" ref={containerRef}>
      <div className="signature-sticky-wrapper">
        <section className="signature-section" id="signature">
          <div className="signature-header">
            <span className="badge">The Classics</span>
            <h2 className="section-title">Our Signature Dishes</h2>
            <p className="section-subtitle">Experience the bold flavours and culinary craftsmanship that put us on the map.</p>
          </div>

          <div className="dishes-container">
            {dishes.map((dish) => (
              dish.id === 2 ? (
                <BurgerScrollCard key={dish.id} dish={dish} parentProgress={scrollProgress} />
              ) : (
                <div key={dish.id} className="dish-card">
                  <img src={dish.image} alt={dish.name} className="dish-image" />
                  <div className="dish-overlay">
                    <h3 className="dish-name">{dish.name}</h3>
                  </div>
                </div>
              )
            ))}
          </div>

          <div className="signature-actions">
            <button className="btn-secondary">View Full Menu</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default SignatureDishes;
