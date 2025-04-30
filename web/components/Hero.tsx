import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: "url('/path/to/your/image.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="container mx-auto h-full flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Our Restaurant</h1>
          <p className="text-xl mb-8">Experience the best dining experience with us</p>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Make a Reservation
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
