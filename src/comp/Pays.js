import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carte from './Carte';

const Pays = () => {
    const [data, setData] = useState([]);
    const [nbPays, setNbPays] = useState(1);
    const [rangeValue, setRangeValue] = useState(1);
    const [radioSelectionne, setRadioSelectionne] = useState("");
    const populations = [25000000, 10000000, 1000000, 100000, 0];
    const continents = {
        "Africa": "Afrique",
        "America": "Amérique",
        "Asia": "Asie",
        "Europe": "Europe",
        "Oceania": "Océanie"
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
                <li>
                    <label htmlFor="range">Difficulté : {rangeValue}</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        id="range"
                        defaultValue={rangeValue}
                        onChange={(e) => setRangeValue(e.target.value)}
                    />
                </li>

                <br />

                <li>
                    <label htmlFor="continent">Continent</label>
                    <select 
                        name="continent" 
                        id="continent"
                        onChange={(choix) => {
                            setRadioSelectionne(choix.target.value);
                            updatePays();
                        }}
                    >
                        <option value="">Tous</option>
                        {Object.keys(continents).map((continent) => (
                            <option value={continent} id={continent}>
                        {continents[continent]}
                        </option>
                    ))}
                    </select>
                </li>
            </ul>
            {<button className="newCountry" onClick={() => updatePays()}>Nouveau Pays</button>}
            {<button className={(nbPays == 1)?"oneCountry":"allCountry"} onClick={() => setNbPays((nbPays == 1)?500:1)}>Tous les pays</button>}
            {/* {radioSelectionne && <button className="allCountry" onClick={() => setRadioSelectionne("")}>Tous les continents</button>} */}
            <ul>
                {data
                    .filter((pays) => pays.continents[0].includes(radioSelectionne) && (pays.population > populations[rangeValue - 1]))
                    .sort((a, b) => Math.random() - 0.5)
                    // .sort((a, b) => b.population - a.population)
                    .slice(0, nbPays)
                    .map((pays, index) => (
                        <Carte key={index} pays={pays} />
                    ))
                }
            </ul>
        </div>
    );
};

export default Pays;