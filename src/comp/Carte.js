import React from 'react';

const Carte = ({ pays, name, capital, population, flag }) => {
    const getPopulation = () => {
        if (population > 1000000) {
            return (population / 1000000).toFixed(0) + "M";
        } 
        else if (population > 1000) {
            return (population / 1000).toFixed(0) + "K";
        } 
        else {
            return population;
        }
    };
    return (
        <li className="card">
            <img 
                src={flag} 
                alt={"drapeau " + name} 
            />
            <div className="nomPays">
                <h2>{name}</h2>
            </div>
            <div className="nomCapitale">
                <h2>{capital}</h2>
            </div>
            {(population) && <h4>pop : {getPopulation()}</h4>}
        </li>
    );
};

export default Carte;