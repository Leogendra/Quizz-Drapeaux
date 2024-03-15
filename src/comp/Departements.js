import React from 'react';
import { useEffect, useState } from 'react';
import Carte from './Carte';
import departements_json from '../assets/data/departements.json';
import regions_json from '../assets/data/regions.json';
import default_flag from '../assets/data/flag.png';

const Departements = () => {
    const [deptData, setDeptData] = useState([]);
    const [mode, setMode] = useState(1);
    const [regionSelectionne, setRegionSelectionne] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        updateDepartement();
    }, [mode]);

    function updateDepartement() {
        const sortedData = (mode === 1) ? 
            departements_json.slice().sort(() => Math.random() - 0.5) : 
            departements_json.slice().sort((a, b) => a.code - b.code);
        setDeptData(sortedData);
        setCurrentIndex(0);
    }

    function tailleDataFiltree() {
        return deptData
            .filter((departement) => departement.codeRegion.includes(regionSelectionne))
            .length;
    }

    function nextDepartement() {
        setCurrentIndex(prevIndex => {
            const newIndex = (prevIndex + 1) % tailleDataFiltree();
            return newIndex;
        });
    }

    return (
        <div className="countries">
            <ul className="radio-container">
                <li>
                    <label htmlFor="region" className="region">Région</label>
                    <select
                        name="region"
                        id="region"
                        onChange={(choix) => {
                            setRegionSelectionne(choix.target.value);
                            updateDepartement();
                        }}
                    >
                        <option value="" key={0}>Tous</option>
                        {regions_json.map((region) => (
                            <option value={region.code} id={region.code} key={region.code}>
                                {region.nom}
                            </option>
                        ))}
                    </select>
                </li>

                <li>
                    {/* Bouton qui permet de passer d'un département à tous */}
                    {<button className={(mode == 1) ? "oneCountries" : "allCountries"} onClick={() => setMode((mode === 1) ? 2 : 1)}>Tous les départements ({tailleDataFiltree()})</button>}
                </li>

            </ul>

            {(mode == 1) && <button className="red-button" onClick={() => updateDepartement()}>Mélanger</button>}
            {(mode == 1) && <button className="newCountry" onClick={() => nextDepartement()}>Département suivant</button>}
            {(mode == 1) && (tailleDataFiltree()) && <label htmlFor="range">{currentIndex+1}/{tailleDataFiltree()}</label>}
            

            <ul>
                {deptData
                    .filter((departement) => { return departement.codeRegion.includes(regionSelectionne) })
                    .slice(currentIndex, currentIndex + (mode===1?1:300))
                    .map((departement, index) => (
                        <Carte
                            key={index}
                            name={departement.nom}
                            capital={departement.code}
                            population={departement.population}
                            flag={"https://flagcdn.com/fr.svg"}
                        />
                    ))
                }
            </ul>
        </div>
    );
};

export default Departements;