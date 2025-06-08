import React from 'react';

const Logo = () => {
    return (
        <div className="logo">
            {/* Les images importées depuis la balise img sont accessible dans /public */}
            <img src="./favicon.png" alt="logo" />
            <h3>Quizz Drapeaux</h3>
        </div>
    );
};

export default Logo;