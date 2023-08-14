import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carte from './Carte';

const Pays = () => {
    const [data, setData] = useState([]);
    const [nbPays, setNbPays] = useState(1);
    const [mode, setMode] = useState(1);
    const [rangeValue, setRangeValue] = useState(1);

    // Nouvel état pour l'index actuel et le compteur de drapeaux vus
    const [currentIndex, setCurrentIndex] = useState(0);
    
    const populations = [25_000_000, 10_000_000, 1_000_000, 100_000, 0];
    const [continentSelectionne, setContinentSelectionne] = useState("");
    const [onuCountry, setOnuCountry] = useState("");
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
        if (num >= 1_000_000) {
            return (num / 1_000_000).toFixed(0) + "M";
        }
        else if (num >= 1_000) {
            return (num / 1_000).toFixed(0) + "K";
        }
        else {
            return num;
        }
    };

    function updatePays() {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(
                res.data
                .sort((a, b) => (nbPays == 300) ? (b.population - a.population) : (Math.random() - 0.5))
                ));
        setCurrentIndex(0);
    }

    function tailleDataFiltree() {
        let altData = data.filter((pays) => pays.continents[0].includes(continentSelectionne) && pays.population > populations[rangeValue - 1]);
        if (mode == 2) {
            if (rangeValue > 1) {
                altData = altData.filter((pays) => pays.population < populations[rangeValue - 2]);
            }
            else {
                altData = altData.filter((pays) => pays.population < 9_999_999_999);
            }
        }
        if (onuCountry == "1") {
            altData = altData.filter((pays) => pays.unMember == true);
        }
        else if (onuCountry == "2") {
            altData = altData.filter((pays) => pays.unMember == false);
        }
        return altData.length;
    }

    function nextCountry() {
        setCurrentIndex(prevIndex => {
            const newIndex = (prevIndex + 1) % tailleDataFiltree();
            return newIndex;
        });
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

                <li>
                    <label htmlFor="onu" className="continent">ONU</label>
                    <select
                        name="onu"
                        id="onu"
                        onChange={(choix) => {
                            setOnuCountry(choix.target.value);
                            updatePays();
                        }}
                    >
                        <option value="0" key={0}>Tous</option>
                        <option value="1" key={1}>ONU</option>
                        <option value="2" key={2}>non ONU</option>
                    </select>
                </li>

                {/* Slider qui défini le niveau de difficulté, coupe les pays en 5 parties, ordonées par population */}
                <li>
                    <label htmlFor="range">Pop. {(mode == 1) ? "min" : "entre"} : {(mode == 1) ? getPopulation(populations[rangeValue - 1]) : ((rangeValue > 1) ? getPopulation(populations[rangeValue - 2]) : "inf") + "-" + getPopulation(populations[rangeValue - 1])}</label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        id="range"
                        defaultValue={rangeValue}
                        onChange={(e) => {
                            setRangeValue(e.target.value);
                            updatePays();
                        }}
                    />
                    {/* palliers */}
                </li>

                <li>
                    {/* Bouton qui permet de passer d'un pays à tous les pays */}
                    {<button className={(nbPays == 1) ? "oneCountries" : "allCountries"} onClick={() => setNbPays((nbPays == 1) ? 300 : 1)}>Tous les pays ({tailleDataFiltree()})</button>}
                </li>

                <li>
                    {/* Bouton qui permet de passer du mode "population min" à "entre population" */}
                    {<button className={(mode == 1) ? "modeEasy" : "modeHard"} onClick={() => setMode((mode == 1) ? 2 : 1)}>Mode intervale</button>}
                </li>

            </ul>

            {(nbPays == 1) && <button className="red-button" onClick={() => updatePays()}>Mélanger</button>}
            {(nbPays == 1) && <button className="newCountry" onClick={() => nextCountry()}>Pays suivant</button>}
            {(nbPays == 1) && (tailleDataFiltree()) && <label htmlFor="range">{currentIndex+1}/{tailleDataFiltree()}</label>}
            

            <ul>
                {data
                    .filter((pays) => {
                        let bool = false;
                        if (pays.continents[0].includes(continentSelectionne)) {
                            bool = (pays.population > populations[rangeValue - 1]);
                            if (mode == 2) {
                                bool = bool && (pays.population < ((rangeValue > 1) ? populations[rangeValue - 2] : 9_999_999_999));
                            }
                            if (onuCountry == 1) {
                                bool = bool && pays.unMember;
                            }
                            else if (onuCountry == 2) {
                                bool = bool && !pays.unMember;
                            }
                        }
                        return bool
                    })
                    .slice(currentIndex, currentIndex + nbPays)
                    .map((pays, index) => (
                        <Carte
                            key={index}
                            name={pays.translations.fra.common}
                            capital={pays.capital}
                            population={pays.population}
                            flag={pays.flags.svg}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default Pays;