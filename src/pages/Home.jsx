import React from 'react';
import FAQSection from '../components/FAQSection';
import Banner from '../components/Banner';
import PopularContests from '../components/PopularContests';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContests></PopularContests>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;