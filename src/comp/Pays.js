import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carte from './Carte';

const Pays = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(1);
    const [radioSelectionne, setRadioSelectionne] = useState("");
    const populations = [25000000, 10000000, 1000000, 100000, 0];
    const continents = {
        "Africa" : "Afrique",
        "America" : "Amérique",
        "Asia" : "Asie",
        "Europe" : "Europe",
        "Oceania" : "Océanie"
    };

    // le useEffect se joue lorsque le composant est monté 
    useEffect(() => {
        updatePays();
    }, []);

    function updatePays() {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data));
    }

    return (
        <div className="countries">
            <ul className="radio-container">
                {/* Slider qui défini le niveau de difficulté, coupe les pays en 3 parties, ordonées par population */}
                <label htmlFor="range">Difficulté : {rangeValue}</label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    id="range"
                    defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} 
                />
                
                <br />

                {Object.keys(continents).map((continent) => (
                    <li>
                        <input 
                            type="radio"
                            id={continent}
                            name="continent-radio"
                            checked={continent === radioSelectionne}
                            onChange={(e) => {
                                setRadioSelectionne(e.target.id);
                                updatePays();
                            }}
                            />
                        <label htmlFor={continent}>{continents[continent]}</label>
                    </li>
                ))}
            </ul>
            {<button onClick={() => updatePays()}>Nouveau Pays</button>}
            {radioSelectionne && <button onClick={() => setRadioSelectionne("")}>Tous les pays</button>}
            <ul>
                {data
                    .filter((pays) => pays.continents[0].includes(radioSelectionne) && (pays.population > populations[rangeValue - 1]))
                    // .sort((a, b) => Math.random() - 0.5)
                    .sort((a, b) => b.population - a.population)
                    .slice(0, 100)
                    .map((pays, index) => (
                        <Carte key={index} pays={pays} />
                    ))
                }
            </ul>
        </div>
    );
};

export default Pays;