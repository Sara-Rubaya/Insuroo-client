import React from 'react';
import Slider from '../Components/Home/Slider';
import Benefits from '../Components/Home/Benefits';
import CustomerReviews from '../Components/Home/CustomerReviews';


const Home = () => {
    return (
        <div>
            <Slider></Slider>
            <Benefits></Benefits>
            <CustomerReviews></CustomerReviews>
        </div>
       
    );
};

export default Home;