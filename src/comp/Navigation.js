import React from 'react';
import {NavLink} from 'react-router-dom';

const Navigation = () => {
    return (
            <div className="navigation">
                <ul>
                    <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Drapeaux</li>
                    </NavLink>
                    <NavLink to="about" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>À propos</li>
                    </NavLink>
                    <NavLink to="/next" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>À venir</li>
                    </NavLink>
                </ul>
            </div>
    );
};

export default Navigation;