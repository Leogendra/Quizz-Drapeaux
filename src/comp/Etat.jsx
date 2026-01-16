import React from 'react';
import { useEffect, useState } from 'react';
import etats_json from '../assets/data/etats.json';
import Carte from './Carte';

const Etat = () => {
    const [etatsData, setEtatsData] = useState([]);
    const [mode, setMode] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        updateEtats();
    }, [mode]);

    function updateEtats() {
        const sortedData = (mode === 1) ? 
            etats_json.slice().sort(() => Math.random() - 0.5) : 
            // etats_json.slice().sort((a, b) => a.nom.localeCompare(b.nom));
            etats_json.slice().sort((a, b) => b.population - a.population);
        setEtatsData(sortedData);
        setCurrentIndex(0);
    }

    function nextState() {
        setCurrentIndex(prevIndex => {
            const newIndex = (prevIndex + 1) % tailleData();
            return newIndex;
        });
    }

    function tailleData() {
        return etatsData.length;
    }

    return (
        <div className="countries">
            <ul className="radio-container">
                <li>
                    {<button className={(mode === 1) ? "oneCountries" : "allCountries"} onClick={() => {setMode((mode === 1) ? 2 : 1);}}>Tous les États</button>}
                </li>
            </ul>

            {(mode === 1) && <button className="red-button" onClick={() => updateEtats()}>Mélanger</button>}
            {(mode === 1) && <button className="newCountry" onClick={() => nextState()}>État suivant</button>}
            {(mode === 1) && <label htmlFor="range">{currentIndex+1}/{tailleData()}</label>}
            

            <ul>
                {etatsData
                    .slice(currentIndex, currentIndex + (mode===1?1:100))
                    .map((etat, index) => (
                        <Carte
                            key={index}
                            name={etat.nom}
                            capital={etat.capitale}
                            population={etat.population}
                            flag={`https://flagcdn.com/${etat.ISO}.svg`}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default Etat;