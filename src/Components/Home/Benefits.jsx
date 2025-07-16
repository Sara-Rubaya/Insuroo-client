import React from 'react';
import { FaCalculator, FaUserTie, FaLaptop, FaLock, FaClock, FaUserCircle } from 'react-icons/fa';

const benefits = [
  {
    icon: <FaCalculator className="text-violet-500 text-4xl mb-4" />,
    title: "Instant Quote Calculation",
    description: "Get a personalized life insurance quote in seconds without hassle.",
  },
  {
    icon: <FaUserTie className="text-violet-500 text-4xl mb-4" />,
    title: "Expert Agent Support",
    description: "Talk to real licensed agents for trustworthy guidance.",
  },
  {
    icon: <FaLaptop className="text-violet-500 text-4xl mb-4" />,
    title: "100% Online Application",
    description: "Apply for policies fully online with no paperwork required.",
  },
  {
    icon: <FaLock className="text-violet-500 text-4xl mb-4" />,
    title: "Secure Online Payments",
    description: "Your payments are encrypted and processed safely.",
  },
  {
    icon: <FaClock className="text-violet-500 text-4xl mb-4" />,
    title: "Real-Time Claim Tracking",
    description: "Track your claim status live from your dashboard.",
  },
  {
    icon: <FaUserCircle className="text-violet-500 text-4xl mb-4" />,
    title: "Personalized Dashboard Access",
    description: "View your policies, payments, and status in one place.",
  },
];

const Benefits = () => {
  return (
    <section data-aos="fade-right" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          Benefits of <span className="text-pink-600">Insuroo</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          Everything you need to protect your loved ones—simple, fast, and secure.
        </p>

        <div data-aos="fade-up"
     data-aos-anchor-placement="top-center" className="grid grid-cols-1 sm:grid-cols-2   gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow hover:shadow-lg
              hover:bg-gradient-to-r from-pink-300 to-pink-600  transition duration-300 "
            >
              {benefit.icon}
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-900  hover:text-black dark:text-gray-300">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
