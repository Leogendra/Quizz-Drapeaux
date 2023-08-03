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
                <br/>
                <p>Site ReactJs pour apprendre les drapeaux, pays et capitales.</p>
                <br/>
                <p>Possibilité de trier sur</p>
                <ul>
                    <li>- Continent</li>
                    <li>- Nombre d'habitants</li>
                    <li>- Appartenance aux Nations Unies</li>
                </ul>
            </div>
        </div>
    );
};

export default About;