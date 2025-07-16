import React, { useRef } from 'react';
import Slider from 'react-slick';
import { FaStar, FaRegStar, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    name: 'Ayesha Rahman',
    image: 'https://i.ibb.co/FL9r63kj/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-pro.jpg',
    rating: 5,
    message: 'LifeSure made insurance so easy! The application process was super quick.',
  },
  {
    id: 2,
    name: 'Mizan Chowdhury',
    image: 'https://i.ibb.co/67SHRXmJ/images-q-tbn-ANd9-Gc-Tn-SA1zyg-A3rubv-VK0-Dr-Vc-Q02-Po79k-Jh-Xo-A-s.png',
    rating: 4,
    message: 'Real-time claim tracking is a life saver! Very smooth experience.',
  },
  {
    id: 3,
    name: 'Farhana Ahmed',
    image: 'https://i.ibb.co/Y7HgMRLn/avatar-placeholder-generator-500x500.webp',
    rating: 5,
    message: 'Beautiful design and amazing support. I felt safe from the first step.',
  },
  {
    id: 4,
    name: 'Tanvir Hasan',
    image: 'https://i.ibb.co/wZMXy6N0/150.jpg',
    rating: 5,
    message: 'Clean dashboard, secure payment, and honest quotes. Just wow.',
  },
  {
    id: 5,
    name: 'Raisa Noor',
    image: 'https://i.ibb.co/v2B8P1H/151.jpg',
    rating: 4,
    message: 'Felt like talking to a friend, not a salesman. Very human approach.',
  },
];

const renderStars = (count) => {
  return Array.from({ length: 5 }, (_, i) =>
    i < count ? <FaStar key={i} className="text-yellow-400" /> : <FaRegStar key={i} className="text-yellow-400" />
  );
};

const CustomerReviews = () => {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section data-aos="fade-left"className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          What Our Customers Say
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Real feedback from people who trust LifeSure.
        </p>

       

        <Slider ref={sliderRef} {...settings}>
          {reviews.map((review) => (
            <div key={review.id} className="px-4 h-full">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition h-[360px] md:h-[360px] flex flex-col text-center ">
                <div>
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-16 h-16 rounded-full mx-auto border-4 border-blue-500 mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                    {review.name}
                  </h3>
                  <div className="flex justify-center my-2">{renderStars(review.rating)}</div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic my-5">
                  “{review.message}”
                </p>
              </div>
            </div>
          ))}
        </Slider>
         {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 my-6">
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition"
            aria-label="Previous Review"
          >
            <FaArrowLeft className="text-blue-600 dark:text-white" />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="p-2 bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-full transition"
            aria-label="Next Review"
          >
            <FaArrowRight className="text-blue-600 dark:text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
