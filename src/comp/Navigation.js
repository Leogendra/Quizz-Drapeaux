import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
    return (
            <div className="navigation">
                <ul>
                    <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Drapeaux</li>
                    </NavLink>
                    <NavLink to="/etats" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>États</li>
                    </NavLink>
                    <NavLink to="/cartes" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Cartes</li>
                    </NavLink>
                    <NavLink to="/about" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>À propos</li>
                    </NavLink>
                </ul>
            </div>
    );
};

export default Navigation;