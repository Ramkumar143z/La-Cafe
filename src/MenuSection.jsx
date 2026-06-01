import React, { useState } from 'react';
import './MenuSection.css';

const menuData = {
  'Espresso Bar': [
    { name: 'Classic Espresso', price: '$3.50', description: 'Rich, full-bodied double shot with perfect crema.', image: '/menu_espresso.png' },
    { name: 'Caffè Americano', price: '$4.00', description: 'Espresso stretched with hot filtered water.', image: '/menu_espresso.png' },
    { name: 'Artisan Latte', price: '$5.50', description: 'Smooth espresso with perfectly micro-foamed milk.', image: '/menu_espresso.png' },
    { name: 'Vanilla Bean Cappuccino', price: '$6.00', description: 'Classic cappuccino infused with real Madagascar vanilla.', image: '/menu_espresso.png' },
    { name: 'Flat White', price: '$5.00', description: 'Velvety milk over a bold ristretto shot.', image: '/menu_espresso.png' },
    { name: 'Caramel Macchiato', price: '$6.50', description: 'Vanilla latte marked with espresso and buttery caramel.', image: '/menu_espresso.png' }
  ],
  'Cold Brews': [
    { name: 'Signature Cold Brew', price: '$5.00', description: 'Slow-steeped for 24 hours for a smooth, bold flavor.', image: '/menu_coldbrew.png' },
    { name: 'Nitro Cold Brew', price: '$6.00', description: 'Infused with nitrogen for a creamy, cascading texture.', image: '/menu_coldbrew.png' },
    { name: 'Iced Irish Latte', price: '$6.50', description: 'Our signature espresso with cream and Irish cream syrup over ice.', image: '/menu_coldbrew.png' },
    { name: 'Cold Brew Oat Float', price: '$7.00', description: 'Cold brew topped with a scoop of oat milk vanilla gelato.', image: '/menu_coldbrew.png' }
  ],
  'Artisan Pastries': [
    { name: 'Butter Croissant', price: '$4.50', description: 'Flaky, buttery perfection baked fresh every morning.', image: '/menu_pastry.png' },
    { name: 'Almond Croissant', price: '$5.50', description: 'Twice-baked with almond frangipane and powdered sugar.', image: '/menu_pastry.png' },
    { name: 'Pain au Chocolat', price: '$5.00', description: 'Classic French pastry wrapped around rich dark chocolate.', image: '/menu_pastry.png' },
    { name: 'Seasonal Fruit Danish', price: '$6.00', description: 'Crisp pastry filled with cream cheese and seasonal compote.', image: '/menu_pastry.png' }
  ],
  'Signature Additions': [
    { name: 'Matcha Tiramisu', price: '$8.50', description: 'Layers of matcha-soaked ladyfingers and mascarpone.', image: '/matcha.png' },
    { name: 'Affogato al Caffè', price: '$7.00', description: 'A scoop of vanilla bean gelato drowned in hot espresso.', image: '/waffle.png' },
    { name: 'Irish Coffee Cake', price: '$6.50', description: 'Moist coffee-infused cake with a whiskey glaze.', image: '/menu_pastry.png' }
  ]
};

function MenuSection() {
  const categories = Object.keys(menuData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedItems = isExpanded ? menuData[activeCategory] : menuData[activeCategory].slice(0, 4);

  // Reset expansion state when changing categories
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setIsExpanded(false);
  };

  return (
    <section className="menu-section" id="menu">
      <div className="menu-header">
        <span className="badge">Our Offerings</span>
        <h2 className="section-title">The Menu</h2>
        <p className="section-subtitle">Discover our meticulously crafted beverages and artisan bites.</p>
      </div>

      <div className="menu-tabs">
        {categories.map(category => (
          <button
            key={category}
            className={`menu-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="menu-grid" key={`${activeCategory}-${isExpanded}`}>
        {displayedItems.map((item, index) => (
          <div className="menu-item" key={index}>
            <div className="menu-item-image-wrapper">
              <img src={item.image} alt={item.name} className="menu-item-image" />
            </div>
            <div className="menu-item-content">
              <div className="menu-item-header">
                <h3 className="menu-item-name">{item.name}</h3>
                <div className="menu-item-dots"></div>
                <span className="menu-item-price">{item.price}</span>
              </div>
              <p className="menu-item-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      {menuData[activeCategory].length > 4 && (
        <div className="menu-actions">
          <button 
            className="btn-secondary" 
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show Less' : 'See Full Menu'}
          </button>
        </div>
      )}
    </section>
  );
}

export default MenuSection;
