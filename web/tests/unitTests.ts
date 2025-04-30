import { render, screen } from '@testing-library/react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import AboutUs from '../components/AboutUs';
import Menu from '../components/Menu';
import PhotoGallery from '../components/PhotoGallery';

describe('Navbar Component', () => {
  test('renders Navbar component', () => {
    render(<Navbar />);
    const linkElement = screen.getByText(/Restaurant/i);
    expect(linkElement).toBeInTheDocument();
  });
});

describe('Hero Component', () => {
  test('renders Hero component', () => {
    render(<Hero />);
    const headingElement = screen.getByText(/Welcome to Our Restaurant/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe('AboutUs Component', () => {
  test('renders AboutUs component', () => {
    render(<AboutUs />);
    const headingElement = screen.getByText(/About Us/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe('Menu Component', () => {
  test('renders Menu component', () => {
    render(<Menu />);
    const headingElement = screen.getByText(/Our Menu/i);
    expect(headingElement).toBeInTheDocument();
  });
});

describe('PhotoGallery Component', () => {
  const images = ['/path/to/image1.jpg', '/path/to/image2.jpg'];

  test('renders PhotoGallery component', () => {
    render(<PhotoGallery images={images} />);
    const headingElement = screen.getByText(/Photo Gallery/i);
    expect(headingElement).toBeInTheDocument();
  });
});
