import React from 'react';
import './index.css';
import ScrollHero from './ScrollHero';
import SignatureDishes from './SignatureDishes';
import Moments from './Moments';
import MenuSection from './MenuSection';
import StepInside from './StepInside';
import Footer from './Footer';

function App() {
  return (
    <div className="app-container">
      <ScrollHero />
      <SignatureDishes />
      <Moments />
      <MenuSection />
      <StepInside />
      <Footer />
    </div>
  );
}

export default App;
