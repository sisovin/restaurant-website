import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link href="/">Restaurant</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/about" className="hover:text-gray-700">About Us</Link>
          <Link href="/menu" className="hover:text-gray-700">Menu</Link>
          <Link href="/reservations" className="hover:text-gray-700">Reservations</Link>
          <Link href="/contact" className="hover:text-gray-700">Contact</Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-700 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
