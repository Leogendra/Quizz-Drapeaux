import React, { useState } from 'react';
import Logo from '../comp/Logo';
import Navigation from '../comp/Navigation';

const continents = [
    { name: 'Europe', link: 'https://www.geoguessr.com/seterra/fr/vgp/3007' },
    { name: 'Amérique du Nord', link: 'https://www.geoguessr.com/seterra/fr/vgp/3015' },
    { name: 'Amérique du Sud', link: 'https://www.geoguessr.com/seterra/fr/vgp/3016' },
    { name: 'Afrique', link: 'https://www.geoguessr.com/fr/vgp/3163' },
    { name: 'Asie', link: 'https://www.geoguessr.com/seterra/fr/vgp/3167' },
    { name: 'Océanie', link: 'https://www.geoguessr.com/seterra/fr/vgp/3341' },
    { name: 'Caraibes', link: 'https://www.geoguessr.com/seterra/fr/vgp/3342' },
    { name: 'Monde', link: 'https://www.geoguessr.com/seterra/fr/vgp/3356' }
];

const continentsHard = [
    { name: 'Europe', link: 'https://www.geoguessr.com/seterra/fr/vgp/3007' },
    { name: 'Amérique du Nord', link: 'https://www.geoguessr.com/seterra/fr/vgp/3015' },
    { name: 'Amérique du Sud', link: 'https://www.geoguessr.com/seterra/fr/vgp/3016' },
    { name: 'Afrique', link: 'https://www.geoguessr.com/fr/vgp/3163' },
    { name: 'Asie', link: 'https://www.geoguessr.com/seterra/fr/vgp/3167' },
    { name: 'Océanie', link: 'https://www.geoguessr.com/seterra/fr/vgp/3355?c=7HHQW' },
    { name: 'Caraibes', link: 'https://www.geoguessr.com/seterra/fr/vgp/3355?c=8RZ93' },
    { name: 'Monde', link: 'https://www.geoguessr.com/seterra/fr/vgp/3355' }
];

const ContinentButtons = () => {

    const [selectedContinent, setSelectedContinent] = useState(null);
    const [mode, setMode] = useState(1);

    const handleRandomClick = () => {
        const randomIndex = Math.floor(Math.random() * continents.length);
        if (mode == 1) {
            setSelectedContinent(continents[randomIndex]);
        } 
        else {
            setSelectedContinent(continentsHard[randomIndex]);
        }
    }

    return (
        <div className='continents'>

            <Logo />
            <Navigation />

            <ul className="radio-container">
                <li>
                    {<button className={(mode == 1) ? "modeEasy" : "modeHard"} onClick={() => setMode((mode == 1) ? 2 : 1)}>Mode Difficile</button>}
                </li>
            </ul>

            <h2>Cliquez sur un continent pour ouvrir la carte sur Seterra</h2>

            {/* Si mode difficile : continentsHard */}
            <div className='continents-div'>
                {mode === 1 ? (
                    continents.map((continent) => (
                        <a key={continent.name} href={continent.link} target="_blank">
                            <button>{continent.name}</button>
                        </a>
                    ))
                ) : (
                    continentsHard.map((continent) => (
                        <a key={continent.name} href={continent.link} target="_blank">
                            <button className='red'>{continent.name}</button>
                        </a>
                    ))
                )}
                <a href={selectedContinent?.link} target="_blank" rel="noopener noreferrer">
                    <button className="blue" onClick={handleRandomClick}>Continent aléatoire</button>
                </a>
            </div>

        </div>
    );
}

export default ContinentButtons;