import pays_json from '../assets/data/pays.json';
import { useEffect, useState } from 'react';
import Carte from './Carte';
import React from 'react';

const COLOR_MAP = {
    rouge:  '#e74c3c',
    bleu:   '#2980b9',
    vert:   '#27ae60',
    jaune:  '#f0c030',
    blanc:  '#f3f3f3',
    noir:   '#2c3e50',
    orange: '#e67e22',
};

const Pays = () => {
    const [country_list, set_country_list] = useState([]);
    const [nbPays, setNbPays] = useState(1);
    const [mode, setMode] = useState(1);
    const [rangeValue, setRangeValue] = useState(1);

    // Nouvel état pour l'index actuel et le compteur de drapeaux vus
    const [currentIndex, setCurrentIndex] = useState(0);

    const populations = [25_000_000, 10_000_000, 1_000_000, 100_000, 0];
    const [continentSelectionne, setContinentSelectionne] = useState("");
    const [onuCountry, setOnuCountry] = useState("");
    const [selectedColors, setSelectedColors] = useState([]);
    const [colorInput, setColorInput] = useState("");
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
        set_country_list(
            pays_json.sort((a, b) => (nbPays == 300) ? (b.population - a.population) : (Math.random() - 0.5))
        );
        setCurrentIndex(0);
    }


    function addColor(raw) {
        const color = raw.trim().toLowerCase();
        if (color in COLOR_MAP && !selectedColors.includes(color)) {
            setSelectedColors(prev => [...prev, color]);
            setCurrentIndex(0);
            setColorInput("");
            return true;
        }
        return false;
    }

    function removeColor(color) {
        setSelectedColors(prev => prev.filter(c => c !== color));
        setCurrentIndex(0);
    }

    function handleColorChange(e) {
        const val = e.target.value;
        if (!addColor(val)) setColorInput(val);
    }

    function handleColorKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addColor(colorInput);
        }
    }

    function applyFilters(list) {
        let data = list.filter((pays) =>
            pays.continents[0].includes(continentSelectionne) &&
            pays.population > populations[rangeValue - 1]
        );
        if (mode == 2) {
            data = data.filter((pays) =>
                pays.population < ((rangeValue > 1) ? populations[rangeValue - 2] : 9_999_999_999)
            );
        }
        if (onuCountry == "1") data = data.filter((pays) => pays.unMember == true);
        else if (onuCountry == "2") data = data.filter((pays) => pays.unMember == false);
        if (selectedColors.length > 0) {
            data = data.filter((pays) =>
                selectedColors.every(color => pays.colors?.includes(color))
            );
        }
        return data;
    }

    function tailleDataFiltree() {
        return applyFilters(country_list).length;
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

                <li className="color-filter-row">
                    <label htmlFor="color-input">Couleurs</label>
                    <div className="color-filters">
                        {selectedColors.map(color => (
                            <span key={color} className="color-pill">
                                <span className="color-dot" style={{ background: COLOR_MAP[color] }} />
                                {color}
                                <button className="pill-remove" onClick={() => removeColor(color)} aria-label={`Retirer ${color}`}>✕</button>
                            </span>
                        ))}
                        <input
                            id="color-input"
                            list="color-suggestions"
                            value={colorInput}
                            onChange={handleColorChange}
                            onKeyDown={handleColorKeyDown}
                            placeholder="rouge, bleu…"
                            autoComplete="off"
                        />
                        <datalist id="color-suggestions">
                            {Object.keys(COLOR_MAP).filter(c => !selectedColors.includes(c)).map(c => (
                                <option key={c} value={c} />
                            ))}
                        </datalist>
                    </div>
                </li>

            </ul>

            {(nbPays == 1) && <button className="red-button" onClick={() => updatePays()}>Mélanger</button>}
            {(nbPays == 1) && <button className="newCountry" onClick={() => nextCountry()}>Pays suivant</button>}
            {(nbPays == 1) && (tailleDataFiltree()) && <label htmlFor="range">{currentIndex + 1}/{tailleDataFiltree()}</label>}


            <ul>
                {applyFilters(country_list)
                    .slice(currentIndex, currentIndex + nbPays)
                    .map((pays, index) => (
                        <Carte
                            key={index}
                            name={pays.translations.fra.common}
                            capital={pays.capital.join(", ")}
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