import React from 'react';
import ProjectIntro from './ProjectIntro'
import MainFeaturesSection from './MainFeatures';
import Contact from './Contact';

const page = () => {
    return (
        <div>
            <ProjectIntro></ProjectIntro>
            <MainFeaturesSection></MainFeaturesSection>
            <Contact></Contact>
        </div>
    );
};

export default page;