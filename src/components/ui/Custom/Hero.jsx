import React from 'react';
import { Button } from '../button';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div
      className="relative flex items-center justify-center flex-col text-center px-5 sm:px-10 md:px-32 lg:px-56 gap-9 h-[90vh] bg-cover bg-center"
      style={{
        backgroundImage: `url('https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/33/fc/f3/candolim.jpg?w=1200&h=1200&s=1')`, // New beautiful travel-related image from Unsplash
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 text-white">
        <h1 className="font-extrabold mt-16 text-4xl sm:text-5xl md:text-6xl leading-tight">
          <span className="text-[#f56551]">Discover Your Next Adventure with AI:</span> 
          <br /> Personalized Itineraries at Your Fingertips
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mt-4">
          Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
        </p>

        {/* Button */}
        <Link to="/create-trip">
          <Button className="mt-6 px-6 py-3 bg-[#f56551] text-white font-bold rounded-md hover:bg-[#e05542] transition-all duration-300">
            Get Started, It's Free
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;
