import React from 'react';
import Logo from '../comp/Logo';
import Navigation from '../comp/Navigation';

const About = () => {
    return (
        <div>
            <Logo />
            <Navigation />
            <div className="aPropos">
                <h1>Quizz Géographie</h1>
                <br />
                <p>Premier site ReactJs pour apprendre les drapeaux, pays et capitales.</p>
            </div>
        </div>
    );
};

export default About;