import React, { useState, useEffect } from 'react';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchMenuItems();
    fetchCategories();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await fetch('/api/menu');
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/menu/categories');
      const data = await response.json();
      setCategories(['All', ...data.map((category) => category.category)]);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredMenuItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Our Menu</h2>
        <div className="flex justify-center mb-8">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 mx-2 rounded ${selectedCategory === category ? 'bg-red-500 text-white' : 'bg-white text-gray-700'}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenuItems.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-700 mb-4">{item.description}</p>
              <p className="text-gray-900 font-bold">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
