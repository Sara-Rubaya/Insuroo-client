import React from 'react';
import Slider from '../Components/Home/Slider';
import Benefits from '../Components/Home/Benefits';
import CustomerReviews from '../Components/Home/CustomerReviews';
import PopularPolicies from '../Components/PopularPolicy';
import Blog from './Blogs/Blogs';


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularPolicies></PopularPolicies>
            <Benefits></Benefits>
            <CustomerReviews></CustomerReviews>
            <Blog></Blog>
        </div>
       
    );
};

export default Home;