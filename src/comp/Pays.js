import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carte from './Carte';

const Pays = () => {
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(1);
    const populations = [25000000, 10000000, 1000000, 100000, 0];
    var radiosContinents = {
        "Africa" : false, 
        "America" : false, 
        "Asia" : false,
        "Europe" : true,
        "Oceania" : false
    };

    // le useEffect se joue lorsque le composant est monté 
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setData(res.data));
    }, []);

    return (
        <div className="countries">
            <ul className="radio-container">

                {/* Slider qui défini le niveau de difficulté, coupe les pays en 3 parties, ordonées par population */}
                <label htmlFor="range">Difficulté</label>
                <input
                    type="range"
                    min="1"
                    max="5"
                    id="range"
                    defaultValue={rangeValue}
                    onChange={(e) => setRangeValue(e.target.value)} 
                />

                {Object.keys(radiosContinents).map((continent) => (
                    <li>
                        <input
                            type="checkbox"
                            id={continent}
                            name="continent-radio"
                            onChange={(e) => {
                                radiosContinents[continent] = e.target.checked;
                                console.log(radiosContinents);
                            }}
                        />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>
            {<button onClick={() => axios
                                    .get("https://restcountries.com/v3.1/all")
                                    .then((res) => setData(res.data))
                            }>Nouveau Pays
            </button>}
            <ul>
                {data
                    .filter((pays) => {
                        let bool;
                        for (const [key, value] of Object.entries(radiosContinents)) {
                            if (pays.continents[0].includes(key)) {bool = value;}
                        }
                        console.log(radiosContinents);
                        return (bool === true) && (pays.population > populations[rangeValue - 1]);
                    })
                    .sort((a, b) => Math.random() - 0.5)
                    // .sort((a, b) => b.population - a.population)
                    .slice(0, 100)
                    // .slice(0, 1)
                    .map((pays, index) => (
                        <Carte key={index} pays={pays} />
                    ))}
            </ul>
        </div>
    );
};

export default Pays;