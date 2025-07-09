import React, { useContext, useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import { AuthContext } from '../Contexts/AuthContext/AuthProvider';
import { Link, useNavigate } from 'react-router';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleMobileMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success('Logged out successfully');
        navigate('/login');
      })
      .catch((err) => {
        toast.error('Logout failed');
        console.error(err);
      });
  };

  // Optional: prevent background scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <nav className='bg-white border-gray-200 dark:bg-gray-900 shadow'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        {/* Logo */}
        <Link to='/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          <img src='https://flowbite.com/docs/images/logo.svg' className='h-8' alt='Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
            Insuroo
          </span>
        </Link>

        {/* Avatar + Dropdown */}
        <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative'>
          {user ? (
            <div onClick={toggleDropdown} className='cursor-pointer'>
              <img
                className='w-8 h-8 rounded-full'
                referrerPolicy='no-referrer'
                src={user?.photoURL}
                alt='User'
              />
            </div>
          ) : (
            <Link
              to='/login'
              className='text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
            >
              LogIn
            </Link>
          )}

          {/* Dropdown */}
          {isOpen && (
            <div className='absolute top-12 right-0 z-50 rounded-xl shadow-md w-[40vw] md:w-[12vw] bg-white overflow-hidden text-sm'>
              <div className='flex flex-col cursor-pointer'>
                <Link
                  to='/'
                  className='block md:hidden px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                >
                  Home
                </Link>

                {user ? (
                  <>
                    <Link
                      to='/profile'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Profile
                    </Link>
                    <Link
                      to='/dashboard'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Dashboard
                    </Link>
                    <div
                      onClick={handleLogout}
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to='/login'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Login
                    </Link>
                    <Link
                      to='/signup'
                      className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-user'
            aria-expanded={menuOpen}
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>

        {/* Main Links */}
        <div
          className={`items-center justify-between w-full ${
            menuOpen ? 'flex' : 'hidden'
          } md:flex md:w-auto md:order-1`}
          id='navbar-user'
        >
          <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 
            md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
            <li>
              <Link
                to='/'
                className='block py-2 px-3 text-white bg-violet-500 rounded-sm md:bg-transparent md:text-violet-700 md:p-0 md:dark:text-violet-500'
                aria-current='page'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='/all-policies'
                className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-violet-500 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500'
              >
                All Policies
              </Link>
            </li>
            <li>
              <Link
                to='/agents'
                className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-violet-500 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500'
              >
                Agents
              </Link>
            </li>
            <li>
              <Link
                to='/faqs'
                className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-violet-500 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500'
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                to='/contact'
                className='block py-2 px-3 text-gray-900 rounded-sm hover:bg-violet-500 md:hover:bg-transparent md:hover:text-violet-700 md:p-0 dark:text-white md:dark:hover:text-violet-500'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
