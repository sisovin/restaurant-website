import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src="/path/to/your/image.jpg" alt="About Us" className="rounded-lg shadow-lg" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <p className="text-lg mb-4">
              Welcome to our restaurant! We are dedicated to providing you with the best dining experience possible. Our team of talented chefs uses only the freshest ingredients to create delicious and innovative dishes that will delight your taste buds.
            </p>
            <p className="text-lg mb-4">
              Our restaurant offers a warm and inviting atmosphere, perfect for any occasion. Whether you're celebrating a special event or just enjoying a night out, we strive to make every visit memorable.
            </p>
            <p className="text-lg">
              Thank you for choosing our restaurant. We look forward to serving you!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
