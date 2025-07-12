import React from 'react';

import Lottie from 'lottie-react';
import insuranceAnimation from '../../assets/insuranceAnimation/insuranceAnimation.json';
import { Link } from 'react-router';

const Slider = () => {
  return (
    <div  className="h-[97vh] bg-white dark:bg-gray-900 flex flex-col-reverse md:flex-row items-center justify-between px-4 md:px-20">
      {/* Text content */}
      <div className="text-center md:text-left max-w-xl z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
          Secure Your Tomorrow <br className='hidden md:block' /> Today
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Protect your loved ones with trusted, affordable life insurance.
        </p>
        <Link
          to="/quote"
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Get a Free Quote
        </Link>
      </div>

      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 mb-8 md:mb-0">
        <Lottie animationData={insuranceAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Slider;
