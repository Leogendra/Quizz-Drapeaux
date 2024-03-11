import React from 'react';
import Logo from '../comp/Logo';
import Navigation from '../comp/Navigation';
import Departements from '../comp/Departements';

const France = () => {
    return (
        <div>
            <Logo />
            <Navigation />
            {/* <Departements /> */}
            <div className="aPropos">
                <h1>À venir :</h1>
                <ul>
                    <li>- Départements francais (nom et numéro)</li>
                    <li>- Tri par région</li>
                    <li>- Drapeaux culturels</li>
                </ul>
                <br/>
            </div>
        </div>
    );
};

export default France;