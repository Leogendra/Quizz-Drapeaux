import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carte from './Carte';

const Pays = () => {
    const [data, setData] = useState([]);
    const [myPays, setMyPays] = useState([]);
    const [rangeValue, setRangeValue] = useState(1);
    const populations = [25000000, 10000000, 1000000, 100000, 0];
    const continents = ["Africa", "America", "Asia", "Europe", "Oceania"];
    const [radiosContinents, setRadiosContinents] = useState({
        "Africa" : false, 
        "America" : false, 
        "Asia" : false,
        "Europe" : true,
        "Oceania" : false
    });

    function updatePays() {
        setData(data);
    }

    // le useEffect se joue lorsque le composant est monté 
    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => { 
                setData(res.data);
                updatePays();
            })
        
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

                {continents.map((continent) => (
                    <li>
                        <input
                            type="checkbox"
                            id={continent}
                            name="continent-radio"
                            // checked={radiosContinents[continent]}
                            onChange={(e) => {
                                // console.log(e.target.checked);
                                // let test = radiosContinents;
                                // test[continent] = !test[continent];
                                // setRadiosContinents(test);
                                // console.log(radiosContinents);
                                updatePays();
                            }}
                        />
                        <label htmlFor={continent}>{continent}</label>
                    </li>
                ))}
            </ul>
            {<button onClick={() => updatePays()}>Nouveau Pays</button>}
            <ul>
            {data
                .filter((pays) => {
                    continents.forEach(cont => {
                        let box = document.getElementById(cont);
                        if (pays.continents[0].includes(box.id)) {
                            console.log((box.checked) && (pays.population > populations[rangeValue - 1]));
                            return (box.checked) && (pays.population > populations[rangeValue - 1]);
                        }
                    });
                })
                .sort((a, b) => Math.random() - 0.5)
                // .sort((a, b) => b.population - a.population)
                // .slice(0, 100);
                .slice(0, 1)
                .map((pays, index) => (
                    <Carte key={index} pays={pays} />
                ))
            }
            </ul>
        </div>
    );
};

export default Pays;