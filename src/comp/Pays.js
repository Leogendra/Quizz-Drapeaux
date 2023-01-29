import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carte from './Carte';

const Pays = () => {
    const [data, setData] = useState([]);
    const [nbPays, setNbPays] = useState(1);
    const [mode, setMode] = useState(1);
    const [rangeValue, setRangeValue] = useState(1);
    const populations = [25_000_000, 10_000_000, 1_000_000, 100_000, 0];
    const [continentSelectionne, setContinentSelectionne] = useState("");
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

    function getPopulation(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(0) + "M";
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + "K";
        } else {
            return num;
        }
    };

    function updatePays() {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data));
    }

    function tailleDataFiltree(mode) {
        if (mode == 1) {
            return data.filter((pays) => pays.continents[0].includes(continentSelectionne) && (pays.population > populations[rangeValue - 1])).length;
        }
        else {
            return data.filter((pays) => pays.continents[0].includes(continentSelectionne) && (pays.population > populations[rangeValue - 1]) && (pays.population < populations[Math.abs(rangeValue - 2)])).length;
        }
    }

    return (
        <div className="countries">
            <ul className="radio-container">
                <li>
                    <label htmlFor="continent" className="continent">Continent</label>
                    <select 
                        name="continent" 
                        id="continent"
                        onChange={(choix) => {
                            setContinentSelectionne(choix.target.value);
                            updatePays();
                        }}
                        >
                        <option value="" key={0}>Tous</option>
                        {Object.keys(continents).map((continent) => (
                            <option value={continent} id={continent} key={continent}>
                        {continents[continent]}
                        </option>
                    ))}
                    </select>
                </li>

                {/* Slider qui défini le niveau de difficulté, coupe les pays en 3 parties, ordonées par population */}
                <li>
                    <label htmlFor="range">Pop. {(mode==1)?"min":"entre"} : {(mode==1)?getPopulation(populations[rangeValue-1]):getPopulation(populations[Math.abs(rangeValue-2)])+"-"+getPopulation(populations[rangeValue-1])}</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        id="range"
                        defaultValue={rangeValue}
                        onChange={(e) => setRangeValue(e.target.value)}
                        />
                    {/* palliers */}
                </li>

                <li>
                    {/* Bouton qui permet de passer d'un pays à tous les pays */}
                    {<button className={(nbPays==1)?"oneCountries":"allCountries"} onClick={() => setNbPays((nbPays==1)?300:1)}>Tous les pays ({tailleDataFiltree(mode)})</button>}
                </li>

                <li>
                    {/* Bouton qui permet de passer du mode "population min" à "entre population" */}
                    {<button className={(mode==1)?"modeEasy":"modeHard"} onClick={() => setMode((mode==1)?2:1)}>Mode difficile</button>}
                </li>

            </ul>
            
            {(nbPays == 1) && <button className="newCountry" onClick={() => updatePays()}>Nouveau Pays</button>}
            {/* {<button className={(nbPays == 1)?"oneCountry":"allCountry"} onClick={() => setNbPays((nbPays == 1)?300:1)}>Difficulté ++</button>} */}
            
            <ul>
                {data
                    .filter((pays) => {if (mode == 1) {
                                        return pays.continents[0].includes(continentSelectionne) && (pays.population > populations[rangeValue - 1]);
                                    }
                                    else {
                                        return pays.continents[0].includes(continentSelectionne) && (pays.population > populations[rangeValue - 1]) && (pays.population < populations[Math.abs(rangeValue - 2)]);
                                    }
                                })
                    .sort((a, b) => (nbPays==300)?(b.population - a.population):(Math.random() - 0.5))
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