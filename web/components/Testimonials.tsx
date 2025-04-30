import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <Carousel showArrows={true} infiniteLoop={true} showThumbs={false} showStatus={false} autoPlay={true} interval={5000}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className="text-center">
              <p className="text-lg italic mb-4">"{testimonial.message}"</p>
              <p className="text-gray-700 font-bold">{testimonial.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
