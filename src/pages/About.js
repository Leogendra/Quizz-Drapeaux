import React from 'react';
import Logo from '../comp/Logo';
import Navigation from '../comp/Navigation';

const About = () => {
    return (
        <div>
            <Logo />
            <Navigation />
            <div className="aPropos">
                <h1>Y a rien ici</h1>
                <br />
                <p>Petit site juste pour tester réact</p>
                <br />
                <p>En vrai pas ouf</p>
            </div>
        </div>
    );
};

export default About;