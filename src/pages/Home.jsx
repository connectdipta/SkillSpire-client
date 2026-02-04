import React from 'react';
import FAQSection from '../components/FAQSection';
import Banner from '../components/Banner';
import PopularContests from '../components/PopularContests';
import WinnerShowcase from '../components/WinnerShowcase';
import ExtraSections from '../components/ExtraSections';


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <PopularContests></PopularContests>
            <WinnerShowcase></WinnerShowcase>
            <ExtraSections></ExtraSections>
            <FAQSection></FAQSection>
        </div>
    );
};

export default Home;