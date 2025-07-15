import React from 'react';
import Slider from '../Components/Home/Slider';
import Benefits from '../Components/Home/Benefits';
import CustomerReviews from '../Components/Home/CustomerReviews';
import PopularPolicies from '../Components/PopularPolicy';
import Blog from './Blogs/Blogs';
import NewsletterSubscription from './ NewsletterSubscription';
import FeaturedAgents from './FeaturedAgents';


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <PopularPolicies></PopularPolicies>
            <Benefits></Benefits>
            <CustomerReviews></CustomerReviews>
            <Blog ></Blog>
            <NewsletterSubscription></NewsletterSubscription>
            <FeaturedAgents></FeaturedAgents>
        </div>
       
    );
};

export default Home;