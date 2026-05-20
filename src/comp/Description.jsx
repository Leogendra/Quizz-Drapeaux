import React, { useEffect, useState } from 'react';
import pays_json from '../assets/data/pays.json';




const Description = () => {
    const [country_list, set_country_list] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mode, setMode] = useState(1);
    const [rangeValue, setRangeValue] = useState(1);
    const [continentSelectionne, setContinentSelectionne] = useState("");
    const [onuCountry, setOnuCountry] = useState("");

    const populations = [25_000_000, 10_000_000, 1_000_000, 100_000, 0];
    const continents = {
        "Africa": "Afrique",
        "America": "Amérique",
        "Asia": "Asie",
        "Europe": "Europe",
        "Oceania": "Océanie"
    };

    useEffect(() => {
        updatePays();
    }, []);

    function anonymize(alt, commonName) {
        if (!alt || !commonName) return alt || "";
        return alt.replace(`The flag of ${commonName}`, "This flag");
    }

    function updatePays() {
        fetch("https://restcountries.com/v3.1/all?fields=name,translations,population,flags,continents,unMember")
            .then((res) => {
                if (!res.ok) throw new Error("API error");
                return res.json();
            })
            .then((data) => {
                const valid = data.filter(c => c.flags?.alt);
                set_country_list(valid.sort(() => Math.random() - 0.5));
            })
            .catch(() => {
                const valid = pays_json.filter(c => c.flags?.alt);
                set_country_list(valid.sort(() => Math.random() - 0.5));
            });
        setCurrentIndex(0);
    }

    function getPopulation(num) {
        if (num >= 1_000_000) return (num / 1_000_000).toFixed(0) + "M";
        if (num >= 1_000) return (num / 1_000).toFixed(0) + "K";
        return num;
    }

    function getFilteredList() {
        return country_list.filter((pays) => {
            if (!pays.continents[0].includes(continentSelectionne)) return false;
            if (pays.population <= populations[rangeValue - 1]) return false;
            if (mode == 2) {
                const upperPop = rangeValue > 1 ? populations[rangeValue - 2] : 9_999_999_999;
                if (pays.population >= upperPop) return false;
            }
            if (onuCountry == "1" && !pays.unMember) return false;
            if (onuCountry == "2" && pays.unMember) return false;
            return true;
        });
    }

    function nextCountry() {
        const size = getFilteredList().length;
        if (size === 0) return;
        setCurrentIndex(prev => (prev + 1) % size);
    }

    const filteredList = getFilteredList();
    const total = filteredList.length;
    const currentCountry = filteredList[currentIndex] || null;

    return (
        <div className="countries">
            <ul className="radio-container">
                <li>
                    <label htmlFor="desc-continent" className="continent">Continent</label>
                    <select
                        name="desc-continent"
                        id="desc-continent"
                        onChange={(e) => {
                            setContinentSelectionne(e.target.value);
                            setCurrentIndex(0);
                        }}
                    >
                        <option value="">Tous</option>
                        {Object.keys(continents).map((c) => (
                            <option value={c} key={c}>{continents[c]}</option>
                        ))}
                    </select>
                </li>

                <li>
                    <label htmlFor="desc-onu" className="continent">ONU</label>
                    <select
                        name="desc-onu"
                        id="desc-onu"
                        onChange={(e) => {
                            setOnuCountry(e.target.value);
                            setCurrentIndex(0);
                        }}
                    >
                        <option value="0">Tous</option>
                        <option value="1">ONU</option>
                        <option value="2">non ONU</option>
                    </select>
                </li>

                <li>
                    <label htmlFor="desc-range">
                        Pop. {mode == 1 ? "min" : "entre"} :{" "}
                        {mode == 1
                            ? getPopulation(populations[rangeValue - 1])
                            : (rangeValue > 1 ? getPopulation(populations[rangeValue - 2]) : "inf") + "-" + getPopulation(populations[rangeValue - 1])
                        }
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="5"
                        id="desc-range"
                        defaultValue={rangeValue}
                        onChange={(e) => {
                            setRangeValue(Number(e.target.value));
                            setCurrentIndex(0);
                        }}
                    />
                </li>

                <li>
                    <button
                        className={mode == 1 ? "modeEasy" : "modeHard"}
                        onClick={() => { setMode(mode == 1 ? 2 : 1); setCurrentIndex(0); }}
                    >
                        Mode intervale
                    </button>
                </li>
            </ul>

            <button className="red-button" onClick={updatePays}>Mélanger</button>
            <button className="newCountry" onClick={nextCountry}>Pays suivant</button>
            {total > 0 && <label>{currentIndex + 1}/{total}</label>}

            {currentCountry && (
                <div className="description-card">
                    <p className="description-text">
                        {anonymize(currentCountry.flags.alt, currentCountry.name?.common)}
                    </p>
                    <div className="description-reveal">
                        <span className="description-hint">Survolez pour révéler</span>
                        <div className="description-answer">
                            <img
                                src={currentCountry.flags.svg}
                                alt="Drapeau"
                                className="description-flag"
                            />
                            <span>{currentCountry.translations?.fra?.common}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Description;
