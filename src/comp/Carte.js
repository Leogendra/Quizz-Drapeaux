import React from 'react';

const Carte = ({ pays }) => {
    const getPopulation = () => {
        if (pays.population > 1000000) {
            return (pays.population / 1000000).toFixed(0) + "M";
        } else if (pays.population > 1000) {
            return (pays.population / 1000).toFixed(0) + "K";
        } else {
            return pays.population;
        }
    };
    return (
        <li className="card">
            <img 
                src={pays.flags.svg} 
                alt={"drapeau " + pays.translations.fra.common} 
            />
            
            <h4>pop : {getPopulation()}</h4>
            <div className="nomPays">
                <h2>{pays.translations.fra.common}</h2>
            </div>
            <div className="nomCapitale">
                <h2>{pays.capital}</h2>
            </div>
        </li>
    );
};

export default Carte;