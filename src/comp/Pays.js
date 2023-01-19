import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Carte from './Carte';

const Pays = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [radioSelectionne, setRadioSelectionne] = useState("");
    const radios = ["Africa", "America", "Asia", "Europe", "Oceania"];

    // le useEffect se joue lorsque le composant est monté 
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data));
    }, []);

    return (
        <div className="countries">
            <ul className="radio-container">
                <input type="range" min="1" max="250"
                    defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} />

                {radios.map((continent) => (
                    <li>
                        <input 
                            type="radio"
                            id={continent}
                            name="continent-radio"
                            checked={continent === radioSelectionne}
                            onChange={(e) => (setRadioSelectionne(e.target.id))} />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>
            {radioSelectionne && <button onClick={() => setRadioSelectionne("")}>Déselectionner</button>}
            <ul>
                {data
                    .filter((pays) => pays.continents[0].includes(radioSelectionne))
                    // .sort((a, b) => Math.random() - 0.5)
                    .slice(0, rangeValue)
                    .map((pays, index) => (
                        <Carte key={index} pays={pays} />
                    ))}
            </ul>
        </div>
    );
};

export default Pays;