import React from 'react';
import AwarnessHero from './AwarenessHero.jsx'
import Instructions from './Instructions.jsx'
import FAQSection from './AwarnessFaq.jsx';
const page = () => {
    return (
        <div>
            <AwarnessHero></AwarnessHero>
            <Instructions></Instructions>
            <FAQSection></FAQSection>
        </div>
    );
};

export default page;